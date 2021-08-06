import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';

const SalonObject = Parse.Object.extend('Salao');

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

export const getSalonById = (salonId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const SalonQuery = new Parse.Query(SalonObject);

      if (returnParseObject) {
        resolve(await SalonQuery.get(salonId));
      } else {
        resolve(convertToObj(await SalonQuery.get(salonId)));
      }
    } catch (e) {
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};
