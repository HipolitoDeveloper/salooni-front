import {buildEmployeeObject} from './Employee';
import {buildClientObject} from './Client';
import moment from 'moment';
import {getScheduleProcedureByScheduleId} from '../services/ScheduleProcedureService';
import {buildProcedure} from './Procedure';

export const buildAgenda = schedules => {
  const scheduledDates = buildDateList(schedules);
  let scheduleList = {};

  scheduledDates.forEach(scheduledDate => {
    let schedulesInformation = [];
    schedules.forEach(schedule => {
      if (scheduledDate === schedule.formattedDate) {
        schedulesInformation.push({
          clientName: schedule.client.name,
          clientTel: schedule.client.tel,
          formattedHour: schedule.formattedHour,
          passedHour: schedule.passedHour,
          nextHour: schedule.nextHour,
        });
      }
    });

    scheduleList = {
      ...scheduleList,
      [scheduledDate]: schedulesInformation,
    };
  });

  return scheduleList;
};

export const buildSchedule = (schedule, procedures) => {
  const scheduleDate = moment(new Date(schedule.schedule_date)).format();
  const isProceduresChecked =
    procedures.length > 0
      ? procedures.some(procedure => procedure.accomplishedSchedule)
      : false;

  if (procedures.length > 0) {
    return {
      id: schedule.objectId,
      client: buildClientObject(schedule.client_id),
      employee: buildEmployeeObject(schedule.employee_id, []),
      scheduleDate: scheduleDate,
      formattedDateHour: moment(scheduleDate).format('DD/MM/YYYY - HH:mm'),
      formattedDate: moment(scheduleDate).format('YYYY-MM-DD'),
      formattedHour: moment(scheduleDate).format('HH:mm'),
      procedures: procedures,
      analyzedSchedule: schedule.analyzed_schedule,
      checked: isProceduresChecked,
      firstCheckedState: isProceduresChecked,
      passedHour: moment(scheduleDate).isBefore(
        moment(new Date().toString()).format(),
      ),
      needsToBeNotified:
        moment(scheduleDate).isBefore(moment(new Date().toString()).format()) &&
        !isProceduresChecked,
    };
  } else {
    return {
      id: schedule.objectId,
      client: buildClientObject(schedule.client_id),
      employee: buildEmployeeObject(schedule.employee_id, []),
      scheduleDate: scheduleDate,
      formattedDateHour: moment(scheduleDate).format('DD/MM/YYYY - HH:mm'),
      formattedDate: moment(scheduleDate).format('YYYY-MM-DD'),
      formattedHour: moment(scheduleDate).format('HH:mm'),
      analyzedSchedule: schedule.analyzed_schedule,
      passedHour: moment(scheduleDate).isBefore(
        moment(new Date().toString()).format(),
      ),
    };
  }
};

export const buildScheduleList = schedules => {
  return new Promise(async resolve => {
    let newSchedules = schedules.map(schedule => {
      // const scheduleDate = moment(new Date(schedule.schedule_date)).format();
      const scheduleDate = new Date(schedule.schedule_date);
      return {
        id: schedule.objectId,
        client: buildClientObject(schedule.client_id),
        employee: buildEmployeeObject(schedule.employee_id, []),
        scheduleDate: scheduleDate,
        formattedDateHour: moment(scheduleDate).format('DD/MM/YYYY - HH:mm'),
        formattedDate: moment(scheduleDate).format('YYYY-MM-DD'),
        formattedHour: moment(scheduleDate).format('HH:mm'),
        analyzedSchedule: schedule.analyzed_schedule,
        passedHour: moment(scheduleDate).isBefore(
          moment(new Date().toString()).format(),
        ),
      };
    });

    for (let i = 0; i < newSchedules.length; i++) {
      let schedule = newSchedules[i];
      schedule.procedures = await getScheduleProcedureByScheduleId(
        schedule.id,
        false,
      );

      schedule.checked = schedule.procedures.every(
        procedure => procedure.accomplishedSchedule,
      );
      schedule.firstCheckedState = schedule.procedures.every(
        procedure => procedure.accomplishedSchedule,
      );
      schedule.needsToBeNotified = schedule.passedHour && !schedule.checked;
    }

    const organizedSchedules = sortSchedules(setNextHour(newSchedules));
    resolve(organizedSchedules);
  });
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
    };
  });
};

export const buildScheduleProcedure = scheduleProcedure => {
  return {
    ...buildProcedure(scheduleProcedure.procedure_id),
    scheduleProcedureId: scheduleProcedure.objectId,
    scheduleId: scheduleProcedure?.schedule_id?.objectId,
    accomplishedSchedule: scheduleProcedure.accomplished_schedule,
  };
};

export const setNextHour = schedules => {
  schedules.forEach(schedule => {
    schedule.nextHour = false;
  });
  const currentDate = moment(new Date().toString()).format();

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
