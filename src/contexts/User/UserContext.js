import React, {createContext, useState} from 'react';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {convertToObj} from '../../config/conversor';
import {getUserByEmail} from '../../services/User';
import {getEmployeeById} from '../../services/Employee';

export const UserContext = createContext();

const initialState = {
  currentUser: {},
};

const UserProvider = ({children}) => {
  const [state, setState] = useState(initialState);

  const setCurrentUser = async user => {
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    setState({
      ...initialState,
      currentUser: user,
    });
  };

  const verifyUser = userEmail => {
    return new Promise(async (resolve, reject) => {
      try {
        let isPartner = false;
        let isFirstAccess = false;
        const user = await getUserByEmail(userEmail);

        if (user) {
          const partner = await getEmployeeById(user.IdFuncFK.objectId);

          if (partner.TipoFunc === 'PRC') {
            isPartner = true;
          } else {
            throw 'Não é parceiro';
          }

          isFirstAccess = user.firstAccess === true;
        }

        resolve({isPartner: isPartner, isFirstAccess: isFirstAccess});
      } catch (e) {
        reject(`Deu ruim ao verificar o email ${e}`);
      }
    });
  };

  const doLogin = userData => {
    return new Promise(async (resolve, reject) => {
      try {
        await Parse.User.logIn(userData.email, userData.password).then(
          async user => {
            const stringfiedUser = convertToObj(user);

            const currentUser = {
              id: stringfiedUser.objectId,
              idFunc: stringfiedUser.IdFuncFK.objectId,
            };

            await setCurrentUser(currentUser);
            resolve(currentUser);
          },
        );
      } catch (e) {
        reject('Deu ruim ao logar o usuário');
      }
    });
  };

  const doLogout = async () => {
    await Parse.User.logOut().then(async () => {
      setState(initialState);
      await AsyncStorage.clear();
    });
  };

  const contextValues = {
    doLogin,
    setCurrentUser,
    doLogout,
    verifyUser,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
