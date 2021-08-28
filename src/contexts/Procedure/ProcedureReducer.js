import {convertToObj} from '../../common/conversor';

export const ProcedureReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROCEDURES':
      state.procedures = action.procedures;
      state.dropdownProcedures = action.procedures.map(procedure => {
        return {
          id: procedure.objectId,
          item: procedure.Nome,
        };
      });

      return {
        procedures: state.procedures,
        dropdownProcedures: state.dropdownProcedures,
        ...state,
      };
    case 'ADD_PROCEDURE':
      const {name, time, price, fixedValue, percentage, funcFk, salaoFK} =
        action.procedure;
      let newProcedures = state.registeredProcedures;

      const newProcedure = {
        name: name,
        time: time,
        price: price,
        fixedValue: fixedValue,
        percentage: percentage,
        funcFk: funcFk !== undefined && funcFk,
        salaoFK: salaoFK !== undefined && salaoFK,
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
      state.procedures.push(convertToObj(action.newProcedure));
      return {
        procedures: state.procedures,
        ...state,
      };
    case 'UPDATE_PROCEDURE':
      return {
        procedureInView: {},
        ...state,
      };
    case 'DELETE_PROCEDURE':
      const {objectId} = action.payload;
      state.procedures.forEach((procedure, index) => {
        if (procedure.objectId === objectId) {
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
