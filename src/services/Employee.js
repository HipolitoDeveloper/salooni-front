import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';

const EmployeeObject = Parse.Object.extend('Funcionario');
const EmployeeQuery = new Parse.Query(EmployeeObject);

export const getEmployeeById = (employeeId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      EmployeeQuery.equalTo('objectId', employeeId);

      if (returnParseObject) {
        await EmployeeQuery.first();
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
      const {cnpj, tel, employee_type, name, salaoFK} = employeeObj;

      const newEmployee = new EmployeeObject();
      newEmployee.set('Nome', name);
      newEmployee.set('CNPJ', cnpj);
      newEmployee.set('TipoFunc', employee_type);
      newEmployee.set('Telefone', tel);
      newEmployee.set('IdSalaoFK', salaoFK);

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
