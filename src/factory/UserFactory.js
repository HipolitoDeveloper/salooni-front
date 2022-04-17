import {buildEmployeeObject} from './EmployeeFactory';

export const buildCurrentUser = (currentUser, salon) => {
  return {
    id: currentUser?.objectId,
    idFunc: currentUser?.employee_id.objectId,
    idSalon: salon?.id,
    employeeType: currentUser?.employee_id.employee_type,
    userName: currentUser?.employee_id.name,
    salonName: salon?.name,
    cnpj: salon?.cnpj,
    email: currentUser?.email,
    isFirstAccess: currentUser?.first_access
  };
};

export const buildUser = ({employee_id, username, email, first_access})  => {
    return {
      employee: buildEmployeeObject(employee_id, []),
      username: username,
      email: email,
      firstAccess: first_access
    };};


export const buildProfile = user => {
  return {
    salon: {
      id: user.idSalon,
      name: user.salonName,
      cnpj: user.cnpj,
    },
    user: {
      id: user.id,
      username: user.userName,
      email: user.email,
      password: user.password,
    },
    employee: {
      id: user.idFunc,
      name: user.userName,
      email: user.email,
      cnpj: user.cnpj,
      procedures: [],
    },
  };
};


