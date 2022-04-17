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
    } catch (e) {
      handleError(e, "client");
    }
    dispatch({ type: "LOAD_CLIENTS", clients });
  };


  const saveClient = async client => {
    let newClient = {};
    try {
      newClient = await saveClientParse(client);
      return newClient;
    } catch (e) {
      handleError(e, "client");
    }
    dispatch({ type: "SAVE_CLIENTS", newClient });
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

  const deleteUniqueClient = async payload => {
    const { id } = payload;
    let deletedClient = {};
      try {
        deletedClient = await deleteClientParse(id);
      } catch (e) {
        handleError(e, "client");
      }
    dispatch({ type: "DELETE_CLIENT", deletedClient })
  };

  const deleteClientList = async payload => {
      const clients = payload;
      try {
        await deleteClientsParse(clients);
      } catch (e) {
        handleError(e, "client");
      }
    dispatch({ type: "DELETE_CLIENTS", clients })
  };


  const clearClients = payload => {
    dispatch({ type: "CLEAR_CLIENTS", payload });
  };

  const contextValues = {
    loadAllClients,
    saveClient,
    updateClient,
    deleteUniqueClient,
    deleteClientList,
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
