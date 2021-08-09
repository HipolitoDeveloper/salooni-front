import React, {createContext, useReducer} from 'react';
import {ProcedureReducer} from './ProcedureReducer';

export const ProcedureContext = createContext();

const initialState = {
  procedures: [],
  procedureInView: {},
};

const ProcedureProvider = ({children}) => {
  const [state, dispatch] = useReducer(ProcedureReducer, initialState);

  const addProcedure = payload => {
    dispatch({type: 'ADD_PROCEDURE', payload});
  };

  const setProcedureInView = payload => {
    dispatch({type: 'SET_PROCEDURE_INVIEW', payload});
  };

  const updateProcedures = payload => {
    dispatch({type: 'UPDATE_PROCEDURES', payload});
  };

  const editProcedure = payload => {
    dispatch({type: 'EDIT_PROCEDURE', payload});
  };

  const deleteProcedureInView = payload => {
    dispatch({type: 'DELETE_PROCEDURE_INVIEW', payload});
  };

  const saveProcedure = payload => {
    dispatch({type: 'SAVE_PROCEDURE', payload});
  };

  const cleanProceduresInformation = payload => {
    dispatch({type: 'CLEAN_PROCEDURES', payload});
  };

  const contextValues = {
    addProcedure,
    saveProcedure,
    cleanProceduresInformation,
    setProcedureInView,
    deleteProcedureInView,
    updateProcedures,
    editProcedure,
    ...state,
  };

  return (
    <ProcedureContext.Provider value={contextValues}>
      {children}
    </ProcedureContext.Provider>
  );
};

export default ProcedureProvider;
