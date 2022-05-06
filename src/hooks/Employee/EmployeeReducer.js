export const EmployeeReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_EMPLOYEES':
      return {
        ...state,
        employees: action.employees,
      };

    case 'SAVE_EMPLOYEES':
       return {
        ...state,
        employees: [...state.employees, action.newEmployee],
      };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(employee => {
          const updatedEmployee = action.updatedEmployee
          if (employee.id === updatedEmployee.id) {
            employee = {...updatedEmployee};
          }
          return employee;
        })
      };

    case 'DELETE_EMPLOYEE':
      const employees = action.employees;
      employees.forEach(deletedEmployee => {
        state.employees.forEach((employee, index) => {
          if (employee.id === deletedEmployee.id) {
            state.employees.splice(index, 1);
          }
        });
      });

      return {
        ...state,
        employees: state.employees,
      };

      case 'CLEAR_EMPLOYEES':
      return {
        ...state,
        employees: [],
      };
    default:
      return state;
  }
};
