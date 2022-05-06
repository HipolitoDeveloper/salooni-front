import React, {createContext, useContext, useEffect, useReducer} from "react";
import {
    deleteEmployeeParse,
    getAllEmployeesBySalonId,
    saveEmployeeParse,
    updateEmployeeParse, updateEmployeesParse,
} from "../../services/EmployeeService";
import {EmployeeReducer} from "./EmployeeReducer";
import {handleError} from "../../common/HandleError";
import {useUser} from "../User/UserContext";
import {useProcedure} from "../Procedure/ProcedureContext";


export const EmployeeContext = createContext();

const initialState = {
    employees: [],
};

const EmployeeProvider = ({children}) => {
    const [state, dispatch] = useReducer(EmployeeReducer, initialState);
    const {currentUser} = useUser()
    const currentEmployee = state.employees.find(employees => employees.id === currentUser.idFunc)


    useEffect(() => {
        (async () => {
            const {idSalon} = currentUser
            try {
                await loadAllEmployees(idSalon)
            } catch (e) {
                console.error("loadAllEmployeesError", e)
            }
        })();
    }, []);

    const loadAllEmployees = async (salonId) => {
        let employees = [];
        try {
            employees = await getAllEmployeesBySalonId(salonId);

        } catch (e) {
            handleError(e, "employee");
        }
        dispatch({type: "LOAD_EMPLOYEES", employees: employees});

    };

    const saveEmployee = async employee => {
        let newEmployee = {};
        try {
            newEmployee = await saveEmployeeParse(employee);
        } catch (e) {
            handleError(e, "employee");
        }
        dispatch({type: "SAVE_EMPLOYEES", newEmployee});
    };

    const updateEmployee = async payload => {
        let updatedEmployee = {};
        try {
            updatedEmployee = await updateEmployeeParse(payload);
        } catch (e) {
            handleError(e, "employee");
        }
        dispatch({type: "UPDATE_EMPLOYEE", updatedEmployee});
    };

    const updateEmployees = async (payload) => {
        let updatedEmployees = {};
        try {
            updatedEmployees = await updateEmployeesParse(payload);
        } catch (e) {
            handleError(e, "employee");
        }
        dispatch({type: "UPDATE_EMPLOYEES", updatedEmployees});
    }

    const deleteEmployee = async payload => {
        const employees = payload;
        try {
            await deleteEmployeeParse(employees);
        } catch (e) {
            handleError(e, "employee");
        }
        dispatch({type: "DELETE_EMPLOYEE", employees});
    };


    const clearEmployees = payload => {
        dispatch({type: "CLEAR_EMPLOYEES", payload});
    };


    const contextValues = {
        loadAllEmployees,
        saveEmployee,
        updateEmployee,
        deleteEmployee,
        clearEmployees,
        updateEmployees,
        currentEmployee,
        ...state,
    };

    return (
        <EmployeeContext.Provider value={contextValues}>
            {children}
        </EmployeeContext.Provider>
    );
};

const useEmployee = () => {
    return useContext(EmployeeContext)
}

export {useEmployee, EmployeeProvider};
