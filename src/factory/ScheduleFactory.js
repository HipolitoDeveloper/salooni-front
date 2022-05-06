import moment from 'moment';
import {getScheduleProceduresByScheduleId} from '../services/ScheduleProcedureService';
import {convertStringDateToDate} from '../common/converters/DateConverter';
import {buildClientObject} from "./ClientFactory";
import {buildProcedure} from "./ProcedureFactory";
import {buildEmployeeObject} from "./EmployeeFactory";
import Colors from "../common/style/Colors";
import intl from 'intl/lib/core';


const date = new Date()
const userTimezoneOffset = Math.abs(180 * 60000);
export const currentDate = new Date(date.getTime() - userTimezoneOffset);

export const buildAgenda = schedules => {
    const scheduledDates = buildDateList(schedules);
    let scheduleList = {};

    scheduledDates.forEach(scheduledDate => {
        let schedulesInformation = [];
        schedules.forEach(schedule => {
            if (scheduledDate === schedule.formattedDate) {
                schedulesInformation.push({
                    ...schedule,
                    startingDay: true,
                    endingDay: true,
                    color: `${Colors.PURPLE}`,

                });
            }
        });

        scheduleList = {
            ...scheduleList,
            [scheduledDate]: {periods: schedulesInformation},
        };
    });

    return scheduleList;
};

export const buildSchedule = (schedule) => {
    const scheduleDate = new Date(schedule?.schedule_date)
    const procedures = JSON.parse(schedule.procedures)

    // const isProceduresChecked =
    //     procedures.length > 0
    //         ? procedures.some(procedure => procedure.accomplishedSchedule)
    //         : false;


    const passedHour = moment(scheduleDate).isBefore(
        moment(currentDate).format(),
    )

    return {
        id: schedule.objectId,
        client: buildClientObject(schedule.client_id),
        employee: buildEmployeeObject(schedule.employee_id),
        scheduleDate: scheduleDate,
        formattedDateHour: moment(scheduleDate).format('DD/MM/YYYY - HH:mm'),
        formattedDate: moment(scheduleDate).format('YYYY-MM-DD'),
        formattedHour: moment(scheduleDate).format('HH:mm'),
        procedures: procedures,
        analyzedSchedule: schedule.analyzed_schedule,
        marked: schedule.accomplished_schedule,
        passedHour: passedHour,
        startingDay: true,
        endingDay: true,
        color: `${Colors.PURPLE}`
    };
};

export const buildScheduleList = schedules => {
    let newSchedules = schedules.map(schedule => {
        // const scheduleDate = moment(new Date(schedule.schedule_date)).format();
        const scheduleDate = new Date(schedule?.schedule_date)
        const procedures = JSON.parse(schedule.procedures)

        return {
            id: schedule.objectId,
            client: buildClientObject(schedule.client_id),
            employee: buildEmployeeObject(schedule.employee_id, []),
            scheduleDate: scheduleDate,
            procedures: procedures,
            formattedDateHour: moment(scheduleDate).format('DD/MM/YYYY - HH:mm'),
            formattedDate: moment(scheduleDate).format('YYYY-MM-DD'),
            formattedHour: moment(scheduleDate).format('HH:mm'),
            analyzedSchedule: schedule.analyzed_schedule,
            passedHour: moment(scheduleDate).isBefore(
                moment(currentDate).format(),
            ),
            marked: schedule.accomplished_schedule,
            // marked: procedures.length ? procedures?.every(
            //     procedure => procedure.accomplished_procedure,
            // ) : false
        };
    });

    return newSchedules;
};

const buildDateList = schedules => {
    let scheduledDates = [];
    schedules.forEach(schedule => {
        if (scheduledDates.length === 0)
            scheduledDates.push(schedule.formattedDate);
        else if (
            !scheduledDates.some(
                scheduledDate => scheduledDate === schedule.formattedDate,
            )
        )
            scheduledDates.push(schedule.formattedDate);
    });

    return scheduledDates;
};

export const buildScheduleProcedureList = scheduleProcedures => {
    return scheduleProcedures.map(sp => {
        return {
            ...buildProcedure(sp.procedure_id),
            scheduleProcedureId: sp.objectId,
            accomplishedSchedule: sp.accomplished_schedule,
            startDate: sp.procedure_start_date,
            endDate: sp.procedure_end_date
        };
    });
};

export const buildScheduleProcedure = scheduleProcedure => {
    return {
        ...buildProcedure(scheduleProcedure.procedure_id),
        scheduleProcedureId: scheduleProcedure.objectId,
        scheduleId: scheduleProcedure?.schedule_id?.objectId,
        accomplishedSchedule: scheduleProcedure.accomplished_schedule,
        startDate: sp.procedure_start_date,
        endDate: sp.procedure_end_date
    };
};

export const setNextHour = schedules => {
    schedules.forEach(schedule => {
        schedule.nextHour = false;
    });

    let nextScheduleHour = '';
    schedules.forEach(schedule => {
        if (moment(currentDate).isBefore(schedule.scheduleDate)) {
            if (nextScheduleHour !== '') {
                if (moment(schedule.scheduleDate).isBefore(nextScheduleHour)) {
                    nextScheduleHour = schedule.scheduleDate;
                }
            } else {
                nextScheduleHour = schedule.scheduleDate;
            }
        }
    });

    schedules.forEach(schedule => {
        schedule.nextHour = schedule.scheduleDate === nextScheduleHour;
    });

    return schedules;
};

export const sortSchedules = schedules => {
    const newSchedules = setNextHour(schedules);
    newSchedules.sort((a, b) => {
        if (a.scheduleDate > b.scheduleDate) return -1;
        else if (a.scheduleDate < b.scheduleDate) return 1;
        return 0;
    });

    return newSchedules;
};

export const buildClientProcedures = (schedulesProcedures) => {
    const newProcedures = [];
    schedulesProcedures.map(schedule => {
        newProcedures.push({
            id: schedule.objectId,
            procedure: {...buildProcedure(schedule.procedure_id)},
            schedule: {...buildSchedule(schedule.schedule_id)}
        })
    })

    return newProcedures

}

export const sortClientProcedures = (clientProcedures) => {
    clientProcedures.sort((a, b) => {
        if (a.schedule.scheduleDate > b.schedule.scheduleDate) return -1;
        else if (a.schedule.scheduleDate < b.schedule.scheduleDate) return 1;
        return 0;
    });

    return clientProcedures;

}


