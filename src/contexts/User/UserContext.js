import React, {createContext, useEffect, useReducer} from 'react';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {convertToObj} from '../../common/conversor';
import {getUsersByEmail, signUp, updateUser} from '../../services/UserService';
import {
  getEmployeeByEmail,
  getEmployeeById,
  saveEmployee,
} from '../../services/EmployeeService';
import {UserReducer} from './UserReducer';
import {
  getProcedureByName,
  saveProcedure,
} from '../../services/ProcedureService';
import {saveProcedureEmployee} from '../../services/ProcedureEmployeeService';
import {getSalonById, saveSalon} from '../../services/SalonService';
import {buildCurrentUser} from '../../factory/User';

export const UserContext = createContext();

const initialState = {
  currentUser: {},
  salon: {},
  owner: {},
  user: {},
};

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    const verifyUser = async () => {
      await setCurrentUser(true, await Parse.User.currentAsync());
    };
    verifyUser();
  }, []);

  const setCurrentUser = async (isLogging, user) => {
    if (isLogging) {
      await buildCurrentUser(user).then(currentUser => {
        dispatch({type: 'SET_CURRENT_USER', currentUser});
      });
    } else {
      dispatch({type: 'SET_CURRENT_USER', currentUser: user});
    }
  };

  const verifyOwner = userData => {
    return new Promise(async (resolve, reject) => {
      try {
        let isOwner = false;

        const users = await getUsersByEmail(userData.email.trim(), false);

        if (users.length > 0) {
          const user = users[0];
          if (user) {
            const employee = await getEmployeeById(
              user.IdFuncFK.objectId,
              false,
            );

            if (employee.TipoFunc === 'OWN') {
              isOwner = true;
            } else {
              throw 'Não é proprietário';
            }
          }
        } else {
          throw 'Não foi encontrado';
        }

        resolve(isOwner);
      } catch (e) {
        console.log(e);
        reject(`${JSON.stringify(e)}`);
      }
    });
  };

  const verifyPartner = (userData, verifiedPartner) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (verifiedPartner === '') {
          let isPartner = false;
          let isFirstAccess = true;

          let partner = await getEmployeeByEmail(userData.email.trim(), true);

          if (partner) {
            if (partner) {
              if (partner.get('TipoFunc') === 'PRC') {
                isPartner = true;
              } else {
                throw 'Não é parceiro';
              }
            }
            const users = await getUsersByEmail(userData.email.trim(), false);

            if (users.length > 0) {
              isFirstAccess = false;
            }
          } else {
            throw 'Não está no sistema';
          }

          resolve({
            isPartner: isPartner,
            isFirstAccess: isFirstAccess,
            verifiedPartner: partner,
          });
        } else {
          let isAbleToSignup = false;
          let salon = verifiedPartner.get('IdSalaoFK');

          if (userData.CNPJ === salon.get('CNPJ')) {
            isAbleToSignup = true;
          } else {
            throw 'CNPJ não encontrado para esse parceiro';
          }
          resolve({
            isAbleToSignup: isAbleToSignup,
          });
        }
      } catch (e) {
        console.log(e);
        reject(`${JSON.stringify(e)}`);
      }
    });
  };

  const doLogin = userData => {
    return new Promise(async (resolve, reject) => {
      try {
        await Parse.User.logIn(userData.email.trim(), userData.password).then(
          async user => {
            await setCurrentUser(true, user);
            resolve('Deu certo');
          },
        );
      } catch (e) {
        reject(`Logar usuário ${JSON.stringify(e)}`);
      }
    });
  };

  const doSignup = (funcFk, userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userToSignup = userData === '' ? state.user : userData;
        userToSignup.funcFK = funcFk;

        resolve(convertToObj(await signUp(userToSignup)));
      } catch (e) {
        reject(`Deu ruim ao cadastrar os usuários ${e}`);
      }
    });
  };

  const saveSignupInformation = payload => {
    const {procedures, partners} = payload;
    return new Promise(async (resolve, reject) => {
      try {
        state.salon.employee_qt = partners.length;
        const salon = await saveSalon(state.salon, true);
        state.owner.salaoFK = salon;

        const employee = await saveEmployee(state.owner, true);

        procedures.map(async procedure => {
          procedure.salaoFK = salon;
          procedure.funcFk = employee;
          await saveProcedure(procedure, true);
        });
        partners.map(async partner => {
          partner.salaoFK = salon;
          const savedPartner = await saveEmployee(partner, true);

          if (partner.procedures.length !== 0) {
            partner.procedures.map(async procedure => {
              const procedureEmployeer = {
                IdProcFK: await getProcedureByName(procedure.name, true),
                IdFuncFK: savedPartner,
              };

              await saveProcedureEmployee(procedureEmployeer, true);
            });
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
    verifyOwner,
    verifyPartner,
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
