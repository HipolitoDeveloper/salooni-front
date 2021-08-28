import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';
import {saveCommission} from './Commission';
import {getSalonById} from './SalonService';
import {getEmployeeById} from './EmployeeService';

const ProcedureObject = Parse.Object.extend('Procedimento');

export const getAllProceduresBySalonId = (salonId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salon = await getSalonById(salonId, true);
      const ProcedureQuery = new Parse.Query(ProcedureObject);
      ProcedureQuery.equalTo('IdSalaoFK', salon);
      if (returnParseObject) {
        resolve(await ProcedureQuery.find());
      } else {
        resolve(convertToObj(await ProcedureQuery.find()));
      }
    } catch (e) {
      reject(`Procedimento ${JSON.stringify(e)}`);
    }
  });
};

export const getProcedureById = (procedureId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ProcedureQuery = new Parse.Query(ProcedureObject);
      ProcedureQuery.equalTo('objectId', procedureId);

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

export const saveProcedure = (procedureObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, time, price, fixedValue, percentage, funcFk, salaoFK} =
        procedureObj;

      const newProcedure = new ProcedureObject();
      newProcedure.set('Nome', name);
      newProcedure.set('Tempo', time);
      newProcedure.set('Valor', parseFloat(price.replace('$', '')));
      newProcedure.set(
        'ComissaoValor',
        parseFloat(fixedValue !== 0 ? fixedValue.replace('$', '') : 0),
      );
      newProcedure.set(
        'ComissaoPorcentagem',
        parseFloat(percentage !== 0 ? percentage.replace('%', '') : 0),
      );
      newProcedure.set('IdFuncFK', funcFk);
      newProcedure.set('IdSalaoFK', salaoFK);

      newProcedure.save().then(
        savedProcedure => {
          if (returnParseObject) {
            resolve(savedProcedure);
          } else {
            resolve(convertToObj(savedProcedure));
          }
        },
        error => {
          reject(`Procedimento salvar${JSON.stringify(error)}`);
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
      const ProcedureQuery = new Parse.Query(ProcedureObject);
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

export const deleteProcedureCRUD = (procedureId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const procedure = await getProcedureById(procedureId, true);
      procedure.destroy().then(deletedProcedure => {
        if (returnParseObject) {
          resolve(deletedProcedure);
        } else {
          resolve(convertToObj(deletedProcedure));
        }
      });
    } catch (e) {
      reject(`Procedimento ${JSON.stringify(e)}`);
    }
  });
};

export const updateProcedureCRUD = (procedureObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, time, price, fixedValue, percentage, objectId} =
        procedureObj;

      const procedure = await getProcedureById(objectId, true);

      procedure.set('Nome', name);
      procedure.set('Tempo', time);
      procedure.set('Valor', parseFloat(price.replace('$', '')));
      procedure.set(
        'ComissaoValor',
        parseFloat(fixedValue !== 0 ? fixedValue.replace('$', '') : 0),
      );
      procedure.set(
        'ComissaoPorcentagem',
        parseFloat(percentage !== 0 ? percentage.replace('%', '') : 0),
      );

      if (returnParseObject) {
        resolve(await procedure.save());
      } else {
        resolve(convertToObj(await procedure.save()));
      }
    } catch (e) {
      reject(`Procedimento ${JSON.stringify(e)}`);
    }
  });
};
