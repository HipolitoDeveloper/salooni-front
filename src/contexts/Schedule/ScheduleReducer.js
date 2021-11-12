import {
  buildCalendar,
  setNextHour,
  sortSchedules,
} from '../../factory/Schedule';
import moment from 'moment';

export const ScheduleReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SCHEDULES':
      state.schedules = action.schedules;
      state.calendarSchedule = buildCalendar(action.schedules);
      state.isSchedulesLoading = false;

      return {
        schedules: state.schedules,
        calendarSchedule: state.calendarSchedule,
        isSchedulesLoading: state.isSchedulesLoading,
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
      const newScheduleToSave = action.newSchedule;
      newScheduleToSave.scheduleDate = new Date(newScheduleToSave.scheduleDate);

      state.schedules.push(newScheduleToSave);
      return {
        schedules: state.schedules,
        ...state,
      };

    case 'UPDATE_SCHEDULE':
      const updatedSchedule = action.updatedSchedule;
      updatedSchedule.scheduleDate = new Date(updatedSchedule.scheduleDate);
      state.schedules = state.schedules.map(schedule => {
        if (schedule.id === updatedSchedule.id) {
          schedule = {...updatedSchedule};
        }
        return schedule;
      });

      return {
        schedules: state.schedules,
        calendarSchedule: state.calendarSchedule,
        ...state,
      };
    case 'DELETE_SCHEDULE':
      const deletedScheduleId = action.deletedScheduleId;
      state.schedules = state.schedules.filter(
        schedule => schedule.id !== deletedScheduleId,
      );

      return {
        schedules: state.schedules,
        calendarSchedule: state.calendarSchedule,
        ...state,
      };

    case 'DELETE_SCHEDULES':
      const schedules = action.schedules;
      schedules.forEach(deletedSchedule => {
        state.schedules.forEach((schedule, index) => {
          if (schedule.id === deletedSchedule.id) {
            state.schedules.splice(index, 1);
          }
        });
      });

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

    case 'DELETE_SCHEDULE_PROCEDURE':
      const {scheduleId, id} = action.deletedScheduleProcedure;
      state.schedules.forEach(schedule => {
        if (schedule.id === scheduleId) {
          schedule.procedures.forEach((procedure, index) => {
            if (procedure.id === id) {
              schedule.procedures.splice(index, 1);
            }
          });
        }
      });

      return {
        schedules: state.schedules,
        ...state,
      };

    case 'UPDATE_SCHEDULE_INVIEW':
      const scheduleInViewIndex = action.payload;
      state.registeredSchedules.forEach((schedule, index) => {
        if (scheduleInViewIndex === -1) {
          schedule.isInView = false;
        } else if (
          schedule.isInView === true &&
          index !== scheduleInViewIndex
        ) {
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

    case 'CHECK_SCHEDULE':
      const scheduleIdToCheck = action.id;
      state.schedules = state.schedules.map(schedule => {
        if (scheduleIdToCheck === -1)
          schedule.checked = schedule.firstCheckedState;
        else if (schedule.id === scheduleIdToCheck) {
          schedule.checked = !schedule.checked;
        }

        return schedule;
      });
      return {
        schedules: state.schedules,
        ...state,
      };

    case 'CONFIRM_SCHEDULE':
      const scheduleIdToConfirm = action.id;

      state.schedules = state.schedules.map(schedule => {
        if (schedule.id == scheduleIdToConfirm) {
          schedule.firstCheckedState = schedule.checked;
        }
        return schedule;
      });
      return {
        schedules: state.schedules,
        ...state,
      };

    case 'SORT_SCHEDULES':
      state.schedules = sortSchedules(state.schedules);
      state.calendarSchedule = buildCalendar(state.schedules);

      return {
        schedules: state.schedules,
        calendarSchedule: state.calendarSchedule,
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
