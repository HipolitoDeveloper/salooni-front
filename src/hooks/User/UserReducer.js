export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_OWNER':
      const {text, inputName} = action.payload;

      state.owner = {
        ...state.owner,
        [inputName]: text,
      };

      state.owner.errorProperties.forEach((property, index) => {
        if (property === inputName) {
          state.owner.errorProperties.splice(index, 1);
        }
      });

      return {
        ...state,
        owner: state.owner,
      };

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.currentUser,
        isOwner: action.currentUser?.employeeType === 'OWN'
      };

    case 'CLEAN_OWNER':
      state.owner = {
        salonName: '',
        cnpj: '',
        userName: '',
        tel: '',
        email: '',
        password: '',
        errorProperties: [],
      };

      return {
        ...state,
        owner: state.owner,
      };
    case 'CHANGE_STACK':
      return {
        ...state,
        stackStatus: action.stackStatus,
      };
    case 'SET_NOTIFICATION':
      const notification = action.notification;
      state.notifications.push(notification);
      return {
        ...state,
        notifications: state.notifications,
      };
    case 'CLEAN_NOTIFICATION':
      state.notifications = [];
      return {
        ...state,
        notifications: state.notifications,
      };
    case 'HANDLE_NOTIFICATION':
      state.showingNotification = action.payload;
      return {
        ...state,
        showingNotification: state.showingNotification,
      };
    case 'HANDLE_ERROR':
      const {item, property} = action.payload;

      // const treatedOwner = state.owner;
      //
      // treatedOwner.errorProperties.push(property);
      //
      // state.owner = treatedOwner;

      return {
        ...state,
        owner: state.owner = {...state.owner, errorProperties: [...state.owner.errorProperties, property]},
      };

      case 'SET_LOADER':
        return {
          ...state,
          loader: action.payload,
        };
    default:
      return state;
  }
};
