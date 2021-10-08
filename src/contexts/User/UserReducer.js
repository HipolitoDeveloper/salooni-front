export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_OWNER':
      const {salon, cnpj, name, tel, email, password} = action.payload;
      const newOwner = {
        cnpj: cnpj,
        tel: tel,
        employeeType: 'OWN',
        name: name,
        email: email,
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
      state.currentUser = action.currentUser;
      return {
        currentUser: state.currentUser,
      };

    case 'CLEAN_USER':
      state.user = {};
      state.salon = {};
      state.owner = {};
      return {
        ...state,
        owner: state.owner,
        user: state.user,
        salon: state.salon,
      };

    default:
      return state;
  }
};
