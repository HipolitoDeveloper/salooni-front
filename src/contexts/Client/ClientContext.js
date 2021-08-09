import React, {createContext, useReducer} from 'react';
import {ClientReducer} from './ClientReducer';
import {
  deleteClient,
  deleteClientCRUD,
  getAllClientsBySalonId,
  insertClientCRUD,
  updateClient,
  updateClientCRUD,
} from '../../services/Client';

export const ClientContext = createContext();

const initialState = {
  clients: [],
  registeredClients: [],
  clientInView: {},
};

const ClientProvider = ({children}) => {
  const [state, dispatch] = useReducer(ClientReducer, initialState);

  const loadAllClients = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        await getAllClientsBySalonId(payload, false).then(clients => {
          dispatch({type: 'LOAD_CLIENTS', clients});

          resolve('Deu certo');
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

  const saveClient = payload => {
    return new Promise((resolve, reject) => {
      try {
        state.registeredClients.forEach(client => {
          insertClientCRUD(client, false).then(newClient => {
            dispatch({type: 'SAVE_CLIENTS', newClient});
          });
        });
        resolve('Deu bom');
      } catch (e) {
        reject(`Deu ruim ao salvar clientes ${e}`);
      }
    });
  };

  const updateClient = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        updateClientCRUD(payload, false).then(updatedClient => {
          dispatch({type: 'UPDATE_CLIENT', updatedClient});
        });

        resolve('Deu bom');
      } catch (e) {
        reject(`Deu ruim ao editar clientes ${e}`);
      }
    });
  };

  const deleteClient = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({type: 'DELETE_CLIENT', payload});
        resolve(await deleteClientCRUD(payload.objectId));
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

  const cleanClientInView = payload => {
    dispatch({type: 'CLEAN_CLIENT_INVIEW', payload});
  };

  const setClientInView = payload => {
    dispatch({type: 'SET_CLIENT_INVIEW', payload});
  };

  const contextValues = {
    loadAllClients,
    addClient,
    saveClient,
    cleanRegisteredClients,
    cleanClients,
    setClientInView,
    cleanClientInView,
    updateClient,
    deleteClient,
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
