import Parse from 'parse/react-native';
import {convertToObj} from '../pipe/conversor';

export const SalonObject = Parse.Object.extend('salon');

export const saveSalon = (salonObj, returnParseObject) => {
  return new Promise((resolve, reject) => {
    try {
      const {name, cnpj, employeeQt} = salonObj;

      const newSalon = new SalonObject();
      newSalon.set('name', name);
      newSalon.set('cnpj', cnpj);
      newSalon.set('employee_qt', employeeQt);

      newSalon.save().then(
        savedSalon => {
          if (returnParseObject) {
            resolve(savedSalon);
          } else {
            resolve(convertToObj(savedSalon));
          }
        },
        error => {
          console.error(`Salão   ${error}`);
          reject(`Salão ${JSON.stringify(error)}`);
        },
      );
    } catch (e) {
      console.error(`Salão   ${e}`);
      reject(`Salão ${JSON.stringify(e)}`);
    }
  });
};
