export const SignupReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_OWNER':
      const {salon, cnpj, name, tel, email, password} = action.payload;
      const newOwner = {
        cnpj: cnpj,
        tel: tel,
        type: 'OWN',
        name: name,
      };
      const newSalon = {name: salon, cnpj: cnpj};
      const newUser = {username: email, password: password};

      return {
        owner: newOwner,
        user: newUser,
        salon: newSalon,
        ...state,
      };

    default:
      return state;
  }
};
