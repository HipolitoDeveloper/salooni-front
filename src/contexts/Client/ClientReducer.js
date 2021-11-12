export const ClientReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CLIENTS':
      state.clients = action.clients;
      state.isClientsLoading = false;
      return {
        clients: state.clients,
        dropdownClients: state.dropdownClients,
        isClientsLoading: state.isClientsLoading,
        ...state,
      };
    case 'ADD_CLIENT':
      const clientToAdd = action.payload;
      state.registeredClients.push(clientToAdd);

      return {
        registeredClients: state.registeredClients,
        ...state,
      };

    case 'SAVE_CLIENTS':
      state.clients.push(action.newClient);
      return {
        clients: state.clients,
        ...state,
      };

    case 'UPDATE_CLIENT':
      const updatedClient = action.updatedClient;
      let updatedClients = state.clients.map(client => {
        if (client.id === updatedClient.id) {
          client = {...updatedClient};
        }
        return client;
      });

      state.clients = updatedClients;
      return {
        clients: state.clients,

        ...state,
      };
    case 'DELETE_CLIENT':
      const {id} = action.deletedClient;
      state.clients.forEach((client, index) => {
        if (client.id === id) {
          state.clients.splice(index, 1);
        }
      });

      return {
        clients: state.clients,
        ...state,
      };

    case 'DELETE_CLIENTS':
      const clients = action.clients;
      clients.forEach(deletedClient => {
        state.clients.forEach((client, index) => {
          if (client.id === deletedClient.id) {
            state.clients.splice(index, 1);
          }
        });
      });

      return {
        clients: state.clients,
        ...state,
      };

    case 'DELETE_CLIENT_INVIEW':
      const clientToDelete = action.payload;

      const indexToDelete = state.registeredClients.indexOf(clientToDelete);
      state.registeredClients.splice(indexToDelete, 1);

      return {
        registeredClients: state.registeredClients,
        ...state,
      };

    case 'UPDATE_CLIENTS_INVIEW':
      const clientInViewIndex = action.payload;
      state.registeredClients.map((client, index) => {
        if (clientInViewIndex === -1) {
          client.isInView = false;
        } else if (client.isInView === true && index !== clientInViewIndex) {
          client.isInView = false;
        }

        return client;
      });
      return {
        registeredClients: state.registeredClients,
        ...state,
      };
    case 'EDIT_CLIENT':
      const {client, index} = action.payload;
      state.registeredClients = state.registeredClients.map((c, i) => {
        if (index === i) {
          c = {...client};
        }

        return c;
      });

      return {
        registeredClients: state.registeredClients,
        ...state,
      };

    case 'CLEAN_REGISTERED_CLIENTS':
      state.registeredClients = [];
      return {
        registeredClients: state.registeredClients,
        ...state,
      };
    case 'CLEAN_CLIENTS':
      state.clients = [];
      return {
        clients: state.clients,
        ...state,
      };

    default:
      return state;
  }
};
