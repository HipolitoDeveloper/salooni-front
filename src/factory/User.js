import {convertToObj} from '../pipe/conversor';
import {getEmployeeById} from '../services/EmployeeService';
import {buildEmployeeObject} from './Employee';

export const buildCurrentUser = user => {
  const currentUser = convertToObj(user);
  return {
    id: currentUser.objectId,
    idFunc: currentUser.employee_id.objectId,
    idSalon: currentUser.employee_id.salon_id.objectId,
    employeeType: currentUser.employee_id.employee_type,
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
