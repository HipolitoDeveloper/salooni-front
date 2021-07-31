export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_OWNER':
      const {salon, cnpj, name, tel, email, password} = action.payload;
      const newOwner = {
        cnpj: cnpj,
        tel: tel,
        employee_type: 'OWN',
        name: name,
      };
      const newSalon = {name: salon, cnpj: cnpj, employee_qt: 0};
      const newUser = {username: email, password: password, email: email};

      return {
        ...state,
        owner: newOwner,
        user: newUser,
        salon: newSalon,
      };

    case 'SET_CURRENT_USER':
      console.log(action);
      return {
        currentUser: action.user,
      };

    case 'CLEAN_USER':
      return {
        ...state,
        owner: {},
        user: {},
        salon: {},
      };

    default:
      return state;
  }
};
