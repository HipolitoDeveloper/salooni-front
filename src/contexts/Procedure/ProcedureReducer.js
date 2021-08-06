export const ProcedureReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PROCEDURE':
      const {name, time, price, commission} = action.payload;
      let newProcedures = state.procedures;
      const newProcedure = {
        name: name,
        time: time,
        price: price,
        commission: {
          percentage: commission.type === 'percentage' ? commission.value : 0,
          value: commission.type === 'fixed_value' ? commission.value : 0,
        },
      };
      newProcedures.push(newProcedure);

      return {
        procedures: newProcedures,
        ...state,
      };
    case 'UPDATE_PROCEDURES':
      const procedureInViewIndex = action.payload;
      state.procedures.map((procedure, index) => {
        if (procedure.isInView === true && index !== procedureInViewIndex) {
          procedure.isInView = false;
        }

        return procedure;
      });
      return {
        procedures: state.procedures,
        ...state,
      };
    case 'EDIT_PROCEDURE':
      const {procedure, index} = action.payload;
      state.procedures = state.procedures.map((p, i) => {
        if (index === i) {
          p = {...procedure};
        }

        return p;
      });

      return {
        procedures: state.procedures,
        ...state,
      };
    case 'SET_PROCEDURE_INVIEW':
      state.procedureInView = action.payload;
      return {
        procedureInView: [],
        ...state,
      };

    case 'CLEAN_PROCEDURES':
      return {
        procedures: [],
        ...state,
      };

    default:
      return state;
  }
};
