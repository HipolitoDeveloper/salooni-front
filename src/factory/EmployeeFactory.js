import { buildSalonObject } from "./SalonFactory";
import { buildProcedure } from "./ProcedureFactory";

export const buildEmployeeObject = (employee) => {
  return {
    id: employee.objectId,
    salon: buildSalonObject(employee.salon_id),
    cnpj: employee.cnpj,
    tel2: employee.tel2,
    tel: employee.tel,
    name: employee.name,
    email: employee.email,
    employeeType: employee.employee_type,
    firstAccess: employee.first_access,
    procedures: JSON.parse(employee.procedures),
  };
};

export const buildEmployeeList = employees => {
  return employees.map(employee => {
      return {
        id: employee.objectId,
        cnpj: employee.cnpj,
        tel2: employee.tel2,
        tel: employee.tel,
        // salon: buildSalonObject(employee.IdSalaoFK),
        employeeType: employee.employee_type,
        name: employee.name,
        email: employee.email,
        firstAccess: employee.first_access,
        procedures: JSON.parse(employee.procedures)
      };
    });
};

