import React, {createContext, useReducer} from 'react';
import {SignupReducer} from './SignupReducer';

export const SignupContext = createContext();

const initialState = {
  user: {},
  salon: {},
  owner: {},
  partners: [{cnpj: '', tel: '', type: 'PRC', name: ''}],
};

const SignupProvider = ({children}) => {
  const [state, dispatch] = useReducer(SignupReducer, initialState);

  const saveOwnerInformation = payload => {
    dispatch({type: 'SAVE_OWNER', payload});
  };

  const contextValues = {
    saveOwnerInformation,
    ...state,
  };

  return (
    <SignupContext.Provider value={contextValues}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupProvider;
