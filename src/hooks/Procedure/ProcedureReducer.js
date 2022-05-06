export const ProcedureReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROCEDURES':
      return {
        ...state,
        procedures: action.procedures,
      };
    case 'SAVE_PROCEDURES':
      return {
        ...state,
        procedures: [...state.procedures, [...action.newProcedures]],
      };
    case 'UPDATE_PROCEDURE':
      return {
        ...state,
        procedures: state.procedures.map(procedure => {
          if (procedure.id === action.updatedProcedure.id) {
            procedure = { ...action.updatedProcedure };
          }
          return procedure;
        })
      };

    case 'DELETE_PROCEDURE':
      const procedures = action.deletedProcedures;
      procedures.forEach(deletedProcedure => {
        state.procedures.forEach((procedure, index) => {
          if (procedure.id === deletedProcedure.id) {
            state.procedures.splice(index, 1);
          }
        });
      });

      return {
        ...state,
        procedures: state.procedures,
      };

    case 'CLEAR_PROCEDURES':
      return {
        ...state,
        procedures: [],
      };

    default:
      return state;
  }
};
