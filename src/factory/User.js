import { convertToObj } from "../pipe/conversor";
import { getEmployeeById } from "../services/EmployeeService";
import { buildEmployeeObject } from "./Employee";

export const buildCurrentUser = (currentUser, salon) => {
  return {
    id: currentUser.id,
    idFunc: currentUser.idFunc,
    idSalon: salon.id,
    employeeType: currentUser.employeeType,
    userName: currentUser.userName,
    salonName: salon.name,
    cnpj: salon.cnpj,
    email: currentUser.email,
  };
};

export const buildUser = user => {
  return {
    id: user?.objectId,
    idFunc: user?.employee_id?.objectId,
    idSalon: user?.employee_id?.salon_id?.objectId,
    employeeType: user?.employee_id?.employee_type,
    userName: user?.employee_id?.name,
    email: user?.email,
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
