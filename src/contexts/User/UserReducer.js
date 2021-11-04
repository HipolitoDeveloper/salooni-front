export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_OWNER':
      const {text, inputName} = action.payload;

      state.owner = {
        ...state.owner,
        [inputName]: text,
      };

      return {
        ...state,
        owner: state.owner,
      };

    case 'SET_CURRENT_USER':
      state.currentUser = action.currentUser;
      state.isOwner = state.currentUser.employeeType === 'OWN';
      return {
        ...state,
        currentUser: state.currentUser,
        isPartner: state.isPartner,
      };
    case 'UPDATE_USER':
      state.currentUser = action.payload;
      return {
        ...state,
        currentUser: state.currentUser,
      };

    case 'CLEAN_OWNER':
      state.owner = {
        salonName: '',
        cnpj: '',
        userName: '',
        tel: '',
        email: '',
        password: '',
      };

      return {
        ...state,
        owner: state.owner,
      };
    case 'SET_LOGIN_STATUS':
      state.loginStatus = action.loginStatus;

      return {
        ...state,
        loginStatus: state.loginStatus,
      };

    default:
      return state;
  }
};
