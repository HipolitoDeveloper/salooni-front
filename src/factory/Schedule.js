import {buildEmployeeObject} from './Employee';
import {buildClientObject} from './Client';
import moment from 'moment';
import {getScheduleProcedureByScheduleId} from '../services/ScheduleProcedureService';
import {buildProcedure} from './Procedure';

export const buildCalendar = schedules => {
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
  return {
    id: schedule.objectId,
    client: buildClientObject(schedule.client_id),
    employee: buildEmployeeObject(schedule.employee_id, []),
    scheduleDate: scheduleDate,
    passedHour: false,
    formattedDateHour: moment(scheduleDate).format('DD-MM-YYYY - HH:mm'),
    formattedDate: moment(scheduleDate).format('YYYY-MM-DD'),
    formattedHour: moment(scheduleDate).format('HH:mm'),
    procedures: procedures,
    analyzedSchedule: schedule.analyzed_schedule,
  };
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
        formattedDateHour: moment(scheduleDate).format('DD-MM-YYYY - HH:mm'),
        formattedDate: moment(scheduleDate).format('YYYY-MM-DD'),
        formattedHour: moment(scheduleDate).format('HH:mm'),
        analyzedSchedule: schedule.analyzed_schedule,
      };
    });

    for (let i = 0; i < newSchedules.length; i++) {
      let schedule = newSchedules[i];
      schedule.procedures = await getScheduleProcedureByScheduleId(
        schedule.id,
        false,
      );
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

export const buildScheduleProcedure = scheduleProcedures => {
  return scheduleProcedures.map(sp => {
    return {
      ...buildProcedure(sp.procedure_id),
      scheduleProcedureId: sp.objectId,
    };
  });
};

export const setNextHour = schedules => {
  schedules.forEach(schedule => {
    schedule.nextHour = false;
  });
  const currentDate = moment(new Date().toString()).format();

  schedules.forEach(schedule => {
    schedule.nextHour =
      moment(currentDate).isBefore(schedule.scheduleDate) &&
      !schedules.some(sch => sch.nextHour);
  });

  return schedules;
};

export const sortSchedules = schedules => {
  schedules.sort((a, b) => {
    if (a.scheduleDate > b.scheduleDate) return -1;
    else if (a.scheduleDate < b.scheduleDate) return 1;
    return 0;
  });

  return setNextHour(schedules);
};
