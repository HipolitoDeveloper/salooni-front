import React, {createContext, useContext, useEffect, useReducer} from "react";
import { ScheduleReducer } from "./ScheduleReducer";
import {
  confirmSchedulesList,
  deleteScheduleParse, deleteSchedulesParse,
  getAllSchedulesBySalon,
  saveScheduleParse,
  updateSchedulePase,
} from "../../services/ScheduleService";
import { deleteScheduleProcedureById } from "../../services/ScheduleProcedureService";
import { handleError } from "../../common/HandleError";
import { buildAgenda } from "../../factory/ScheduleFactory";
import { ProcedureContext } from "../Procedure/ProcedureContext";
import {convertToObj} from "../../common/converters/GenericConverter";
import Parse from "parse/react-native";
import Constants from "../../common/Constants";

export const ScheduleContext = createContext();

const initialState = {
  schedules: [],
  calendarSchedule: [],
  registeredSchedules: [],
};

const ScheduleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ScheduleReducer, initialState);

  useEffect(() => {
    console.log("Schedule")
    // (async () => {
    //   const currentUser = convertToObj(await Parse.User.currentAsync());
    //   await setCurrentUser(currentUser);
    //   changeStack(
    //       currentUser ? Constants.IN_ROUTE_STACK : Constants.OUT_ROUTE_STACK
    //   );
    // })();
  }, []);

  const loadAllSchedules = async payload => {
    const { employeeId, salonId, employeeType } = payload;
    let schedules = [];
    try {
      schedules = await getAllSchedulesBySalon(employeeId, salonId, employeeType, false);
    } catch (e) {
      handleError(e, "schedule");
    }
    const calendarSchedule = buildAgenda(schedules);
    dispatch({ type: "LOAD_SCHEDULES", payload: { schedules: schedules, calendarSchedule: calendarSchedule } });
    sortScheduleList();
  };

  const checkSchedule = payload => {
    const id = payload;
    dispatch({ type: "CHECK_SCHEDULE", id });
  };

  const confirmSchedules = async payload => {
    const toConfirmSchedules = payload;
    let confirmedSchedules = [];

    try {
      for (const schedule of toConfirmSchedules) {
        const { id, procedures, checked } = schedule;
        confirmedSchedules.push(await confirmSchedulesList(id, procedures, checked));
      }
    } catch (e) {
      handleError(e, "schedule");
    }
    dispatch({ type: "CONFIRM_SCHEDULE", confirmedSchedules });
  };

  const saveSchedule = async (payload) => {
    let newSchedule = {};
    try {
      newSchedule = await saveScheduleParse(payload, false);
    } catch (e) {
      handleError(e, "schedule");
    }
    dispatch({ type: "SAVE_SCHEDULE", newSchedule });
  };

  const updateSchedule = async payload => {
    let updatedSchedule = {};
    try {
      updatedSchedule = await updateSchedulePase(payload);
    } catch (e) {
      handleError(e, "schedule");
    }
    dispatch({ type: "UPDATE_SCHEDULE", updatedSchedule });
  };

  const deleteUniqueSchedule = async payload => {
    const schedule = payload;
    try {
      await deleteScheduleParse(schedule);
    } catch (e) {
      handleError(e, "schedule");
    }
    dispatch({ type: "DELETE_SCHEDULE", deletedScheduleId: schedule.id });
    sortScheduleList();
  };

  const deleteScheduleList = async payload => {
    const schedules = payload;
    try {
      await deleteSchedulesParse(schedules);
    } catch (e) {
      handleError(e, "schedule");
    }
    dispatch({ type: "DELETE_SCHEDULES", schedules });
    sortScheduleList();
  };

  const deleteScheduleProcedure = async payload => {
    const { scheduleProcedureId } = payload;
    let deletedScheduleProcedure = {};
    try {
      deletedScheduleProcedure = await deleteScheduleProcedureById(scheduleProcedureId, false);
    } catch (e) {
      handleError(e, "schedule");
    }
    dispatch({
      type: "DELETE_SCHEDULE_PROCEDURE",
      deletedScheduleProcedure,
    });
    sortScheduleList();
  };

  const sortScheduleList = payload => {
    dispatch({ type: "SORT_SCHEDULES", payload });
  };

  const clearSchedules = payload => {
    dispatch({ type: "CLEAR_SCHEDULES", payload });
  };

  const contextValues = {
    loadAllSchedules,
    deleteScheduleProcedure,
    saveSchedule,
    sortScheduleList,
    deleteUniqueSchedule,
    deleteScheduleList,
    updateSchedule,
    checkSchedule,
    confirmSchedules,
    clearSchedules,
    ...state,
  };

  return (
    <ScheduleContext.Provider value={contextValues}>
      {children}
    </ScheduleContext.Provider>
  );
};

const useSchedule = () => {
  return useContext(ScheduleContext)
}

export {useSchedule, ScheduleProvider};
