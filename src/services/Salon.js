import Parse from 'parse/react-native';
import {convertToObj} from '../config/conversor';

const SalonObject = Parse.Object.extend('Salao');
const query = new Parse.Query(SalonObject);

export const saveSalon = (salonObj, returnParseObject) => {
  return new Promise((resolve, reject) => {
    try {
      const {name, cnpj, employee_qt} = salonObj;

      const newSalon = new SalonObject();
      newSalon.set('Nome', name);
      newSalon.set('CNPJ', cnpj);
      newSalon.set('QuantidadeFunc', employee_qt);

      newSalon.save().then(
        savedSalon => {
          if (returnParseObject) {
            resolve(savedSalon);
          } else {
            resolve(convertToObj(savedSalon));
          }
        },
        error => {
          reject(`Salão ${JSON.stringify(error)}`);
        },
      );
    } catch (e) {
      reject(`Salão ${JSON.stringify(e)}`);
    }
  });
};
