import React, {createContext, useEffect, useReducer} from 'react';
import Parse from 'parse/react-native';
import {convertToObj} from '../../pipe/conversor';
import {getUsersByEmail, signUp} from '../../services/UserService';
import {
  getEmployeeByEmail,
  getEmployeeById,
  saveEmployeeWithoutProcedures,
} from '../../services/EmployeeService';
import {UserReducer} from './UserReducer';
import {
  getProcedureByName,
  saveProcedure,
} from '../../services/ProcedureService';
import {saveProcedureEmployee} from '../../services/ProcedureEmployeeService';
import {saveSalon} from '../../services/SalonService';
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
    if (isLogging && user !== null) {
      const currentUser = buildCurrentUser(user);
      dispatch({type: 'SET_CURRENT_USER', currentUser});
    } else {
      dispatch({type: 'SET_CURRENT_USER', currentUser: {}});
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
            const employee = await getEmployeeById(user.employee.id, false);

            if (employee.employeeType === 'OWN') {
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

          let partner = await getEmployeeByEmail(userData.email.trim(), false);

          if (partner) {
            if (partner) {
              if (partner.typeEmployee === 'PRC') {
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

          if (userData.cnpj === verifiedPartner.salon.cnpj) {
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

  const doSignup = (employeeId, userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userToSignup = userData === '' ? state.user : userData;
        userToSignup.employeeId = employeeId;

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
        state.salon.employeeQt = partners.length;
        const salon = await saveSalon(state.salon, true);
        state.owner.salonId = salon;

        const employee = await saveEmployeeWithoutProcedures(state.owner, true);

        if (procedures.length > 0) {
          procedures.map(async procedure => {
            procedure.salonId = salon;
            procedure.employeeId = employee;
            await saveProcedure(procedure, true);
          });
        }

        if (partners.length > 0) {
          partners.map(async partner => {
            partner.salonId = salon;
            const savedPartner = await saveEmployeeWithoutProcedures(
              partner,
              true,
            );

            if (partner.procedures.length !== 0) {
              partner.procedures.map(async procedure => {
                const procedureEmployeer = {
                  procedureId: await getProcedureByName(procedure.name, true),
                  employeeId: savedPartner,
                };

                await saveProcedureEmployee(procedureEmployeer, true);
              });
            }
          });
        }

        resolve(employee);
      } catch (e) {
        console.log(e);
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
