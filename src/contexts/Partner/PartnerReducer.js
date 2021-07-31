export const PartnerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PARTNER':
      const {cnpj, name, tel, email, procedure} = action.payload;
      let newPartners = state.partners;
      const newPartner = {
        cnpj: cnpj,
        tel: tel,
        employee_type: 'PRT',
        name: name,
        email: email,
        procedure: procedure,
      };
      newPartners.push(newPartner);

      return {
        partners: newPartners,
        ...state,
      };

    case 'CLEAN_PARTNERS':
      return {
        partners: [],
        ...state,
      };

    default:
      return state;
  }
};
