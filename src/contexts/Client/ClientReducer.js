import {ClientParseObjectToClientObject} from '../../common/conversor';

export const ClientReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CLIENTS':
      state.clients = action.clients;

      return {
        clients: state.clients,
        ...state,
      };
    case 'ADD_CLIENT':
      const {name, email, cpf, tel, tel2, born_date, IdSalaoFK} =
        action.payload;
      let newClients = state.registeredClients;
      const newClient = {
        name: name,
        email: email,
        cpf: cpf,
        tel: tel,
        tel2: tel2,
        born_date: born_date,
        IdSalaoFK: IdSalaoFK,
      };
      newClients.push(newClient);

      return {
        registeredClients: newClients,
        ...state,
      };

    case 'SAVE_CLIENTS':
      state.clients.push(action.newClient);
      return {
        clients: state.clients,
        ...state,
      };

    case 'UPDATE_CLIENT':
      return {
        clientInView: {},
        ...state,
      };
    case 'DELETE_CLIENT':
      const {objectId} = action.payload;
      state.clients.forEach((client, index) => {
        if (client.objectId === objectId) {
          state.clients.splice(index, 1);
        }
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
        if (client.isInView === true && index !== clientInViewIndex) {
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
      return {
        clients: [],
        ...state,
      };

    default:
      return state;
  }
};
