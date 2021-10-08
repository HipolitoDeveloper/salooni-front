export const ProcedureReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROCEDURES':
      state.procedures = action.procedures;

      return {
        procedures: state.procedures,
        dropdownProcedures: state.dropdownProcedures,
        ...state,
      };
    case 'ADD_PROCEDURE':
      const {
        name,
        time,
        value,
        commissionValue,
        commissionPercentage,
        maintenanceValue,
        maintenanceDays,
        employeeId,
        salonId,
      } = action.procedure;
      let newProcedures = state.registeredProcedures;

      const newProcedure = {
        id: name,
        name: name,
        time: time,
        value: value,
        maintenanceValue: maintenanceValue,
        maintenanceDays: maintenanceDays,
        commissionValue: commissionValue,
        commissionPercentage: commissionPercentage,
        employeeId: employeeId,
        salonId: salonId,
      };
      newProcedures.push(newProcedure);

      return {
        registeredProcedures: newProcedures,
        ...state,
      };
    case 'UPDATE_PROCEDURE_INVIEW':
      const procedureInViewIndex = action.payload;
      state.registeredProcedures = state.registeredProcedures.map(
        (procedure, index) => {
          if (procedure.isInView === true && index !== procedureInViewIndex) {
            procedure.isInView = false;
          }

          return procedure;
        },
      );
      return {
        registeredProcedures: state.registeredProcedures,
        ...state,
      };
    case 'EDIT_PROCEDURE':
      const {procedure, index} = action.payload;
      state.registeredProcedures = state.registeredProcedures.map((p, i) => {
        if (index === i) {
          p = {...procedure};
        }

        return p;
      });

      return {
        registeredProcedures: state.registeredProcedures,
        ...state,
      };
    case 'SAVE_PROCEDURES':
      state.procedures.push(action.newProcedure);
      return {
        procedures: state.procedures,
        ...state,
      };
    case 'UPDATE_PROCEDURE':
      const updatedProcedure = action.updatedProcedure;
      let updatedProcedures = state.procedures.map(procedure => {
        if (procedure.id === updatedProcedure.id) {
          procedure = {...updatedProcedure};
        }
        return procedure;
      });

      state.procedures = updatedProcedures;
      return {
        procedures: state.procedures,
        ...state,
      };
    case 'DELETE_PROCEDURE':
      const {id} = action.deletedProcedures;
      state.procedures.forEach((procedure, index) => {
        if (procedure.id === id) {
          state.procedures.splice(index, 1);
        }
      });

      return {
        procedures: state.procedures,
        ...state,
      };

    case 'DELETE_PROCEDURE_INVIEW':
      const procedureToDelete = action.payload;

      const indexToDelete =
        state.registeredProcedures.indexOf(procedureToDelete);
      state.registeredProcedures.splice(indexToDelete, 1);

      return {
        registeredProcedures: state.registeredProcedures,
        ...state,
      };

    case 'CLEAN_REGISTERED_PROCEDURES':
      state.registeredProcedures = [];
      return {
        registeredProcedures: state.registeredProcedures,
        ...state,
      };

    case 'CLEAN_PROCEDURES':
      state.procedures = [];

      return {
        procedures: state.procedures,
        ...state,
      };

    default:
      return state;
  }
};
