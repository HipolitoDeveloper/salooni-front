import {buildSalonObject} from './Salon';

export const buildEmployeeObject = employee => {
  return {
    id: employee.objectId,
    cnpj: employee.CNPJ,
    tel2: employee.Telefone2,
    tel: employee.Telefone,
    // salon: buildSalonObject(employee.IdSalaoFK),
    typeEmployee: employee.TipoFunc,
    name: employee.Nome,
    email: employee.Email,
  };
};
