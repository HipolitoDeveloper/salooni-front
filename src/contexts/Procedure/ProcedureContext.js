import React, {createContext, useReducer} from 'react';
import {ProcedureReducer} from './ProcedureReducer';

export const ProcedureContext = createContext();

const initialState = {
  procedures: [],
};

const ProcedureProvider = ({children}) => {
  const [state, dispatch] = useReducer(ProcedureReducer, initialState);

  const addProcedure = payload => {
    dispatch({type: 'ADD_PROCEDURE', payload});
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
    ...state,
  };

  return (
    <ProcedureContext.Provider value={contextValues}>
      {children}
    </ProcedureContext.Provider>
  );
};

export default ProcedureProvider;
