import React, {createContext, useReducer} from 'react';
import {ClientReducer} from './ClientReducer';
import {
  deleteClientCRUD,
  deleteClientsCRUD,
  getAllClientsBySalonId,
  insertClientCRUD,
  updateClientCRUD,
} from '../../services/ClientService';
import {saveEmployee} from '../../services/EmployeeService';

export const ClientContext = createContext();

const initialState = {
  clients: [],
  registeredClients: [],
  isClientsLoading: true,
};

const ClientProvider = ({children}) => {
  const [state, dispatch] = useReducer(ClientReducer, initialState);

  const loadAllClients = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        await getAllClientsBySalonId(payload, false).then(clients => {
          dispatch({type: 'LOAD_CLIENTS', clients});
          resolve(state.clients);

          // console.log((state.clients = clients));
        });
      } catch (e) {
        reject(`Deu ruim ao listar clientes ${e}`);
      }
    });
  };

  const addClient = payload => {
    dispatch({type: 'ADD_CLIENT', payload});
  };

  const updateClientInView = payload => {
    dispatch({type: 'UPDATE_CLIENTS_INVIEW', payload});
  };

  const editClient = payload => {
    dispatch({type: 'EDIT_CLIENT', payload});
  };

  const saveClient = client => {
    return new Promise(async (resolve, reject) => {
      let errorMessage = '';
      try {
        await insertClientCRUD(client, false).then(
          newClient => {
            dispatch({type: 'SAVE_CLIENTS', newClient});
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
        reject(`Deu ruim ao salvar clientes ${e}`);
      }
    });
  };

  const updateClient = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        await updateClientCRUD(payload, false).then(
          updatedClient => {
            resolve(dispatch({type: 'UPDATE_CLIENT', updatedClient}));
          },
          error => {
            reject(error);
          },
        );
      } catch (e) {
        console.log(`Deu ruim ao editar clientes ${e}`);
        reject(e);
      }
    });
  };

  const deleteUniqueClient = payload => {
    return new Promise(async (resolve, reject) => {
      const {id} = payload;
      try {
        deleteClientCRUD(id).then(deletedClient => {
          resolve(dispatch({type: 'DELETE_CLIENT', deletedClient}));
        });
      } catch (e) {
        reject(`Deu ruim ao excluir cliente ${e}`);
      }
    });
  };

  const deleteClientList = payload => {
    return new Promise(async (resolve, reject) => {
      const clients = payload;
      try {
        await deleteClientsCRUD(clients);
        resolve(dispatch({type: 'DELETE_CLIENTS', clients}));
      } catch (e) {
        reject(`Deu ruim ao excluir clientes ${e}`);
      }
    });
  };

  const deleteClientInView = payload => {
    dispatch({type: 'DELETE_CLIENT_INVIEW', payload});
  };

  const cleanRegisteredClients = payload => {
    dispatch({type: 'CLEAN_REGISTERED_CLIENTS', payload});
  };

  const cleanClients = payload => {
    dispatch({type: 'CLEAN_CLIENTS', payload});
  };

  const handleClientRegisterError = payload => {
    dispatch({type: 'HANDLE_ERROR', payload});
  };

  const contextValues = {
    handleClientRegisterError,
    loadAllClients,
    addClient,
    saveClient,
    cleanRegisteredClients,
    cleanClients,
    updateClient,
    deleteUniqueClient,
    deleteClientList,
    deleteClientInView,
    updateClientInView,
    editClient,
    ...state,
  };

  return (
    <ClientContext.Provider value={contextValues}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
