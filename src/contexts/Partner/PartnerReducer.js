import {
  ClientParseObjectToClientObject,
  PartnerParseObjectToPartnerObject,
} from '../../common/conversor';

export const PartnerReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PARTNERS':
      state.partners = action.partners;

      state.dropdownPartners = action.partners.map(partner => {
        return {
          id: partner.objectId,
          item: partner.Nome,
        };
      });

      return {
        partners: state.partners,
        dropdownPartners: state.dropdownPartners,
        ...state,
      };
    case 'ADD_PARTNER':
      const {cnpj, name, tel, email, procedures, IdSalaoFK} = action.payload;
      let newPartners = state.registeredPartners;
      const newPartner = {
        cnpj: cnpj,
        tel: tel,
        employee_type: 'PRC',
        name: name,
        email: email,
        procedures: procedures !== undefined > 0 ? procedures : [],
        salaoFK: IdSalaoFK,
      };
      newPartners.push(newPartner);

      state.registeredPartners = newPartners;
      return {
        registeredPartners: state.registeredPartners,
        ...state,
      };

    case 'CLEAN_PARTNERS':
      state.partners = [];
      return {
        partners: state.partners,
        ...state,
      };

    case 'UPDATE_PARTNERS_INVIEW':
      const partnerInViewIndex = action.payload;
      state.registeredPartners.map((partner, index) => {
        if (partner.isInView === true && index !== partnerInViewIndex) {
          partner.isInView = false;
        }

        return partner;
      });
      return {
        registeredPartners: state.registeredPartners,
        ...state,
      };
    case 'EDIT_PARTNER':
      const {partner, index} = action.payload;
      state.registeredPartners = state.registeredPartners.map((p, i) => {
        if (index === i) {
          p = {...partner};
        }

        return p;
      });

      return {
        registeredPartners: state.registeredPartners,
        ...state,
      };
    case 'SAVE_PARTNERS':
      state.partners.push(action.newPartner);
      return {
        partners: state.partners,
        ...state,
      };
    case 'UPDATE_CLIENT':
      return {
        clientInView: {},
        ...state,
      };
    case 'DELETE_PARTNER':
      const {objectId} = action.payload;
      state.partners.forEach((partner, index) => {
        if (partner.objectId === objectId) {
          state.partners.splice(index, 1);
        }
      });

      return {
        partners: state.partners,
        ...state,
      };

    case 'DELETE_PARTNER_INVIEW':
      const partnerToDelete = action.payload;

      const indexToDelete = state.registeredPartners.indexOf(partnerToDelete);
      state.registeredPartners.splice(indexToDelete, 1);

      return {
        registeredPartners: state.registeredPartners,
        ...state,
      };

    case 'CLEAN_REGISTERED_PARTNERS':
      state.registeredPartners = [];
      return {
        registeredPartners: state.registeredPartners,
        ...state,
      };

    default:
      return state;
  }
};
