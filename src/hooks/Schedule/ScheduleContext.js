import React, {createContext, useContext, useEffect, useReducer} from "react";
import {ScheduleReducer} from "./ScheduleReducer";
import {
    analyzeSchedulesParse,
    deleteScheduleParse,
    getAllSchedulesBySalon,
    saveScheduleParse,
    updateSchedulePase, updateSchedulesParse,
} from "../../services/ScheduleService";
import {handleError} from "../../common/HandleError";
import {useUser} from "../User/UserContext";
import {useLayout} from "../Layout";
import Notifications from "../../common/Notifications";
import {updateEmployeesParse} from "../../services/EmployeeService";

export const ScheduleContext = createContext();

const initialState = {
    schedules: [],
    calendarSchedule: [],
};

const ScheduleProvider = ({children}) => {
    const [state, dispatch] = useReducer(ScheduleReducer, initialState);
    const {currentUser} = useUser()
    const {handleNotification} = useLayout()

    useEffect(() => {
        (async () => {
            const {idSalon: salonId, idFunc: employeeId, employeeType} = currentUser
            try {
                await loadAllSchedules({employeeId, salonId, employeeType})
            } catch (e) {
                console.error("loadAllSchedulesError", e)
            }
        })();
    }, []);

    const loadAllSchedules = async payload => {
        const {employeeId, salonId, employeeType} = payload;
        let schedules = [];
        try {
            schedules = await getAllSchedulesBySalon(employeeId, salonId, employeeType, false);

            if (schedules.some(schedule => !schedule.analyzedSchedule && schedule.passedHour)) {
                handleNotification(true, Notifications.unconfirmedSchedules, "UnconfirmedSchedules")
            } else {
                handleNotification(false)
            }

        } catch (e) {
            handleError(e, "schedule");
        }
        dispatch({type: "LOAD_SCHEDULES", payload: {schedules}});
        sortScheduleList();
    };


    const analyzeSchedules = async payload => {
        const schedules = payload;

        try {
            const analyzedSchedules = await analyzeSchedulesParse(schedules)
            dispatch({type: "ANALYZE_SCHEDULES", analyzedSchedules});

            return analyzedSchedules
        } catch (e) {
            handleError(e, "schedule");
        }
    }

    const saveSchedule = async (payload) => {
        let newSchedule = {};
        try {
            newSchedule = await saveScheduleParse(payload);
            dispatch({type: "SAVE_SCHEDULE", newSchedule});
        } catch (e) {
            handleError(e, "schedule");
        }

    };

    const updateSchedule = async payload => {
        let updatedSchedule = {};
        try {
            updatedSchedule = await updateSchedulePase(payload);
        } catch (e) {
            handleError(e, "schedule");
        }
        dispatch({type: "UPDATE_SCHEDULE", updatedSchedule});
    };

    const updateSchedules = async (payload) => {
        let updatedSchedules = {};
        try {
            updatedSchedules = await updateSchedulesParse(payload);
        } catch (e) {
            handleError(e, "schedule");
        }
        dispatch({type: "UPDATE_SCHEDULES", updatedSchedules});
    }

    const deleteSchedule = async payload => {
        const schedules = payload;
        try {
            await deleteScheduleParse(schedules);
        } catch (e) {
            handleError(e, "schedule");
        }
        dispatch({type: "DELETE_SCHEDULE", schedules});
        sortScheduleList();
    };

    const sortScheduleList = payload => {
        dispatch({type: "SORT_SCHEDULES", payload});
    };

    const clearSchedules = payload => {
        dispatch({type: "CLEAR_SCHEDULES", payload});
    };

    const contextValues = {
        loadAllSchedules,
        saveSchedule,
        deleteSchedule,
        updateSchedule,
        updateSchedules,
        analyzeSchedules,
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
