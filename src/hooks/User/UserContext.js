import Parse from "parse/react-native";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  updateEmployeeParse,
  saveEmployeeParse,
} from "../../services/EmployeeService";
import { getSalonById, updateSalonParse } from "../../services/SalonService";
import { signUp, updateUser } from "../../services/UserService";
import { UserReducer } from "./UserReducer";
import { handleError } from "../../common/HandleError";
import { convertToObj } from "../../common/converters/GenericConverter";
import { buildCurrentUser, buildProfile } from "../../factory/UserFactory";
import Constants from "../../common/Constants";

export const UserContext = createContext();

const initialState = {
  stackStatus: Constants.LOADING_ROUTE_STACK,
  isOwner: false,
  currentUser: {},
  notifications: [],
  hasNotification: false,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    (async () => {
      const currentUser = convertToObj(await Parse.User.currentAsync());
      await setCurrentUser(currentUser);
      changeStack(
        currentUser ? Constants.IN_ROUTE_STACK : Constants.OUT_ROUTE_STACK
      );
    })();
  }, []);

  // useEffect(() => {
  //   handleNotification(state.notifications.length > 0);
  // }, []);

  const changeStack = (stackStatus) => {
    dispatch({ type: "CHANGE_STACK", stackStatus });
  };

  const setCurrentUser = async (user) => {
    try {
    let salon = null;
      if (user !== null) {
        const {
          employee_id: {
            salon_id: { objectId: salonId },
          },
        } = user;
        salon = await getSalonById(salonId);
      }
      dispatch({
        type: "SET_CURRENT_USER",
        currentUser: buildCurrentUser(user, salon),
      });
    } catch (e) {
      handleError(e, "user");
    }
  };

  const onLogout = async () => {
    await setCurrentUser(null);
    changeStack(Constants.OUT_ROUTE_STACK);
  };

  const onLogin = async (userData) => {
    try {
      console.log("userDFata", userData);
      const user = await Parse.User.logIn(
        userData.email.trim(),
        userData.password
      );
      const convertedUser = convertToObj(user);
      await setCurrentUser(convertedUser);
      changeStack(Constants.IN_ROUTE_STACK);
    } catch (e) {
      handleError(e, "user");
    }
  };

  const onSignup = async (userToSignup) => {
    try {
      const user = await signUp(userToSignup);
      await setCurrentUser(user);
      changeStack(Constants.IN_ROUTE_STACK);
    } catch (e) {
      handleError(e, "user");
    }
  };

  const updateProfile = async (payload) => {
    try {  
      const {user, employee, salon} = payload;
      await updateEmployeeParse(employee, false);
      const newUser = await updateUser(user);
      await updateSalonParse(salon);

      console.log("newUser", newUser)
      await setCurrentUser(newUser);

    } catch (e) {
      handleError(e, "user");
    }
  };

  // const verifyNotification = payload => {
  //   let notification = "";
  //   const { name, verification, method } = payload;
  //
  //   switch (name) {
  //     case Notifications.notifications[0].name:
  //       notification = verification
  //         ? {
  //           ...Notifications.notifications[0],
  //           method: method,
  //         }
  //         : {};
  //       break;
  //   }
  //
  //   if (verification) dispatch({ type: "SET_NOTIFICATION", notification });
  //   else dispatch({ type: "CLEAN_NOTIFICATION", notification });
  //
  //   dispatch({ type: "HANDLE_NOTIFICATION", payload: verification });
  // };
  //
  // const handleNotification = payload => {
  //   dispatch({ type: "HANDLE_NOTIFICATION", payload });
  // };

  const contextValues = {
    // verifyNotification,
    changeStack,
    onLogin,
    onSignup,
    onLogout,
    updateProfile,
    setCurrentUser,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
const useUser = () => {
  return useContext(UserContext);
};

export { useUser, UserProvider };
