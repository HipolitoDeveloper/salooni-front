import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';
import {getEmployeeById} from './EmployeeService';

const ProcedureEmployeeObject = Parse.Object.extend('ProcedimentoXFuncionario');

export const getProcedureEmployeeByFuncFK = (funcfk, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const employee = await getEmployeeById(funcfk, true);

      const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);
      ProcedureEmployeeQuery.equalTo('IdFuncFK', employee);
      ProcedureEmployeeQuery.include('IdProcFK');
      if (returnParseObject) {
        resolve(await ProcedureEmployeeQuery.find());
      } else {
        resolve(convertToObj(await ProcedureEmployeeQuery.find()));
      }
    } catch (e) {
      reject(`Procedimento ${JSON.stringify(e)}`);
    }
  });
};

export const saveProcedureEmployee = (
  procedureEmployeeObj,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {IdProcFK, IdFuncFK} = procedureEmployeeObj;

      const newProcedureEmployee = new ProcedureEmployeeObject();
      newProcedureEmployee.set('IdFuncFK', IdFuncFK);
      newProcedureEmployee.set('IdProcFK', IdProcFK);

      newProcedureEmployee.save().then(
        savedProcedureEmployee => {
          if (returnParseObject) {
            resolve(savedProcedureEmployee);
          } else {
            resolve(convertToObj(savedProcedureEmployee));
          }
        },
        error => {
          reject(`Procedimento ${JSON.stringify(error)}`);
        },
      );
    } catch (e) {
      reject(`Procedimento ${JSON.stringify(e)}`);
    }
  });
};

export const deleteProcedureEmployee = (
  procedureEmployeeObj,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {IdProcFK, IdFuncFK} = procedureEmployeeObj;

      const newProcedureEmployee = new ProcedureEmployeeObject();
      newProcedureEmployee.set('IdFuncFK', IdFuncFK);
      newProcedureEmployee.set('IdProcFK', IdProcFK);

      newProcedureEmployee.save().then(
        savedProcedureEmployee => {
          if (returnParseObject) {
            resolve(savedProcedureEmployee);
          } else {
            resolve(convertToObj(savedProcedureEmployee));
          }
        },
        error => {
          reject(`Procedimento ${JSON.stringify(error)}`);
        },
      );
    } catch (e) {
      reject(`Procedimento ${JSON.stringify(e)}`);
    }
  });
};
