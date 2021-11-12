export const PartnerReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PARTNERS':
      state.partners = action.partners;

      state.isPartnersLoading = false;
      return {
        partners: state.partners,
        isPartnersLoading: state.isPartnersLoading,
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
      state.registeredPartners = [];
      return {
        registeredPartners: state.registeredPartners,
        ...state,
      };

    case 'UPDATE_PARTNERS_INVIEW':
      const partnerInViewIndex = action.payload;
      state.registeredPartners.map((partner, index) => {
        if (partnerInViewIndex === -1) {
          partner.isInView = false;
        } else if (partner.isInView === true && index !== partnerInViewIndex) {
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
      const deletedPartnerId = action.id;
      state.partners.forEach((partner, index) => {
        if (partner.id === deletedPartnerId) {
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
    case 'DELETE_PARTNER_PROCEDURE':
      const {employeeId, id} = action.deletedProcedureEmployee;
      state.partners.forEach(partner => {
        if (partner.id === employeeId) {
          partner.procedures.forEach((procedure, index) => {
            if (procedure.id === id) {
              partner.procedures.splice(index, 1);
            }
          });
        }
      });

      return {
        partners: state.partners,
        ...state,
      };

    default:
      return state;
  }
};
