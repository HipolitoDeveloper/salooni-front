import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';
import {getSalonById} from './SalonService';
import {
  deleteProcedureEmployee,
  saveProcedureEmployee,
} from './ProcedureEmployeeService';
import {getProcedureByName} from './ProcedureService';

const EmployeeObject = Parse.Object.extend('Funcionario');

export const getAllPartnersBySalonId = (
  salonId,
  returnParseObject,
  isToBuildPartnerList,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salon = await getSalonById(salonId, true);
      const EmployeeQuery = new Parse.Query(EmployeeObject);
      EmployeeQuery.equalTo('TipoFunc', 'PRC');
      EmployeeQuery.equalTo('IdSalaoFK', salon);
      if (returnParseObject) {
        resolve(await EmployeeQuery.find());
      } else {
        resolve(convertToObj(await EmployeeQuery.find()));
      }
    } catch (e) {
      reject(`Empregador ${JSON.stringify(e)}`);
    }
  });
};

export const getEmployeeByEmail = (employeeEmail, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const EmployeeQuery = new Parse.Query(EmployeeObject);
      EmployeeQuery.equalTo('Email', employeeEmail.trim());
      EmployeeQuery.include('IdSalaoFK');

      if (returnParseObject) {
        resolve(await EmployeeQuery.first());
      } else {
        resolve(convertToObj(await EmployeeQuery.first()));
      }
    } catch (e) {
      reject(`Empregador ${JSON.stringify(e)}`);
    }
  });
};

export const getEmployeeById = (employeeId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const EmployeeQuery = new Parse.Query(EmployeeObject);
      EmployeeQuery.equalTo('objectId', employeeId);

      if (returnParseObject) {
        resolve(await EmployeeQuery.first());
      } else {
        resolve(convertToObj(await EmployeeQuery.first()));
      }
    } catch (e) {
      reject(`Empregador ${JSON.stringify(e)}`);
    }
  });
};

export const saveEmployee = (employeeObj, returnParseObject) => {
  return new Promise((resolve, reject) => {
    try {
      const {cnpj, tel, employee_type, name, salaoFK, email} = employeeObj;

      const newEmployee = new EmployeeObject();
      newEmployee.set('Nome', name.trim());
      newEmployee.set('CNPJ', cnpj);
      newEmployee.set('TipoFunc', employee_type);
      newEmployee.set('Telefone', tel);
      newEmployee.set('IdSalaoFK', salaoFK);
      newEmployee.set('Email', email.trim());

      newEmployee.save().then(
        savedEmployee => {
          if (returnParseObject) {
            resolve(savedEmployee);
          } else {
            resolve(convertToObj(savedEmployee));
          }
        },
        error => {
          reject(`Empregador ${JSON.stringify(error)}`);
        },
      );
    } catch (e) {
      reject(`Empregador ${JSON.stringify(e)}`);
    }
  });
};

export const deleteEmployeeCRUD = (partnerId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const partner = await getEmployeeById(partnerId, true);
      partner.destroy().then(deletedPartner => {
        if (returnParseObject) {
          resolve(deletedPartner);
        } else {
          resolve(convertToObj(deletedPartner));
        }
      });
    } catch (e) {
      reject(`Empregador ${JSON.stringify(e)}`);
    }
  });
};

export const updateEmployeeCRUD = (
  partnerObj,
  proceduresList,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, tel, cnpj, email, procedures, objectId} = partnerObj;
      const employee = await getEmployeeById(objectId, true);

      proceduresList.map(async pl => {
        if (!procedures.some(p => p.item === pl.IdProcFK.Nome)) {
          await deleteProcedureEmployee(pl.objectId);
        }
      });

      procedures.map(async p => {
        if (!proceduresList.some(pl => pl.IdProcFK.Nome === p.item)) {
          const procedureEmployeer = {
            IdProcFK: await getProcedureByName(p.item, true),
            IdFuncFK: employee,
          };
          await saveProcedureEmployee(procedureEmployeer, false);
        }
      });

      employee.set('Nome', name.trim());
      employee.set('CNPJ', cnpj);
      employee.set('Telefone', tel);
      employee.set('Email', email.trim());

      if (returnParseObject) {
        resolve(await employee.save());
      } else {
        resolve(convertToObj(await employee.save()));
      }
    } catch (e) {
      reject(`Empregador ${JSON.stringify(e)}`);
    }
  });
};
