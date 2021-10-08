import React, {createContext, useReducer} from 'react';
import {PartnerReducer} from './PartnerReducer';

import {
  deleteEmployeeCRUD,
  getAllPartnersBySalonId,
  saveEmployee,
  updateEmployeeCRUD,
} from '../../services/EmployeeService';
import {getProcedureByName} from '../../services/ProcedureService';
import {saveProcedureEmployee} from '../../services/ProcedureEmployeeService';

export const PartnerContext = createContext();

const initialState = {
  partners: [],
  registeredPartners: [],
  dropdownPartners: [],
};

const PartnerProvider = ({children}) => {
  const [state, dispatch] = useReducer(PartnerReducer, initialState);

  const loadAllPartners = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        await getAllPartnersBySalonId(payload, false).then(partners => {
          resolve(dispatch({type: 'LOAD_PARTNERS', partners}));

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

  const savePartner = payload => {
    return new Promise((resolve, reject) => {
      try {
        state.registeredPartners.forEach(async partner => {
          saveEmployee(partner, false).then(newPartner => {
            dispatch({type: 'SAVE_PARTNERS', newPartner});
          });
        });
        resolve('Deu bom');
      } catch (e) {
        reject(`Deu ruim ao salvar parceiros ${e}`);
      }
    });
  };

  const updatePartner = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        const partner = payload;

        updateEmployeeCRUD(partner, false).then(updatedPartner => {
          dispatch({type: 'UPDATE_PARTNER', updatedPartner});
        });

        resolve('Deu bom');
      } catch (e) {
        reject(`Deu ruim ao editar clientes ${e}`);
      }
    });
  };

  const deletePartner = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        const {id} = payload;
        dispatch({type: 'DELETE_PARTNER', payload});

        resolve(await deleteEmployeeCRUD(id));
      } catch (e) {
        reject(`Deu ruim ao excluir parceiros ${e}`);
      }
    });
  };

  const deletePartnerInView = payload => {
    dispatch({type: 'DELETE_PARTNER_INVIEW', payload});
  };

  const cleanRegisteredPartners = payload => {
    dispatch({type: 'CLEAN_REGISTERED_PARTNERS', payload});
  };

  const contextValues = {
    loadAllPartners,
    addPartner,
    cleanPartnersInformation,

    savePartner,
    cleanRegisteredPartners,
    updatePartner,
    deletePartner,
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
