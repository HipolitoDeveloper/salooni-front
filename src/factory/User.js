import {convertToObj} from '../pipe/conversor';
import {getEmployeeById} from '../services/EmployeeService';
import {buildEmployeeObject} from './Employee';

export const buildCurrentUser = (currentUser, salon) => {
  return {
    id: currentUser.objectId,
    idFunc: currentUser.employee_id.objectId,
    idSalon: salon.id,
    employeeType: currentUser.employee_id.employee_type,
    userName: currentUser.employee_id.name,
    salonName: salon.name,
    cnpj: salon.cnpj,
    email: currentUser.email,
  };
};

export const buildUserList = users => {
  return users.map(user => {
    return {
      employee: buildEmployeeObject(user.employee_id, []),
      username: user.username,
      email: user.email,
    };
  });
};
