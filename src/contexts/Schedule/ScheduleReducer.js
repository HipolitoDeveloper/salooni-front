import {
  buildCalendar,
  setNextHour,
  sortSchedules,
} from '../../factory/Schedule';

export const ScheduleReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SCHEDULES':
      state.schedules = action.schedules;

      state.calendarSchedule = buildCalendar(action.schedules);

      return {
        schedules: state.schedules,
        calendarSchedule: state.calendarSchedule,
        ...state,
      };
    case 'ADD_SCHEDULE':
      const {client, employee, procedures, scheduleDate, salonId} =
        action.payload;

      let newSchedules = state.registeredSchedules;
      const newSchedule = {
        employee: employee,
        client: client,
        procedures: procedures,
        scheduleDate: scheduleDate,
        salonId: salonId,
      };
      newSchedules.push(newSchedule);

      state.registeredSchedules = newSchedules;
      return {
        registeredSchedules: state.registeredSchedules,
        ...state,
      };

    case 'SAVE_SCHEDULE':
      state.schedules.push(action.newSchedule);
      state.schedules = sortSchedules(state.schedules);
      state.calendarSchedule = buildCalendar(state.schedules);

      return {
        schedules: state.schedules,
        calendarSchedule: state.calendarSchedule,
        ...state,
      };

    case 'UPDATE_SCHEDULE':
      const updatedSchedule = action.updatedSchedule;
      state.schedules = state.schedules.map(schedule => {
        if (schedule.id === updatedSchedule.id) {
          schedule = {...updatedSchedule};
        }
        return schedule;
      });

      state.schedules = sortSchedules(state.schedules);
      state.calendarSchedule = buildCalendar(state.schedules);

      return {
        schedules: state.schedules,
        calendarSchedule: state.calendarSchedule,
        ...state,
      };
    case 'DELETE_SCHEDULE':
      const {id} = action.payload;
      state.schedules.forEach((schedule, index) => {
        if (schedule.id === id) {
          state.schedules.splice(index, 1);
        }
      });

      state.schedules = sortSchedules(state.schedules);
      state.calendarSchedule = buildCalendar(state.schedules);

      return {
        schedules: state.schedules,
        calendarSchedule: state.calendarSchedule,
        ...state,
      };

    case 'DELETE_SCHEDULE_INVIEW':
      const scheduleToDelete = action.payload;

      const indexToDelete = state.registeredSchedules.indexOf(scheduleToDelete);
      state.registeredSchedules.splice(indexToDelete, 1);

      return {
        registeredSchedules: state.registeredSchedules,
        ...state,
      };

    case 'UPDATE_SCHEDULE_INVIEW':
      const scheduleInViewIndex = action.payload;
      state.registeredSchedules.forEach((schedule, index) => {
        if (schedule.isInView === true && index !== scheduleInViewIndex) {
          schedule.isInView = false;
        }
      });
      return {
        registeredSchedules: state.registeredSchedules,
        ...state,
      };
    case 'EDIT_SCHEDULE':
      const {schedule, index} = action.payload;
      state.registeredSchedules = state.registeredSchedules.map((c, i) => {
        if (index === i) {
          c = {...schedule};
        }

        return c;
      });

      return {
        registeredSchedules: state.registeredSchedules,
        ...state,
      };

    case 'CLEAN_REGISTERED_SCHEDULES':
      state.registeredSchedules = [];
      return {
        registeredSchedules: state.registeredSchedules,
        ...state,
      };
    case 'CLEAN_SCHEDULES':
      return {
        schedules: [],
        ...state,
      };

    default:
      return state;
  }
};
