import {getAllClients} from '../../services/Client';

export const ClientReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CLIENTS':
      const clients = action.clients;

      return {
        clients: clients,
        ...state,
      };
    case 'ADD_CLIENT':
      const {name, email, cpf, tel, born_date} = action.payload;
      let newClients = state.registeredClients;
      const newClient = {
        name: name,
        email: email,
        cpf: cpf,
        tel: tel,
        born_date: born_date,
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
