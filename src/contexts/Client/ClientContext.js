import React, {createContext, useReducer} from 'react';
import {ClientReducer} from './ClientReducer';
import {
  deleteClient,
  getAllClientsBySalonId,
  insertClient,
  updateClient,
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

  const updateClients = payload => {
    dispatch({type: 'UPDATE_CLIENTS', payload});
  };

  const editClient = payload => {
    dispatch({type: 'EDIT_CLIENT', payload});
  };

  const saveClients = payload => {
    return new Promise((resolve, reject) => {
      try {
        state.registeredClients.forEach(client => {
          insertClient(client, false).then(newClient => {
            dispatch({type: 'SAVE_CLIENTS', newClient});
          });
        });
        resolve('Deu bom');
      } catch (e) {
        reject(`Deu ruim ao salvar clientes ${e}`);
      }
    });
  };

  const updateClientInView = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        updateClient(payload, false).then(updatedClient => {
          dispatch({type: 'UPDATE_CLIENT', updatedClient});
        });

        resolve('Deu bom');
      } catch (e) {
        reject(`Deu ruim ao editar clientes ${e}`);
      }
    });
  };

  const deleteClientInView = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({type: 'DELETE_CLIENT', payload});
        resolve(await deleteClient(payload.objectId));
      } catch (e) {
        reject(`Deu ruim ao excluir clientes ${e}`);
      }
    });
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
    saveClients,
    cleanRegisteredClients,
    cleanClients,
    setClientInView,
    cleanClientInView,
    updateClientInView,
    deleteClientInView,
    updateClients,
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
