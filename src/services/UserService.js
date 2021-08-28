import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';

const UserObject = Parse.Object.extend('User');
const UserQuery = new Parse.Query(UserObject);

export const getUsersByEmail = (userEmail, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      UserQuery.equalTo('username', userEmail.trim());
      if (returnParseObject) {
        resolve(await UserQuery.find());
      } else {
        resolve(convertToObj(await UserQuery.find()));
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
      user.set('username', email.trim());
      user.set('email', email.trim());
      user.set('password', password.trim());
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
      const {email, username, password} = userObj;
      const user = await getUsersByEmail(email, true);

      user.set('username', username.trim());
      user.set('email', email.trim());
      user.set('password', password.trim());

      resolve(await user.save());
    } catch (e) {
      reject(`User ${JSON.stringify(e)}`);
    }
  });
};
