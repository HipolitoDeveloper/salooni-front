import {buildAgenda, setNextHour, sortSchedules} from "../../factory/ScheduleFactory";


export const ScheduleReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_SCHEDULES':
            return {
                ...state,
                schedules: action.payload.schedules,
            };

        case 'SAVE_SCHEDULE':
            return {
                ...state,
                schedules: sortSchedules([...state.schedules, action.newSchedule]),
                calendarSchedule: buildAgenda([...state.schedules, action.newSchedule]),
            };

        case 'UPDATE_SCHEDULE':
            return {
                ...state,
                schedules: state.schedules.map(schedule => {
                    if (schedule.id === action.updatedSchedule.id) {

                        schedule = {
                            ...action.updatedSchedule,
                            scheduleDate: new Date(action.updatedSchedule.scheduleDate)
                        }
                    }
                    return schedule;
                }),
            };
        case 'DELETE_SCHEDULE':
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

        case 'ANALYZE_SCHEDULES':
            const {analyzedSchedules} = action;
            return {
                ...state,
                schedules: state.schedules.map(schedule => {
                    analyzedSchedules.forEach(analyzedSchedule => {
                        if (schedule.id === analyzedSchedule.id) {
                            schedule = {...analyzedSchedule};
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
