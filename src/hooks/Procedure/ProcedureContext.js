import React, {createContext, useContext, useEffect, useReducer} from "react";
import {
  deleteProcedureParse,
  deleteProceduresParse,
  getAllProceduresBySalonId,
  saveProcedureParse,
  updateProcedureParse,
} from "../../services/ProcedureService";
import { ProcedureReducer } from "./ProcedureReducer";
import { handleError } from "../../common/HandleError";
import { EmployeeContext } from "../Employee/EmployeeContext";
import {useUser} from "../User/UserContext";

export const ProcedureContext = createContext();

const initialState = {
  procedures: [],
};

const ProcedureProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProcedureReducer, initialState);
  const {currentUser} = useUser()

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
    dispatch({ type: "LOAD_PROCEDURES", procedures });
  };

  const saveProcedures = async payload => {
    let procedures = payload;
    let newProcedures = [];
    try {
      for (const procedure of procedures) {
        newProcedures.push(await saveProcedureParse(procedure));
      }
    } catch (e) {
      handleError(e, "procedure");
    }
    dispatch({ type: "SAVE_PROCEDURES", newProcedures });
  };

  const updateProcedure = async payload => {
    let updatedProcedure = {};
    try {
      updatedProcedure = await updateProcedureParse(payload);
    } catch (e) {
      handleError(e, "procedure");
    }
    dispatch({ type: "UPDATE_PROCEDURE", updatedProcedure });
  };


  const deleteUniqueProcedure = async payload => {
    const { id } = payload;
    let deletedProcedures = {};
    try {
      deletedProcedures = await deleteProcedureParse(id);
    } catch (e) {
      handleError(e, "procedure");
    }
    dispatch({ type: "DELETE_PROCEDURE", deletedProcedures });
  };

  const deleteProcedureList = async payload => {
      const procedures = payload;
      try {
        await deleteProceduresParse(procedures);
      } catch (e) {
        handleError(e, "procedure");
      }
    dispatch({ type: "DELETE_PROCEDURES", procedures })
  };

  const clearProcedures = payload => {
    dispatch({ type: "CLEAR_PROCEDURES", payload });
  };

  const contextValues = {
    loadAllProcedures,
    saveProcedures,
    updateProcedure,
    deleteProcedureList,
    deleteUniqueProcedure,
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
