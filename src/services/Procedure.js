import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';
import {saveCommission} from './Commission';

const ProcedureObject = Parse.Object.extend('Procedimento');
const ProcedureQuery = new Parse.Query(ProcedureObject);

export const saveProcedure = (procedureObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, time, price, commission, IdFuncFK} = procedureObj;

      const savedCommission = await saveCommission(commission, true);

      const newProcedure = new ProcedureObject();
      newProcedure.set('Nome', name);
      newProcedure.set('Tempo', parseInt(time));
      newProcedure.set('Valor', price);
      newProcedure.set('IdFuncFK', IdFuncFK);
      newProcedure.set('IdComissaoFK', savedCommission);

      newProcedure.save().then(
        savedProcedure => {
          if (returnParseObject) {
            resolve(savedProcedure);
          } else {
            resolve(convertToObj(savedProcedure));
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

export const getProcedureByName = (procedureName, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      ProcedureQuery.equalTo('Nome', procedureName);

      if (returnParseObject) {
        resolve(await ProcedureQuery.first());
      } else {
        resolve(convertToObj(await ProcedureQuery.first()));
      }
    } catch (e) {
      reject(`Procedimento ${JSON.stringify(e)}`);
    }
  });
};
