import React, {createContext, useContext, useEffect, useReducer} from "react";
import {
  deleteEmployeeParse, deleteEmployeesParse, getAllEmployeesBySalonId, saveEmployeeParse,
  updateEmployeeParse,
} from "../../services/EmployeeService";
import { deleteEmployeeProcedureParse } from "../../services/ProcedureEmployeeService";
import { EmployeeReducer } from "./EmployeeReducer";
import { handleError } from "../../common/HandleError";
import { ClientContext } from "../Client/ClientContext";
import {useUser} from "../User/UserContext";
import {useProcedure} from "../Procedure/ProcedureContext";


export const EmployeeContext = createContext();

const initialState = {
  employees: [],
};

const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(EmployeeReducer, initialState);
  const {currentUser} = useUser()
  const {procedures }= useProcedure()

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
     dispatch({ type: "LOAD_EMPLOYEES", employees: employees });

  };

  const saveEmployee = async employee => {
    let newEmployee = {};
    try {
      newEmployee = await saveEmployeeParse(employee);
    } catch (e) {
      handleError(e, "employee");
    }
    dispatch({ type: "SAVE_EMPLOYEES", newEmployee });
  };

  const updateEmployee = async payload => {
    let updatedEmployee = {};
    try {
      updatedEmployee = await updateEmployeeParse(payload);
    } catch (e) {
      handleError(e, "employee");
    }
    dispatch({ type: "UPDATE_EMPLOYEES", updatedEmployee });
  };

  const deleteUniqueEmployee = async payload => {
    const { id } = payload;

    try {
      await deleteEmployeeParse(id);
    } catch (e) {
      handleError(e, "partner");
    }
    dispatch({ type: "DELETE_EMPLOYEE", id });

  };

  const deleteEmployees = async payload => {
    const employees = payload;
    try {
      await deleteEmployeesParse(employees);
    } catch (e) {
      handleError(e, "employee");
    }
    dispatch({ type: "DELETE_EMPLOYEES", employees });
  };

  const deleteEmployeeProcedure = async payload => {
    const { procedureEmployeeId } = payload;
    let deletedProcedureEmployee = {};
    try {
      deletedProcedureEmployee = await deleteEmployeeProcedureParse(procedureEmployeeId, false);
    } catch (e) {
      handleError(e, "employee");
    }
    dispatch({
      type: "DELETE_EMPLOYEE_PROCEDURE",
      deletedProcedureEmployee,
    });
  };

  const clearEmployees = payload => {
    dispatch({ type: "CLEAR_EMPLOYEES", payload });
  };


  const contextValues = {
    loadAllEmployees,
    deleteEmployeeProcedure,
    saveEmployee,
    updateEmployee,
    deleteUniqueEmployee,
    deleteEmployees,
    clearEmployees,
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
