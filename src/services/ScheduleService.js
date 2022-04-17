import Parse from "parse/react-native";
import { EmployeeObject } from "./EmployeeService";
import { ClientObject } from "./ClientService";
import { buildSchedule, buildScheduleList } from "../factory/ScheduleFactory";
import { ProcedureObject } from "./ProcedureService";
import {
  confirmScheduleProcedure,
  deleteScheduleProcedureById,
  saveScheduleProcedure,
} from "./ScheduleProcedureService";
import { SalonObject } from "./SalonService";
import moment from "moment";
import { convertToObj } from "../common/converters/GenericConverter";

export const ScheduleObject = Parse.Object.extend("schedule");

export const getAllSchedulesBySalon = async (
  employeeId,
  salonId,
  employeeType,
) => {
  const ScheduleQuery = new Parse.Query(ScheduleObject);
  ScheduleQuery.equalTo("salon_id", new SalonObject({ objectId: salonId }));
  if (employeeType === "PRC") {
    ScheduleQuery.equalTo(
      "employee_id",
      new EmployeeObject({ objectId: employeeId }),
    );
  }
  ScheduleQuery.include("employee_id");
  ScheduleQuery.include("client_id");

  try {
    const schedules = await ScheduleQuery.find();
    return schedules.length ? await buildScheduleList(convertToObj(schedules)) : [];
  } catch (e) {
    throw e;
  }
};


export const saveScheduleParse = async (schedule) => {
  const {
    client,
    employee,
    procedures,
    scheduleDate,
    analyzedSchedule,
    salonId,
  } = schedule;
  const ScheduleParse = new ScheduleObject();
  ScheduleParse.set("employee_id", new EmployeeObject({ objectId: employee.id }));
  ScheduleParse.set("client_id", new ClientObject({ objectId: client.id }));
  ScheduleParse.set("salon_id", new SalonObject({ objectId: salonId }));
  // schedule.set('Observacao', 'Teste');
  ScheduleParse.set("schedule_date", moment(scheduleDate.toString()).format("DD/MM/YYYY - HH:mm"));
  // schedule.set('analyzed_schedule', analyzedSchedule);

  try {
    const savedSchedule = await ScheduleParse.save();

    for (const procedure of procedures) {
      const procedureEndDate = moment(scheduleDate).add(procedure.time, "minutes").format("DD/MM/YYYY - HH:mm");
      const procedureStartDate = moment(scheduleDate.toString()).format("DD/MM/YYYY - HH:mm");

      const scheduleProcedure = await saveScheduleProcedure(
        {
          procedureId: new ProcedureObject({ objectId: procedure.id }),
          scheduleId: new ScheduleObject({ objectId: schedule.id }),
        },
        false,
        procedureEndDate,
        procedureStartDate,
      );

      procedures.scheduleProcedureId = scheduleProcedure.objectId;
    }

    return buildSchedule(convertToObj(savedSchedule), procedures);

  } catch (e) {
    throw e;
  }
};

export const updateSchedulePase = async (scheduleObj) => {
  const {
    id,
    client,
    employee,
    procedures,
    procedureListWithoutChanges,
    scheduleDate,
  } = scheduleObj;
  const schedule = new ScheduleObject({ objectId: id });
  schedule.set("employee_id", new EmployeeObject({ objectId: employee.id }));
  schedule.set("client_id", new ClientObject({ objectId: client.id }));
  // schedule.set('Observacao', 'Teste');
  schedule.set("schedule_date", moment(scheduleDate.toString()).format("DD/MM/YYYY - HH:mm"));

  try {
    const updatedSchedule = await schedule.save();

    for (const procedure of procedureListWithoutChanges) {
      if (!procedures.some(p => p.name === procedure.name)) {
        await deleteScheduleProcedureById(procedure.scheduleProcedureId);
      }
    }

    for (const procedure of procedures) {
      if (
        !procedureListWithoutChanges.some(pl => pl.id === procedure.id)
      ) {

        const procedureEndDate = moment(scheduleDate).add(procedure.time, "minutes").format("DD/MM/YYYY - HH:mm");
        const procedureStartDate = moment(scheduleDate.toString()).format("DD/MM/YYYY - HH:mm");

        const scheduleProcedure = await saveScheduleProcedure(
          {
            procedureId: new ProcedureObject({ objectId: procedure.id }),
            scheduleId: schedule,
          },
          false,
          procedureEndDate,
          procedureStartDate,
        );

        procedure.scheduleProcedureId = scheduleProcedure.objectId;
      }
    }

  } catch (e) {
    throw e;
  }
};

