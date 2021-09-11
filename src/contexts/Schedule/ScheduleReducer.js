export const ScheduleReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SCHEDULES':
      state.schedules = action.schedules;
      return {
        schedules: state.schedules,
        ...state,
      };
    case 'ADD_SCHEDULE':
      const {employee, client, procedures} = action.payload;
      let newSchedules = state.registeredSchedules;
      const newSchedule = {
        IdFuncFK: employee,
        IdClient: client,
        IdProcFK: procedures,
      };
      newSchedules.push(newSchedule);

      return {
        registeredSchedules: newSchedules,
        ...state,
      };

    case 'SAVE_SCHEDULES':
      state.schedules.push(action.newSchedule);
      return {
        schedules: state.schedules,
        ...state,
      };

    case 'UPDATE_SCHEDULE':
      return {
        scheduleInView: {},
        ...state,
      };
    case 'DELETE_SCHEDULE':
      const {objectId} = action.payload;
      state.schedules.forEach((client, index) => {
        if (client.objectId === objectId) {
          state.schedules.splice(index, 1);
        }
      });

      return {
        schedules: state.schedules,
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
      state.registeredSchedules.map((schedule, index) => {
        if (schedule.isInView === true && index !== scheduleInViewIndex) {
          schedule.isInView = false;
        }

        return schedule;
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
      state.registeredClients = [];
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
