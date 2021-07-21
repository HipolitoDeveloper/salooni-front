import Parse from 'parse/react-native';
import {convertToObj} from '../config/conversor';

const EmployeeObject = Parse.Object.extend('Funcionario');
const query = new Parse.Query(EmployeeObject);

export const getEmployeeById = employeeId => {
  return new Promise(async (resolve, reject) => {
    try {
      query.equalTo('objectId', employeeId);
      resolve(convertToObj(await query.first()));
    } catch (e) {
      reject('Deu ruim ao pegar o funcionário pelo id', e);
    }
  });
};
