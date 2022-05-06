export const ClientReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CLIENTS':
      return {
        ...state,
        clients: action.clients,
      };

    case 'SAVE_CLIENTS':
      return {
        ...state,
        clients: [...state.clients, action.newClient],
      };

    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients:  state.clients.map(client => {
          if (client.id === action.updatedClient.id) {
            client = action.updatedClient;
          }
          return client;
        }),

      };

    case 'DELETE_CLIENT':
      const clients = action.clients;
      clients.forEach(deletedClient => {
        state.clients.forEach((client, index) => {
          if (client.id === deletedClient.id) {
            state.clients.splice(index, 1);
          }
        });
      });

      return {
        ...state,
        clients: state.clients,
      };

    case 'CLEAR_CLIENTS':
      return {
        ...state,
        clients: [],
      };
    default:
      return state;
  }
};
