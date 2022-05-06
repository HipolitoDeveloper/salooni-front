import React, {createContext, useContext, useEffect, useReducer} from "react";
import { ClientReducer } from "./ClientReducer";
import {
  deleteClientParse,
  deleteClientsParse,
  getAllClientsBySalonId,
  saveClientParse,
  updateClientParse,
} from "../../services/ClientService";
import { handleError } from "../../common/HandleError";
import {useUser} from "../User/UserContext";


export const ClientContext = createContext();

const initialState = {
  clients: [],
};

const ClientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClientReducer, initialState);
  const {currentUser} = useUser()

  useEffect(() => {
    (async () => {
      const {idSalon} = currentUser
      try {
        await loadAllClients(idSalon)
      } catch (e) {
        console.error("loadAllClientsError", e)
      }
    })();
  }, []);

  const loadAllClients = async payload => {
    let clients = [];
    try {
      clients = await getAllClientsBySalonId(payload);
      dispatch({ type: "LOAD_CLIENTS", clients });

    } catch (e) {
      handleError(e, "client");
    }
  };


  const saveClient = async client => {
    let newClient = {};
    try {
      newClient = await saveClientParse(client);
      dispatch({ type: "SAVE_CLIENTS", newClient });
    } catch (e) {
      handleError(e, "client");
    }
  };

  const updateClient = async payload => {
    let updatedClient = {};
    try {
      updatedClient = await updateClientParse(payload);
    } catch (e) {
      handleError(e, "client");
    }
    dispatch({ type: "UPDATE_CLIENT", updatedClient });
  };

  const deleteClient = async payload => {
      const clients = payload;
      try {
        await deleteClientsParse(clients);
      } catch (e) {
        handleError(e, "client");
      }
    dispatch({ type: "DELETE_CLIENT", clients })
  };


  const clearClients = payload => {
    dispatch({ type: "CLEAR_CLIENTS", payload });
  };

  const contextValues = {
    loadAllClients,
    saveClient,
    updateClient,
    deleteClient,
    clearClients,
    ...state,
  };

  return (
    <ClientContext.Provider value={contextValues}>
      {children}
    </ClientContext.Provider>
  );
};

const useClient = () => {
  return useContext(ClientContext)
}

export {useClient, ClientProvider};
