import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';
import {getEmployeeById} from './EmployeeService';
import {getProcedureById} from './ProcedureService';

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

export const getProcedureEmployeeByProcedureId = (
  procedureId,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const procedure = await getProcedureById(procedureId, true);

      const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);
      ProcedureEmployeeQuery.equalTo('IdProcFK', procedure);
      ProcedureEmployeeQuery.include('IdFuncFK');

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

export const getProcedureEmployeeById = (
  procedureEmployeeId,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);
      ProcedureEmployeeQuery.equalTo('objectId', procedureEmployeeId);

      if (returnParseObject) {
        resolve(await ProcedureEmployeeQuery.first());
      } else {
        resolve(convertToObj(await ProcedureEmployeeQuery.first()));
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

export const deleteProcedureEmployeeById = (
  procedureEmployeeId,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const procedureEmployee = await getProcedureEmployeeById(
        procedureEmployeeId,
        true,
      );
      procedureEmployee.destroy().then(deletedProcedureEmployee => {
        if (returnParseObject) {
          resolve(deletedProcedureEmployee);
        } else {
          resolve(convertToObj(deletedProcedureEmployee));
        }
      });
    } catch (e) {
      reject(`Procedimento ${JSON.stringify(e)}`);
    }
  });
};

export const deleteProcedureEmployeeByFuncId = async employeeId => {
  try {
    const proceduresEmployee = await getProcedureEmployeeByFuncFK(
      employeeId,
      true,
    );

    proceduresEmployee.map(async pe => {
      await pe.destroy();
    });
  } catch (e) {
    console.error(`Procedimento ${JSON.stringify(e)}`);
  }
};

export const deleteProcedureEmployeeByProcedureId = async procedureId => {
  try {
    const proceduresEmployee = await getProcedureEmployeeByProcedureId(
      procedureId,
      true,
    );
    proceduresEmployee.map(async pe => {
      await pe.destroy();
    });
  } catch (e) {
    console.error(`Procedimento ${JSON.stringify(e)}`);
  }
};
