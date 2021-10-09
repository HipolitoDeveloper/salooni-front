import {buildSalonObject} from './Salon';
import {getProcedureEmployeeByEmployeeId} from '../services/ProcedureEmployeeService';
import {buildProcedure} from './Procedure';

export const buildEmployeeObject = (employee, procedures) => {
  return {
    id: employee.objectId,
    salon: buildSalonObject(employee.salon_id),
    cnpj: employee.cnpj,
    tel2: employee.tel2,
    tel: employee.tel,
    name: employee.name,
    email: employee.email,
    employeeType: employee.employee_type,
    procedures: procedures,
  };
};

export const buildEmployeeList = employees => {
  return new Promise(async resolve => {
    const newEmployees = employees.map(employee => {
      return {
        id: employee.objectId,
        cnpj: employee.cnpj,
        tel2: employee.tel2,
        tel: employee.tel,
        // salon: buildSalonObject(employee.IdSalaoFK),
        employeeType: employee.employee_type,
        name: employee.name,
        email: employee.email,
      };
    });

    for (let i = 0; i < newEmployees.length; i++) {
      let employee = newEmployees[i];
      employee.procedures = await getProcedureEmployeeByEmployeeId(
        employee.id,
        null,
        false,
      );
    }
    resolve(newEmployees);
  });
};

export const buildProcedureEmployee = procedureEmployee => {
  return procedureEmployee.map(pe => {
    return {
      ...buildProcedure(pe.procedure_id),
      procedureEmployeeId: pe.objectId,
    };
  });
};
