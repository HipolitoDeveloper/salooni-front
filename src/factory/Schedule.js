import {buildEmployeeObject} from './Partner';
import {buildClientObject} from './Client';

export const buildScheduleList = schedules => {
  console.log(schedules);
  return schedules.map(schedule => {
    return {
      client: buildClientObject(schedule.IdClienteFK),
      employee: buildEmployeeObject(schedule.IdFuncFK),
      scheduleDate: schedule.DataAgendamento,
    };
  });
};
