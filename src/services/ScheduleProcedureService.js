import Parse from "parse/react-native";
import { ScheduleObject } from "./ScheduleService";
import {
  buildClientProcedures,
  buildScheduleProcedure,
  buildScheduleProcedureList,
  sortClientProcedures,
} from "../factory/ScheduleFactory";
import { ProcedureObject } from "./ProcedureService";
import { ClientObject } from "./ClientService";
import { convertToObj } from "../common/converters/GenericConverter";
import { buildProcedureEmployee } from "../factory/EmployeeFactory";

export const ScheduleProcedureObject = Parse.Object.extend("schedule_procedure");

export const getScheduleProceduresByScheduleId = async (
  scheduleId,
) => {
  const ScheduleProcedureQuery = new Parse.Query(ScheduleProcedureObject);
  ScheduleProcedureQuery.equalTo(
    "schedule_id",
    new ScheduleObject({ objectId: scheduleId }),
  );
  ScheduleProcedureQuery.include("procedure_id");

  try {
    const scheduleProcedures = await ScheduleProcedureQuery.find();
    return buildScheduleProcedureList(
      convertToObj(scheduleProcedures));

  } catch (e) {
    throw e;
  }
};

export const getScheduleProceduresByProcedureId = async (
  procedureId,
) => {
  const ScheduleProcedureQuery = new Parse.Query(ScheduleProcedureObject);
  ScheduleProcedureQuery.equalTo(
    "procedure_id",
    new ProcedureObject({ objectId: procedureId }),
  );

  try {
    const scheduleProcedures = await ScheduleProcedureQuery.find();
    return buildScheduleProcedureList(
      convertToObj(scheduleProcedures));

  } catch (e) {
    throw e;
  }
};

export const saveScheduleProcedure = async (
  scheduleProcedureObj,
  returnParseObject,
  procedureEndDate,
  procedureStartDate,
) => {
  const { procedureId, scheduleId } = scheduleProcedureObj;

  const ScheduleProcedureParse = new ScheduleProcedureObject();

  ScheduleProcedureParse.set("schedule_id", scheduleId);
  ScheduleProcedureParse.set("procedure_id", procedureId);
  ScheduleProcedureParse.set("procedure_end_date", procedureEndDate);
  ScheduleProcedureParse.set("procedure_start_date", procedureStartDate);

  try {
    const savedProcedureEmployee = await ScheduleProcedureParse.save();
    return buildProcedureEmployee(convertToObj(savedProcedureEmployee));

  } catch (e) {
    throw e;
  }
};

export const deleteScheduleProcedureById = async (
  scheduleProcedureId,
) => {
  const scheduleProcedure = new ScheduleProcedureObject({
    objectId: scheduleProcedureId,
  });

  try {
    const deletedScheduleProcedure = await scheduleProcedure.destroy();
    return deletedScheduleProcedure && buildScheduleProcedure(convertToObj(deletedScheduleProcedure));
  } catch (e) {
    throw e;
  }
};

export const deleteScheduleProceduresByScheduleId = async schedule => {
  const scheduleProcedures = await getScheduleProceduresByScheduleId(schedule.id);

  try {
    if (scheduleProcedures.length)
      for (const scheduleProcedure of scheduleProcedures) {
        await scheduleProcedure.destroy();
      }

  } catch (e) {
    throw e;
  }
};

export const deleteScheduleProcedureByProcedureId = async procedureId => {
  const scheduleProcedures = await getScheduleProceduresByProcedureId(procedureId);

  try {
    if (scheduleProcedures.length)
      for (const scheduleProcedure of scheduleProcedures) {
        await scheduleProcedure.destroy();
      }

  } catch (e) {
    throw e;
  }
};

export const confirmScheduleProcedure = async (procedures, checked) => {
  try {
    for (const scheduleProcedure of procedures) {
      const { scheduleProcedureId } = scheduleProcedure;
      const ScheduleProcedureParse = new ScheduleProcedureObject({
        objectId: scheduleProcedureId,
      });
      ScheduleProcedureParse.set("accomplished_schedule", checked);

      await ScheduleProcedureParse.save();
    }
  } catch (e) {
    throw e;
  }
};
//
// export const deleteProcedureEmployeeByProcedureId = async procedureId => {
//   try {
//     const proceduresEmployee = await getProcedureEmployeeByProcedureId(
//       procedureId,
//       true,
//     );
//     proceduresEmployee.map(async pe => {
//       await pe.destroy();
//     });
//   } catch (e) {
//     console.error(`Procedimento ${JSON.stringify(e)}`);
//   }
// };


