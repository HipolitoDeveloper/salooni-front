export const PartnerReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PARTNERS':
      state.partners = action.partners;

      state.dropdownPartners = action.partners.map(partner => {
        return {
          id: partner.id,
          item: partner.name,
        };
      });

      return {
        partners: state.partners,
        dropdownPartners: state.dropdownPartners,
        ...state,
      };
    case 'ADD_PARTNER':
      const procedureToAdd = action.payload;
      state.registeredPartners.push({...procedureToAdd, employeeType: 'PRC'});

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
    case 'UPDATE_PARTNER':
      const updatedPartner = action.updatedPartner;
      let updatedPartners = state.partners.map(partner => {
        if (partner.id === updatedPartner.id) {
          partner = {...updatedPartner};
        }
        return partner;
      });

      state.partners = updatedPartners;
      return {
        partners: state.partners,

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
