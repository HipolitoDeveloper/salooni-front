import { buildAgenda, sortSchedules } from "../../factory/ScheduleFactory";


export const ScheduleReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SCHEDULES':
      return {
        ...state,
        schedules: action.payload.schedules,
        calendarSchedule: action.payload.calendarSchedule,
      };

    case 'SAVE_SCHEDULE':
      return {
        ...state,
        schedules: [...state.schedules, { ...action.newSchedule, scheduleDate: new Date(action.newSchedule.scheduleDate) }],
      };

    case 'UPDATE_SCHEDULE':
      return {
        ...state,
        schedules: state.schedules.map(schedule => {
          if (schedule.id === action.updatedSchedule.id) {

            schedule = { ...action.updatedSchedule, scheduleDate: new Date(action.updatedSchedule.scheduleDate) }
          }
          return schedule;
        }),
      };
    case 'DELETE_SCHEDULE':
      return {
        ...state,
        schedules:  state.schedules.filter(
          schedule => schedule.id !== action.deletedScheduleId,
        ),
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
        ...state,
        schedules: state.schedules,
      };

    case 'DELETE_SCHEDULE_PROCEDURE':
      const { scheduleId, id } = action.deletedScheduleProcedure;
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

    case 'CHECK_SCHEDULE':
      const {id: scheduleIdToCheck} = action;
      return {
        ...state,
        schedules: state.schedules.map(schedule => {
          if (scheduleIdToCheck === -1)
            schedule.checked = schedule.firstCheckedState;
          else if (schedule.id === scheduleIdToCheck) {
            schedule.checked = !schedule.checked;
          }

          return schedule;
        })
      };

    case 'CONFIRM_SCHEDULE':
      const { confirmedSchedules } = action;
      return {
        ...state,
        schedules: state.schedules.map(schedule => {
          confirmedSchedules.forEach(confirmedSchedule => {
            if (schedule.id === confirmedSchedule.id) {
              schedule = { ...confirmedSchedule };
            }
          })
          return schedule;
        })
      };

    case 'SORT_SCHEDULES':
      return {
        ...state,
        schedules: sortSchedules(state.schedules),
        calendarSchedule: buildAgenda(state.schedules),
      };

    case 'CLEAR_SCHEDULES':
      return {
        ...state,
        schedules: [],
      };

    default:
      return state;
  }
};
