import React, {createContext, useReducer} from 'react';
import {ScheduleReducer} from './ScheduleReducer';
import {
  deleteScheduleCRUD,
  getAllSchedules,
  insertScheduleCRUD,
  updateScheduleCRUD,
} from '../../services/ScheduleService';

export const ScheduleContext = createContext();

const initialState = {
  schedules: [],
  calendarSchedule: [],
  registeredSchedules: [],
  scheduleInView: {},
  dropdownClients: [],
};

const ScheduleProvider = ({children}) => {
  const [state, dispatch] = useReducer(ScheduleReducer, initialState);

  const loadAllSchedules = (payload, refreshSchedules) => {
    const {employeeId, salonId, employeeType} = payload;
    return new Promise(async (resolve, reject) => {
      try {
        await getAllSchedules(employeeId, salonId, employeeType, false).then(
          schedules => {
            resolve(dispatch({type: 'LOAD_SCHEDULES', schedules}));

            // console.log((state.clients = clients));
          },
        );
      } catch (e) {
        reject(`Deu ruim ao listar clientes ${e}`);
      }
    });
  };

  const addSchedule = payload => {
    dispatch({type: 'ADD_SCHEDULE', payload});
  };

  const saveSchedule = payload => {
    return new Promise((resolve, reject) => {
      try {
        state.registeredSchedules.forEach(schedule => {
          insertScheduleCRUD(schedule, false).then(newSchedule => {
            dispatch({type: 'SAVE_SCHEDULE', newSchedule});
          });
        });
        resolve('Deu bom');
      } catch (e) {
        reject(`Deu ruim ao salvar agendamentos ${e}`);
      }
    });
  };

  const updateSchedule = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        updateScheduleCRUD(payload, false).then(updatedSchedule => {
          resolve(dispatch({type: 'UPDATE_SCHEDULE', updatedSchedule}));
        });
      } catch (e) {
        reject(`Deu ruim ao editar agendamentos ${e}`);
      }
    });
  };

  const deleteSchedule = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        const schedule = payload;

        dispatch({type: 'DELETE_SCHEDULE', payload});
        resolve(await deleteScheduleCRUD(schedule));
      } catch (e) {
        reject(`Deu ruim ao excluir agendamentos ${e}`);
      }
    });
  };

  const deleteScheduleInView = payload => {
    dispatch({type: 'DELETE_SCHEDULE_INVIEW', payload});
  };

  const updateScheduleInView = payload => {
    dispatch({type: 'UPDATE_SCHEDULE_INVIEW', payload});
  };

  const editSchedule = payload => {
    dispatch({type: 'EDIT_SCHEDULE', payload});
  };

  const cleanRegisteredSchedules = payload => {
    dispatch({type: 'CLEAN_REGISTERED_SCHEDULES', payload});
  };

  const cleanSchedules = payload => {
    dispatch({type: 'CLEAN_SCHEDULES', payload});
  };

  const contextValues = {
    loadAllSchedules,
    addSchedule,

    saveSchedule,
    cleanRegisteredSchedules,
    cleanSchedules,

    updateSchedule,
    deleteSchedule,
    deleteScheduleInView,
    updateScheduleInView,
    editSchedule,
    ...state,
  };

  return (
    <ScheduleContext.Provider value={contextValues}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleProvider;