export const deleteScheduleParse = async (schedule) => {
  const { id, procedures } = schedule;

  const ScheduleParse = new ScheduleObject({ objectId: id });

  try {
    const deletedSchedule = await ScheduleParse.destroy();

    for (const procedure of procedures) {
      await deleteScheduleProcedureById(procedure.scheduleProcedureId);
    }
    return buildSchedule(convertToObj(deletedSchedule), []);

  } catch (e) {
    throw e;
  }
};

export const deleteSchedulesParse = async (schedules) => {
  try {
    for (const schedule of schedules) {
      const { id, procedures } = schedule;
      const ScheduleParse = new ScheduleObject({ objectId: id });
      await ScheduleParse.destroy();
      for (const procedure of procedures) {
        await deleteScheduleProcedureById(procedure.scheduleProcedureId);
      }
    }
  } catch (e) {
    throw e;
  }
};

export const deleteSchedulesByClientId = async (clientId) => {
  const schedules = await getSchedulesByClientId(clientId, true);
  try {
    for (const schedule of schedules) {
      await schedule.destroy();
    }
  } catch (e) {
    throw e;
  }
};

export const deleteSchedulesByEmployeeId = async employeeId => {
  const schedules = await getSchedulesByEmployeeId(employeeId, true);
  try {
    for (const schedule of schedules) {
      await schedule.destroy();
    }
  } catch (e) {
    throw e;
  }
};

export const getSchedulesByClientId = async (clientId) => {
  const ScheduleQuery = new Parse.Query(ScheduleObject);
  ScheduleQuery.equalTo(
    "client_id",
    new ClientObject({ objectId: clientId }),
  );
  // ScheduleQuery.include('procedure_id');
  // ScheduleQuery.include('client_id');

  try {
    const schedules = await ScheduleQuery.find();

    return schedules.length ? await buildScheduleList(convertToObj(await ScheduleQuery.find())) : [];

  } catch (e) {
    throw e;
  }
};

export const getScheduleByProcedureId = async (procedureId) => {
  const ScheduleQuery = new Parse.Query(ScheduleObject);
  ScheduleQuery.equalTo(
    "client_id",
    new ProcedureObject({ objectId: procedureId }),
  );
  // ScheduleQuery.include('procedure_id');
  // ScheduleQuery.include('client_id');

  try {
    const schedules = await ScheduleQuery.find();

    return schedules.length ? await buildScheduleList(convertToObj(await ScheduleQuery.find())) : [];

  } catch (e) {
    throw e;
  }
};

export const getSchedulesByEmployeeId = async (employeeId) => {
    const ScheduleQuery = new Parse.Query(ScheduleObject);
    ScheduleQuery.equalTo(
      "employee_id",
      new EmployeeObject({ objectId: employeeId }),
    );
    // ScheduleQuery.include('procedure_id');
    // ScheduleQuery.include('client_id');

    try {
      const schedules = await ScheduleQuery.find();

      return schedules.length ? await buildScheduleList(convertToObj(await ScheduleQuery.find())) : [];

    } catch (e) {
      throw e;
    }
  }
;

export const confirmSchedulesList = async (scheduleId, procedures, checked) => {
    const schedule = new ScheduleObject({ objectId: scheduleId });
    schedule.set("analyzed_schedule", true);

    try {
      const confirmedSchedule = await schedule.save();
      await confirmScheduleProcedure(procedures, checked);
      procedures.forEach(procedure => {
        procedure.accomplishedSchedule = checked;
      });
      return buildSchedule(convertToObj(confirmedSchedule), procedures);
    } catch (e) {
      throw e;
    }
  }
