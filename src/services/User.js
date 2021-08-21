import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';

const UserObject = Parse.Object.extend('User');
const UserQuery = new Parse.Query(UserObject);

export const getUserByEmail = (userEmail, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      UserQuery.equalTo('username', userEmail);
      if (returnParseObject) {
        resolve(await UserQuery.first());
      } else {
        resolve(convertToObj(await UserQuery.first()));
      }
    } catch (e) {
      reject(`User ${JSON.stringify(e)}`);
    }
  });
};

export const signUp = userObj => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = new Parse.User();
      const {email, password, funcFK} = userObj;
      user.set('username', email);
      user.set('email', email);
      user.set('password', password);
      user.set('IdFuncFK', funcFK);

      resolve(await user.signUp());
    } catch (e) {
      reject(`User ${JSON.stringify(e)}`);
    }
  });
};

export const updateUser = userObj => {
  return new Promise(async (resolve, reject) => {
    try {
      const {email, username, password, primeiroAcesso} = userObj;
      const user = await getUserByEmail(email, true);

      user.set('username', username);
      user.set('email', email);
      user.set('password', password);
      user.set('primeiroAcesso', primeiroAcesso);

      resolve(await user.save());
    } catch (e) {
      reject(`User ${JSON.stringify(e)}`);
    }
  });
};
