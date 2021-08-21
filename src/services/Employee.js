import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';
import {getSalonById} from './Salon';
import {getClientById} from './Client';

const EmployeeObject = Parse.Object.extend('Funcionario');

export const getAllPartnersBySalonId = (salonId, returnParseObject) => {
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
      newEmployee.set('Nome', name);
      newEmployee.set('CNPJ', cnpj);
      newEmployee.set('TipoFunc', employee_type);
      newEmployee.set('Telefone', tel);
      newEmployee.set('IdSalaoFK', salaoFK);
      newEmployee.set('Email', email);

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

export const updateEmployeeCRUD = (partnerObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, tel, cnpj, email, objectId} = partnerObj;

      const employee = await getEmployeeById(objectId, true);

      employee.set('Nome', name);
      employee.set('CNPJ', cnpj);
      employee.set('Telefone', tel);
      employee.set('Email', email);

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
