import Parse from 'parse/react-native';
import {convertToObj} from '../pipe/conversor';
import {buildSalonObject} from '../factory/Salon';

export const SalonObject = Parse.Object.extend('salon');

export const saveSalon = (salonObj, returnParseObject) => {
  return new Promise((resolve, reject) => {
    try {
      const {salonName, cnpj, employeeQt} = salonObj;

      const newSalon = new SalonObject();
      newSalon.set('name', salonName);
      newSalon.set('cnpj', cnpj);
      newSalon.set('employee_qt', employeeQt);

      newSalon.save().then(
        savedSalon => {
          if (returnParseObject) {
            resolve(savedSalon);
          } else {
            resolve(buildSalonObject(convertToObj(savedSalon)));
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

export const updateSalon = (salonObj, returnParseObject) => {
  return new Promise((resolve, reject) => {
    try {
      const {id, name, cnpj} = salonObj;

      const newSalon = new SalonObject({objectId: id});
      newSalon.set('name', name);
      newSalon.set('cnpj', cnpj);

      newSalon.save().then(
        savedSalon => {
          if (returnParseObject) {
            resolve(savedSalon);
          } else {
            resolve(buildSalonObject(convertToObj(savedSalon)));
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

export const getSalonById = (salonId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const SalonQuery = new Parse.Query(SalonObject);
      SalonQuery.equalTo('objectId', salonId);

      if (returnParseObject) {
        resolve(await SalonQuery.first());
      } else {
        resolve(buildSalonObject(convertToObj(await SalonQuery.first())));
      }
    } catch (e) {
      console.error(`Salão   ${e}`);
      reject(`Salão ${JSON.stringify(e)}`);
    }
  });
};
