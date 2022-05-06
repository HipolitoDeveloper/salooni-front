import React, {createContext, useContext, useEffect, useReducer} from "react";
import {
    deleteProcedureParse,
    getAllProceduresBySalonId,
    saveProcedureParse,
    updateProcedureParse,
} from "../../services/ProcedureService";
import {ProcedureReducer} from "./ProcedureReducer";
import {handleError} from "../../common/HandleError";
import {useEmployee} from "../Employee/EmployeeContext";
import {useUser} from "../User/UserContext";
import {useSchedule} from "../Schedule/ScheduleContext";

export const ProcedureContext = createContext();

const initialState = {
    procedures: [],
};

const ProcedureProvider = ({children}) => {
    const [state, dispatch] = useReducer(ProcedureReducer, initialState);
    const {currentUser} = useUser()
    const {updateEmployees, updateEmployee, employees, currentEmployee} = useEmployee()
    const {schedules, updateSchedules} = useSchedule()


    useEffect(() => {
        (async () => {
            const {idSalon} = currentUser
            try {
                await loadAllProcedures(idSalon)
            } catch (e) {
                console.error("loadAllProceduresError", e)
            }
        })();
    }, []);

    const loadAllProcedures = async payload => {
        let procedures = [];
        try {
            procedures = await getAllProceduresBySalonId(payload);
        } catch (e) {
            handleError(e, "procedure");
        }
        dispatch({type: "LOAD_PROCEDURES", procedures});
    };

    const saveProcedures = async payload => {
        let procedures = payload;
        try {
            const newProcedures = await saveProcedureParse(procedures);
            dispatch({type: "SAVE_PROCEDURES", newProcedures});

            currentEmployee.procedures.push(...newProcedures)

            await updateEmployee(currentEmployee)

        } catch (e) {
            handleError(e, "procedure");
        }
    };

    const updateProcedure = async payload => {
        let updatedProcedure = {};
        try {
            updatedProcedure = await updateProcedureParse(payload);
            dispatch({type: "UPDATE_PROCEDURE", updatedProcedure});

        } catch (e) {
            handleError(e, "procedure");
        }
    };

    const deleteProcedure = async payload => {
        const deletedProcedures = payload;
        try {
            await deleteProcedureParse(deletedProcedures);
            dispatch({type: "DELETE_PROCEDURE", deletedProcedures})

            employees.map((employee) => {
                employee.procedures.forEach((procedure, index) => {
                    if (deletedProcedures.some(deletedProcedure => deletedProcedure.id = procedure.id)) {
                        employee.procedures.splice(index, 1)
                    }
                })

                return employee
            })

            schedules.map((schedule) => {
                schedule.procedures.forEach((procedure, index) => {
                    if (deletedProcedures.some(deletedProcedure => deletedProcedure.id = procedure.id)) {
                        schedule.procedures.splice(index, 1)
                    }
                })

                return schedule
            })

            await updateEmployees(employees)
            await updateSchedules(schedules)
        } catch (e) {
            handleError(e, "procedure");
        }
    };

    const clearProcedures = payload => {
        dispatch({type: "CLEAR_PROCEDURES", payload});
    };

    const contextValues = {
        loadAllProcedures,
        saveProcedures,
        updateProcedure,
        deleteProcedure,
        clearProcedures,
        ...state,
    };

    return (
        <ProcedureContext.Provider value={contextValues}>
            {children}
        </ProcedureContext.Provider>
    );
};

const useProcedure = () => {
    return useContext(ProcedureContext)
}

export {useProcedure, ProcedureProvider};
