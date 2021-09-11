import {convertToObj} from '../common/conversor';
import {getEmployeeById} from '../services/EmployeeService';

export const buildCurrentUser = user => {
  return new Promise(async resolve => {
    const currentUser = convertToObj(user);
    const employeeObj = await getEmployeeById(currentUser.IdFuncFK.objectId);

    resolve({
      id: currentUser.objectId,
      idFunc: currentUser.IdFuncFK.objectId,
      idSalon: employeeObj.IdSalaoFK.objectId,
      typeEmployee: currentUser.IdFuncFK.TipoFunc,
    });
  });
};
