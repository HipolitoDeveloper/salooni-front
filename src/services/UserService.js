import Parse from "parse/react-native";
import { EmployeeObject, updateEmployeeParse } from "./EmployeeService";
import { buildUser, buildUserList } from "../factory/UserFactory";
import { convertToObj } from "../common/converters/GenericConverter";

const UserObject = Parse.Object.extend("User");
const UserQuery = new Parse.Query(UserObject);

export const getUsersByEmail = async (userEmail) => {
  UserQuery.equalTo("username", userEmail.trim());
  UserQuery.include("employee_id");

  try {
    const users = await UserQuery.first();
    return buildUser(convertToObj(users));
  } catch (e) {
    throw e;
  }
};

export const signUp = async (user) => {
  const {
    email,
    password,
    employee: { id: employeeId },
  } = user;

  const UserParse = new Parse.User();
  UserParse.set("username", email.trim());
  UserParse.set("email", email.trim());
  UserParse.set("password", password.trim());
  UserParse.set("employee_id", new EmployeeObject({ objectId: employeeId }));

  const EmployeeParse = new EmployeeObject(({ objectId: employeeId }))
  EmployeeParse.set("first_access", true)


  try {
    await EmployeeParse.save()
    return convertToObj(await UserParse.signUp());
  } catch (e) {
    throw e;
  }
};

export const updateUser = async (user) => {
  const { email, username, password } = user;
  const UserParse = new UserObject({ objectId: user.id });

  UserParse.set("username", email.trim());
  UserParse.set("email", email.trim());

  if (password !== undefined) user.set("password", password.trim());

  try {
    return convertToObj(await UserParse.save());
  } catch (e) {
    throw e;
  }
};

export const setFirstAccessUser = async (userId) => {
  const UserParse = new UserObject({ objectId: userId });

  UserParse.set("first_access", false);

  try {
    const user = await UserParse.save();
    return convertToObj(user);
  } catch (e) {
    throw e;
  }
};
