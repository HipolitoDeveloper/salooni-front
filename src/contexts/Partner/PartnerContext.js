import React, {createContext, useReducer} from 'react';
import {PartnerReducer} from './PartnerReducer';

export const PartnerContext = createContext();

const initialState = {
  partners: [],
};

const PartnerProvider = ({children}) => {
  const [state, dispatch] = useReducer(PartnerReducer, initialState);

  const addPartner = payload => {
    dispatch({type: 'ADD_PARTNER', payload});
  };

  const cleanPartnersInformation = payload => {
    dispatch({type: 'CLEAN_PARTNERS', payload});
  };

  const contextValues = {
    addPartner,
    cleanPartnersInformation,
    ...state,
  };

  return (
    <PartnerContext.Provider value={contextValues}>
      {children}
    </PartnerContext.Provider>
  );
};

export default PartnerProvider;
