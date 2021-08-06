import React, {createContext, useReducer} from 'react';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {convertToObj} from '../../common/conversor';
import {getUserByEmail, signUp} from '../../services/User';
import {getEmployeeById, saveEmployee} from '../../services/Employee';
import {UserReducer} from './UserReducer';
import {getProcedureByName, saveProcedure} from '../../services/Procedure';
import {saveProcedureEmployee} from '../../services/ProcedureEmployee';
import {saveSalon} from '../../services/Salon';

export const UserContext = createContext();

const initialState = {
  currentUser: {},
  salon: {},
  owner: {},
  user: {},
};

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setCurrentUser = async user => {
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    dispatch({type: 'SET_CURRENT_USER', user});
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
        reject(`Deu ruim ao verificar o email ${JSON.stringify(e)}`);
      }
    });
  };

  const doLogin = userData => {
    return new Promise(async (resolve, reject) => {
      try {
        await Parse.User.logIn(userData.email, userData.password).then(
          async user => {
            const stringfiedUser = convertToObj(user);
            const employeeObj = await getEmployeeById(
              stringfiedUser.IdFuncFK.objectId,
            );
            const currentUser = {
              id: stringfiedUser.objectId,
              idFunc: stringfiedUser.IdFuncFK.objectId,
              idSalon: employeeObj.IdSalaoFK.objectId,
            };

            await setCurrentUser(currentUser);
            resolve(currentUser);
          },
        );
      } catch (e) {
        reject(`Logar usuário ${JSON.stringify(e)}`);
      }
    });
  };

  const doLogout = async () => {
    await Parse.User.logOut().then(async () => {
      dispatch({type: 'SET_CURRENT_USER', user: {}});

      await AsyncStorage.clear();
    });
  };

  const doSignup = funcFk => {
    return new Promise(async (resolve, reject) => {
      // const {partners} = payload;
      try {
        state.user.funcFK = funcFk;

        resolve(convertToObj(await signUp(state.user)));

        // partners.map(async partner => {
        //   await signUp(partner);
        // });
      } catch (e) {
        reject(`Deu ruim ao cadastrar os usuários ${e}`);
      }
    });
  };

  const saveSignupInformation = payload => {
    const {procedures, partners} = payload;
    return new Promise(async (resolve, reject) => {
      try {
        const salon = await saveSalon(state.salon, true);
        state.owner.salaoFK = salon;
        const employee = await saveEmployee(state.owner, true);

        procedures.map(async procedure => {
          await saveProcedure(procedure, true);
        });
        partners.map(async partner => {
          partner.salaoFK = salon;
          const savedPartner = await saveEmployee(partner, true);

          if (partner.procedure !== 'Nenhuma') {
            const procedureEmployeer = {
              IdProcFK: await getProcedureByName(partner.procedure.name, true),
              IdFuncFK: savedPartner,
            };

            await saveProcedureEmployee(procedureEmployeer, true);
          }
        });

        resolve(employee);
      } catch (e) {
        reject(`Deu ruim ao salvar as informações do Salão ${e}`);
      }
    });
  };

  const saveOwnerInformation = payload => {
    dispatch({type: 'SAVE_OWNER', payload});
  };

  const cleanOwnerInformation = payload => {
    dispatch({type: 'CLEAN_USER', payload});
  };

  const contextValues = {
    doLogin,
    setCurrentUser,
    doLogout,
    verifyUser,
    saveOwnerInformation,
    saveSignupInformation,
    doSignup,
    cleanOwnerInformation,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
