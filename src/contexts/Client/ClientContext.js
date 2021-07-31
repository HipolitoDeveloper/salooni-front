import React, {createContext, useEffect, useReducer, useCallback} from 'react';
import {ClientReducer} from './ClientReducer';
import {getAllClients, insertClient} from '../../services/Client';

export const ClientContext = createContext();

const initialState = {
  clients: [],
  registeredClients: [],
};

const ClientProvider = ({children}) => {
  const [state, dispatch] = useReducer(ClientReducer, initialState);

  const loadAllClients = async () => {
    getAllClients(false).then(clients => {
      dispatch({type: 'LOAD_CLIENTS', clients});
      console.log((state.clients = clients));
    });
  };

  const addClient = payload => {
    dispatch({type: 'ADD_CLIENT', payload});
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

  const cleanRegisteredClients = payload => {
    dispatch({type: 'CLEAN_REGISTERED_CLIENTS', payload});
  };

  const cleanClients = payload => {
    dispatch({type: 'CLEAN_CLIENTS', payload});
  };

  const contextValues = {
    loadAllClients,
    addClient,
    saveClients,
    cleanRegisteredClients,
    cleanClients,
    ...state,
  };

  return (
    <ClientContext.Provider value={contextValues}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
