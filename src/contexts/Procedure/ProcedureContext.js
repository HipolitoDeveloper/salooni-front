import React, {createContext, useReducer} from 'react';
import {ProcedureReducer} from './ProcedureReducer';
import {
  deleteProcedureCRUD,
  deleteProceduresCRUD,
  getAllProceduresBySalonId,
  saveProcedure,
  updateProcedureCRUD,
} from '../../services/ProcedureService';
import {deleteProcedureEmployeeByEmployeeId} from '../../services/ProcedureEmployeeService';
import {
  deleteClientCRUD,
  deleteClientsCRUD,
} from '../../services/ClientService';

export const ProcedureContext = createContext();

const initialState = {
  procedures: [],
  registeredProcedures: [],
  isProceduresLoading: true,
};

const ProcedureProvider = ({children}) => {
  const [state, dispatch] = useReducer(ProcedureReducer, initialState);

  const loadAllProcedures = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        await getAllProceduresBySalonId(payload, false).then(procedures => {
          resolve(dispatch({type: 'LOAD_PROCEDURES', procedures}));
        });
      } catch (e) {
        reject(`Deu ruim ao listar procedimentos ${e}`);
      }
    });
  };

  const addProcedure = async payload => {
    const procedure = payload;

    dispatch({type: 'ADD_PROCEDURE', procedure});
  };

  const cleanProceduresInformation = payload => {
    dispatch({type: 'CLEAN_PROCEDURES', payload});
  };
  const updateProcedureInView = payload => {
    dispatch({type: 'UPDATE_PROCEDURE_INVIEW', payload});
  };

  const editProcedure = payload => {
    dispatch({type: 'EDIT_PROCEDURE', payload});
  };

  const saveProcedures = payload => {
    return new Promise((resolve, reject) => {
      try {
        state.registeredProcedures.forEach(async procedure => {
          saveProcedure(procedure, false).then(newProcedure => {
            dispatch({type: 'SAVE_PROCEDURES', newProcedure});
          });
        });
        resolve('Deu bom');
      } catch (e) {
        reject(`Deu ruim ao salvar procedimentos ${e}`);
      }
    });
  };

  const updateProcedure = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        updateProcedureCRUD(payload, false).then(updatedProcedure => {
          resolve(dispatch({type: 'UPDATE_PROCEDURE', updatedProcedure}));
        });
      } catch (e) {
        reject(`Deu ruim ao atualizar procedimentos ${e}`);
      }
    });
  };

  // const deleteProcedure = payload => {
  //   return new Promise(async (resolve, reject) => {
  //     const {id} = payload;
  //     try {
  //       deleteProcedureCRUD(id, false).then(deletedProcedures => {
  //         resolve(dispatch({type: 'DELETE_PROCEDURE', deletedProcedures}));
  //       });
  //     } catch (e) {
  //       reject(`Deu ruim ao excluir procedimento ${e}`);
  //     }
  //   });
  // };

  const deleteUniqueProcedure = payload => {
    return new Promise(async (resolve, reject) => {
      const {id} = payload;
      try {
        deleteProcedureCRUD(id).then(deletedProcedures => {
          resolve(dispatch({type: 'DELETE_PROCEDURE', deletedProcedures}));
        });
      } catch (e) {
        reject(`Deu ruim ao excluir procedimento ${e}`);
      }
    });
  };

  const deleteProcedureList = payload => {
    return new Promise(async (resolve, reject) => {
      const procedures = payload;
      try {
        await deleteProceduresCRUD(procedures);
        resolve(dispatch({type: 'DELETE_PROCEDURES', procedures}));
      } catch (e) {
        reject(`Deu ruim ao excluir procedimentos ${e}`);
      }
    });
  };

  const deleteProcedureInView = payload => {
    dispatch({type: 'DELETE_PROCEDURE_INVIEW', payload});
  };

  const contextValues = {
    loadAllProcedures,
    addProcedure,
    cleanProceduresInformation,
    saveProcedures,
    updateProcedure,
    deleteProcedureList,
    deleteUniqueProcedure,
    deleteProcedureInView,
    updateProcedureInView,
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
