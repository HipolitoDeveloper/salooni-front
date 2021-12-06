import React, {createContext, useReducer} from 'react';
import {PartnerReducer} from './PartnerReducer';

import {
  deleteEmployeeCRUD,
  deleteEmployeesCRUD,
  getAllPartnersBySalonId,
  saveEmployee,
  updateEmployeeCRUD,
} from '../../services/EmployeeService';
import {getProcedureByName} from '../../services/ProcedureService';
import {
  deleteProcedureEmployee,
  deleteProcedureEmployeeByEmployeeId,
  saveProcedureEmployee,
} from '../../services/ProcedureEmployeeService';
import {deleteClientsCRUD} from '../../services/ClientService';

export const PartnerContext = createContext();

const initialState = {
  partners: [],
  registeredPartners: [],
  isPartnersLoading: true,
};

const PartnerProvider = ({children}) => {
  const [state, dispatch] = useReducer(PartnerReducer, initialState);

  const loadAllPartners = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        await getAllPartnersBySalonId(payload, false).then(partners => {
          dispatch({type: 'LOAD_PARTNERS', partners});
          resolve(state.partners);
          // console.log((state.clients = clients));
        });
      } catch (e) {
        reject(`Deu ruim ao listar parceiros ${e}`);
      }
    });
  };

  const addPartner = payload => {
    dispatch({type: 'ADD_PARTNER', payload});
  };

  const cleanPartnersInformation = payload => {
    dispatch({type: 'CLEAN_PARTNERS', payload});
  };

  const updatePartnerInView = payload => {
    dispatch({type: 'UPDATE_PARTNERS_INVIEW', payload});
  };

  const editPartner = payload => {
    dispatch({type: 'EDIT_PARTNER', payload});
  };

  const savePartner = partner => {
    return new Promise(async (resolve, reject) => {
      let errorMessage = '';
      try {
        await saveEmployee(partner, false).then(
          newPartner => {
            dispatch({type: 'SAVE_PARTNERS', newPartner});
          },
          error => {
            errorMessage = error;
            console.log('error', error);
          },
        );

        if (typeof errorMessage !== 'string') {
          reject(errorMessage.code);
        } else {
          resolve('Deu bom');
        }
      } catch (e) {
        reject(`Deu ruim ao salvar parceiros ${e}`);
      }
    });
  };

  const updatePartner = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        const partner = payload;

        await updateEmployeeCRUD(partner, false).then(
          updatedPartner => {
            resolve(dispatch({type: 'UPDATE_PARTNER', updatedPartner}));
          },
          error => {
            reject(error);
          },
        );
      } catch (e) {
        reject(`Deu ruim ao editar clientes ${e}`);
      }
    });
  };

  const deleteUniquePartner = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        const {id} = payload;
        dispatch({type: 'DELETE_PARTNER', id});

        resolve(await deleteEmployeeCRUD(id));
      } catch (e) {
        reject(`Deu ruim ao excluir parceiros ${e}`);
      }
    });
  };

  const deletePartnerList = payload => {
    return new Promise(async (resolve, reject) => {
      const partners = payload;
      try {
        await deleteEmployeesCRUD(partners);
        resolve(dispatch({type: 'DELETE_PARTNERS', partners}));
      } catch (e) {
        reject(`Deu ruim ao excluir clientes ${e}`);
      }
    });
  };

  const deletePartnerInView = payload => {
    dispatch({type: 'DELETE_PARTNER_INVIEW', payload});
  };

  const deletePartnerProcedure = payload => {
    return new Promise(async (resolve, reject) => {
      const {procedureEmployeeId} = payload;
      try {
        deleteProcedureEmployee(procedureEmployeeId, false).then(
          deletedProcedureEmployee => {
            resolve(
              dispatch({
                type: 'DELETE_PARTNER_PROCEDURE',
                deletedProcedureEmployee,
              }),
            );
          },
        );
      } catch (e) {
        reject(`Deu ruim ao excluir procedimento ${e}`);
      }
    });
  };

  const handlePartnerRegisterError = payload => {
    dispatch({type: 'HANDLE_ERROR', payload});
  };

  const contextValues = {
    handlePartnerRegisterError,
    loadAllPartners,
    addPartner,
    cleanPartnersInformation,
    deletePartnerProcedure,
    savePartner,
    updatePartner,
    deleteUniquePartner,
    deletePartnerList,
    deletePartnerInView,
    updatePartnerInView,
    editPartner,
    ...state,
  };

  return (
    <PartnerContext.Provider value={contextValues}>
      {children}
    </PartnerContext.Provider>
  );
};

export default PartnerProvider;
