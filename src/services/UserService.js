import Parse from 'parse/react-native';
import {convertToObj} from '../pipe/conversor';
import {buildUserList, buildUserObject} from '../factory/User';
import {EmployeeObject, updateEmployeeCRUD} from './EmployeeService';

const UserObject = Parse.Object.extend('User');
const UserQuery = new Parse.Query(UserObject);

export const getUsersByEmail = (userEmail, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      UserQuery.equalTo('username', userEmail.trim());
      UserQuery.include('employee_id');
      if (returnParseObject) {
        resolve(await UserQuery.find());
      } else {
        resolve(buildUserList(convertToObj(await UserQuery.find())));
      }
    } catch (e) {
      console.error(`User ${e}`);
      reject(`User ${JSON.stringify(e)}`);
    }
  });
};

export const signUp = userObj => {
  return new Promise(async (resolve, reject) => {
    try {
      const {email, password, employeeId} = userObj;

      const user = new Parse.User();
      user.set('username', email.trim());
      user.set('email', email.trim());
      user.set('password', password.trim());
      user.set('employee_id', new EmployeeObject({objectId: employeeId}));

      resolve(await user.signUp());
    } catch (e) {
      console.error(`User ${e}`);
      reject(`User ${JSON.stringify(e)}`);
    }
  });
};

export const updateUser = userObj => {
  return new Promise(async (resolve, reject) => {
    try {
      const {email, username, password} = userObj;
      const user = new UserObject({objectId: userObj.id});

      user.set('username', email.trim());
      user.set('email', email.trim());

      if (password !== undefined) user.set('password', password.trim());

      resolve(await user.save());
    } catch (e) {
      console.error(`User ${e}`);
      reject(`User ${JSON.stringify(e)}`);
    }
  });
};
