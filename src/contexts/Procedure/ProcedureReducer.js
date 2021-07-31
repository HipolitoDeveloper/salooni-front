export const ProcedureReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PROCEDURE':
      const {name, time, price, comission} = action.payload;
      let newProcedures = state.procedures;
      const newProcedure = {
        name: name,
        time: parseInt(time, 10),
        price: price,
        commission: {
          percentage:
            comission.type === 'percentage' ? parseInt(comission.value, 10) : 0,
          value:
            comission.type === 'fixed_value'
              ? parseInt(comission.value, 10)
              : 0,
        },
      };
      newProcedures.push(newProcedure);

      return {
        procedures: newProcedures,
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
