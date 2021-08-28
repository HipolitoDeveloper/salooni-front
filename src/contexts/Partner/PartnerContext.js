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
};

const PartnerProvider = ({children}) => {
  const [state, dispatch] = useReducer(PartnerReducer, initialState);

  const loadAllPartners = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        await getAllPartnersBySalonId(payload, false).then(partners => {
          dispatch({type: 'LOAD_PARTNERS', partners});

          resolve('Deu certo');
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
          saveEmployee(partner, true).then(newPartner => {
            partner.procedures.map(async procedure => {
              const procedureEmployeer = {
                IdProcFK: await getProcedureByName(procedure.item, true),
                IdFuncFK: newPartner,
              };

              await saveProcedureEmployee(procedureEmployeer, true);
            });
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
        const {partner, partnerProcedures, deletedProcedures} = payload;

        updateEmployeeCRUD(
          partner,
          partnerProcedures,
          deletedProcedures,
          false,
        ).then(updatedClient => {
          dispatch({type: 'UPDATE_CLIENT', updatedClient});
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
        dispatch({type: 'DELETE_PARTNER', payload});
        resolve(await deleteEmployeeCRUD(payload.objectId));
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
