import Parse from 'parse/react-native';
import {convertToObj} from '../pipe/conversor';
import {EmployeeObject} from './EmployeeService';
import {ProcedureObject} from './ProcedureService';
import {
  buildProcedureEmployee,
  buildProcedureEmployeeList,
} from '../factory/Employee';

const ProcedureEmployeeObject = Parse.Object.extend('employee_procedure');

export const getProcedureEmployeeByEmployeeId = (
  employeeId,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const employee = new EmployeeObject({objectId: employeeId});

      const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);
      ProcedureEmployeeQuery.equalTo('employee_id', employee);
      ProcedureEmployeeQuery.include('procedure_id');
      ProcedureEmployeeQuery.include('employee_id');

      if (returnParseObject) {
        resolve(await ProcedureEmployeeQuery.find());
      } else {
        const employeeProcedures = await ProcedureEmployeeQuery.find();

        if (employeeProcedures.length === 0) {
          resolve([]);
        } else {
          resolve(buildProcedureEmployeeList(convertToObj(employeeProcedures)));
        }
      }
    } catch (e) {
      console.error(`Procedimento do empregado ${e}`);
      reject(`Procedimento do empregador ${JSON.stringify(e)}`);
    }
  });
};

export const getProcedureEmployeeByProcedureId = (
  procedureId,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const procedure = new ProcedureObject({objectId: procedureId});

      const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);
      ProcedureEmployeeQuery.equalTo('procedure_id', procedure);
      ProcedureEmployeeQuery.include('employee_id');

      if (returnParseObject) {
        resolve(await ProcedureEmployeeQuery.find());
      } else {
        resolve(convertToObj(await ProcedureEmployeeQuery.find()));
      }
    } catch (e) {
      console.error(`Procedimento do empregado ${e}`);
      reject(`Procedimento do empregador ${JSON.stringify(e)}`);
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
      console.error(`Procedimento do empregado ${e}`);
      reject(`Procedimento do empregador ${JSON.stringify(e)}`);
    }
  });
};

export const saveProcedureEmployee = (
  procedureEmployeeObj,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {procedureId, employeeId} = procedureEmployeeObj;

      const newProcedureEmployee = new ProcedureEmployeeObject();
      newProcedureEmployee.set(
        'employee_id',
        new EmployeeObject({objectId: employeeId}),
      );
      newProcedureEmployee.set(
        'procedure_id',
        new ProcedureObject({objectId: procedureId}),
      );

      newProcedureEmployee.save().then(
        savedProcedureEmployee => {
          if (returnParseObject) {
            resolve(savedProcedureEmployee);
          } else {
            resolve(convertToObj(savedProcedureEmployee));
          }
        },
        error => {
          console.error(`Procedimento do empregado ${error}`);
          reject(`Procedimento do empregador ${JSON.stringify(error)}`);
        },
      );
    } catch (e) {
      console.error(`Procedimento do empregado ${e}`);
      reject(`Procedimento do empregador ${JSON.stringify(e)}`);
    }
  });
};

export const deleteProcedureEmployee = (
  procedureEmployeeId,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const procedureEmployee = new ProcedureEmployeeObject({
        objectId: procedureEmployeeId,
      });

      procedureEmployee.destroy().then(deletedProcedureEmployee => {
        if (returnParseObject) {
          resolve(deletedProcedureEmployee);
        } else {
          resolve(
            buildProcedureEmployee(convertToObj(deletedProcedureEmployee)),
          );
        }
      });
    } catch (e) {
      console.error(`Procedimento do empregado ${e}`);
      reject(`Procedimento do empregador ${JSON.stringify(e)}`);
    }
  });
};

export const deleteProcedureEmployeeByEmployeeId = async employeeId => {
  try {
    const proceduresEmployee = await getProcedureEmployeeByEmployeeId(
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
    console.error(`Procedimento do empregador ${JSON.stringify(e)}`);
  }
};
