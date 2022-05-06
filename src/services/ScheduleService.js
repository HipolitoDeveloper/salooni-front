import Parse from "parse/react-native";
import {EmployeeObject} from "./EmployeeService";
import {ClientObject} from "./ClientService";
import {buildSchedule, buildScheduleList} from "../factory/ScheduleFactory";
import {ProcedureObject} from "./ProcedureService";
import {
    confirmScheduleProcedure,
    deleteScheduleProcedureById,
    saveScheduleProcedure,
} from "./ScheduleProcedureService";
import {SalonObject} from "./SalonService";
import moment from "moment";
import {convertToObj} from "../common/converters/GenericConverter";
import {buildEmployeeList} from "../factory/EmployeeFactory";

export const ScheduleObject = Parse.Object.extend("schedule");

export const getAllSchedulesBySalon = async (
    employeeId,
    salonId,
    employeeType,
) => {
    const ScheduleQuery = new Parse.Query(ScheduleObject);
    ScheduleQuery.equalTo("salon_id", new SalonObject({objectId: salonId}));
    if (employeeType === "FNC") {
        ScheduleQuery.equalTo(
            "employee_id",
            new EmployeeObject({objectId: employeeId}),
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
    ScheduleParse.set("employee_id", new EmployeeObject({objectId: employee.id}));
    ScheduleParse.set("client_id", new ClientObject({objectId: client.id}));
    ScheduleParse.set("salon_id", new SalonObject({objectId: salonId}));
    // schedule.set('Observacao', 'Teste');
    ScheduleParse.set("schedule_date", scheduleDate.toString());
    ScheduleParse.set("procedures", JSON.stringify(procedures.map(procedure => {
        const procedureEndDate = moment(scheduleDate).add(procedure.time, "minutes").format("DD/MM/YYYY - HH:mm");
        const procedureStartDate = moment(scheduleDate.toString()).format("DD/MM/YYYY - HH:mm");
        return {
            procedure_start_date: procedureStartDate,
            procedure_end_date: procedureEndDate,
            id: procedure.id,
            // accomplished_procedure: false //TODO: Verificação especifica de procedimento por procedimento
        }
    })));
    ScheduleParse.set('analyzed_schedule', false);
    ScheduleParse.set('accomplished_schedule', false);

    try {
        const savedSchedule = await ScheduleParse.save();

        return buildSchedule(convertToObj(savedSchedule));

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
        analyzedSchedule,
        marked,
        scheduleDate,
    } = scheduleObj;
    const schedule = new ScheduleObject({objectId: id});
    schedule.set("employee_id", new EmployeeObject({objectId: employee.id}));
    schedule.set("client_id", new ClientObject({objectId: client.id}));
    // schedule.set('Observacao', 'Teste');
    schedule.set("procedures", JSON.stringify(procedures.map(procedure => {
        const procedureEndDate = moment(scheduleDate).add(procedure.time, "minutes").format("DD/MM/YYYY - HH:mm");
        const procedureStartDate = moment(scheduleDate.toString()).format("DD/MM/YYYY - HH:mm");
        return {
            procedure_start_date: procedureStartDate,
            procedure_end_date: procedureEndDate,
            id: procedure.id,
            // accomplished_procedure: false
        }
    })));
    schedule.set("schedule_date", scheduleDate.toString());
    schedule.set('analyzed_schedule', analyzedSchedule);
    schedule.set('accomplished_schedule', marked);

    console.log("marked", marked)
    try {
        const updatedSchedule = await schedule.save();

        return buildSchedule(convertToObj(updatedSchedule));
    } catch (e) {
        throw e;
    }
};

export const updateSchedulesParse = async (schedules) => {
    const schedulesParse = schedules.map(({
                                              id,
                                              client,
                                              employee,
                                              procedures,
                                              analyzedSchedule,
                                              scheduleDate,
                                              marked
                                          }) => {
        const schedule = new ScheduleObject({objectId: id});
        schedule.set("employee_id", new EmployeeObject({objectId: employee.id}));
        schedule.set("client_id", new ClientObject({objectId: client.id}));
        // schedule.set('Observacao', 'Teste');
        schedule.set("procedures", JSON.stringify(procedures.map(procedure => {
            const procedureEndDate = moment(scheduleDate).add(procedure.time, "minutes").format("DD/MM/YYYY - HH:mm");
            const procedureStartDate = moment(scheduleDate.toString()).format("DD/MM/YYYY - HH:mm");
            return {
                procedure_start_date: procedureStartDate,
                procedure_end_date: procedureEndDate,
                id: procedure.id,
                // accomplished_procedure: false
            }
        })));
        schedule.set("schedule_date", scheduleDate.toString());
        schedule.set('analyzed_schedule', analyzedSchedule);
        schedule.set('accomplished_schedule', marked);

        return schedule
    })

    try {
        const savedSchedules = await Parse.Object.saveAll(schedulesParse);
        return buildScheduleList(convertToObj(savedSchedules));
    } catch (e) {
        throw e;
    }
};

export const deleteScheduleParse = async (schedules) => {
    const schedulesToDelete = []

    schedules.forEach(({id}) => {
        schedulesToDelete.push(new ScheduleObject({objectId: id}))
    })

    try {
        await Parse.Object.destroyAll(schedulesToDelete);

    } catch (e) {
        throw e;
    }
};


export const deleteSchedulesByClients = async (clientsId) => {
    const ScheduleQuery = new Parse.Query(ScheduleObject);
    ScheduleQuery.containedIn(
        "client_id",
        clientsId,
    );

    try {
        const schedules = await ScheduleQuery.find()
        await Parse.Object.destroyAll(schedules)
    } catch (e) {
        throw e;
    }
};

export const deleteSchedulesByEmployees = async employeesId => {
    const ScheduleQuery = new Parse.Query(ScheduleObject);
    ScheduleQuery.containedIn(
        "employee_id",
        employeesId,
    );

    try {
        const schedules = await ScheduleQuery.find()
        await Parse.Object.destroyAll(schedules)
    } catch (e) {
        throw e;
    }
};


export const getSchedulesByClientId = async (clientId) => {
    const ScheduleQuery = new Parse.Query(ScheduleObject);
    ScheduleQuery.equalTo(
        "client_id",
        new ClientObject({objectId: clientId}),
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
        new ProcedureObject({objectId: procedureId}),
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
            new EmployeeObject({objectId: employeeId}),
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

export const analyzeSchedulesParse = async (analyzedSchedules) => {
    // const ScheduleQuery = new Parse.Query(ScheduleObject);
    // ScheduleQuery.containedIn(
    //     "objectId",
    //     analyzedSchedules.map(schedule => {return schedule.id}),
    // );

    const schedulesParse = analyzedSchedules.map(schedule => {
        const updatedSchedule = new ScheduleObject({
            objectId: schedule.id
        })
        updatedSchedule.set("analyzed_schedule", true)
        updatedSchedule.set("procedures", JSON.stringify(schedule.procedures.map(procedure => {
            return {
                ...procedure,
                created_at: new Date(),
            }
        })))
        updatedSchedule.set('accomplished_schedule', schedule.marked);


        return updatedSchedule
    })
    try {
        const newSchedules = await Parse.Object.saveAll(schedulesParse)

        return newSchedules.length ? await buildScheduleList(convertToObj(newSchedules)) : [];

    } catch (e) {
        throw e;
    }
}
