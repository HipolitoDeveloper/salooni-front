import Parse from 'parse/react-native';
import {convertToObj} from '../config/conversor';

const UserObject = Parse.Object.extend('User');
const query = new Parse.Query(UserObject);

export const getUserByEmail = userEmail => {
  return new Promise(async (resolve, reject) => {
    try {
      query.equalTo('username', userEmail);
      resolve(convertToObj(await query.first()));
    } catch (e) {
      reject('Deu ruim ao pegar o usuário pelo e-mail', e);
    }
  });
};
