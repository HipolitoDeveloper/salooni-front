import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';
import {saveCommission} from './Commission';

const ProcedureEmployeeObject = Parse.Object.extend('ProcedimentoXFuncionario');
const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);

export const saveProcedureEmployee = (
  ProcedureEmployeeObj,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {IdProcFK, IdFuncFK} = ProcedureEmployeeObj;

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
