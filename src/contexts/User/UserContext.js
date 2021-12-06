import React, {createContext, useEffect, useReducer} from 'react';
import Parse from 'parse/react-native';
import {convertToObj} from '../../pipe/conversor';
import {getUsersByEmail, signUp, updateUser} from '../../services/UserService';
import {
  getEmployeeByEmail,
  saveEmployee,
  saveEmployeeWithoutProcedures,
  updateEmployeeCRUD,
} from '../../services/EmployeeService';
import {UserReducer} from './UserReducer';
import {saveProcedure} from '../../services/ProcedureService';
import {
  getSalonById,
  saveSalon,
  updateSalon,
} from '../../services/SalonService';
import {buildCurrentUser} from '../../factory/User';
import errorMessages from '../../common/errorMessages';
import {convertUserToProfileObject} from '../../pipe/userPipe';
import {
  CNPJVerifier,
  EMAILVerifier,
  PASSVerifier,
  TELVerifier,
} from '../../view/components/small/Input/verifier';
import notificationsMessages from '../../common/notificationsMessages';

export const UserContext = createContext();

const initialState = {
  loginStatus: 'LOA',
  isOwner: false,
  currentUser: {},
  owner: {
    salonName: '',
    cnpj: '',
    userName: '',
    tel: '',
    email: '',
    password: '',
    errorProperties: [],
  },
  notifications: [],
  showingNotification: false,
};

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    const verifyUser = async () => {
      const user = convertToObj(await Parse.User.currentAsync());
      await setCurrentUser(true, user);
    };
    verifyUser();
  }, []);

  useEffect(() => {
    console.log('testewqe21');
    handleNotification(state.notifications.length > 0);
  }, []);

  const verifySignup = payload => {
    const {procedures, partners} = payload;
    let isOk = true;
    let errorMessage = '';
    let showReconfirmModal = false;
    let ownerToBeVerified = state.owner !== undefined ? state.owner : '';

    if (ownerToBeVerified === '') {
      return {
        isOk: false,
        errorMessage: 'Nenhuma informação do cadastro foi preenchida.',
        showReconfirmModal: false,
      };
    }

    if (ownerToBeVerified.errorProperties.length > 0) {
      return {
        isOk: false,
        errorMessage: '',
        showReconfirmModal: false,
      };
    }

    if (partners.some(partner => partner.errorProperties.length > 0)) {
      return {
        isOk: false,
        errorMessage: '',
        showReconfirmModal: false,
      };
    }

    if (ownerToBeVerified.salonName === '') {
      isOk = false;
      errorMessage = 'O nome de usuário não pode ser vazio.';
    } else if (
      ownerToBeVerified.cnpj === '' ||
      !CNPJVerifier(ownerToBeVerified.cnpj).state
    ) {
      isOk = false;
      errorMessage = 'O CNPJ do usuário não pode ser vazio.';
    } else if (ownerToBeVerified.userName === '') {
      isOk = false;
      errorMessage = 'O nome do salão não pode ser vazio.';
    } else if (
      ownerToBeVerified.tel === '' ||
      !TELVerifier(ownerToBeVerified.tel).state
    ) {
      isOk = false;
      errorMessage = 'O telefone do usuário não pode ser vazio.';
    } else if (
      ownerToBeVerified.email === '' ||
      !EMAILVerifier(ownerToBeVerified.email).state
    ) {
      isOk = false;
      errorMessage = 'O e-mail do usuário não pode ser vazio.';
    } else if (
      ownerToBeVerified.password === '' ||
      !PASSVerifier(ownerToBeVerified.password).state
    ) {
      isOk = false;
      errorMessage = 'A senha não é forte o suficiente.';
    } else if (procedures.length === 0) {
      errorMessage = errorMessages.noProcedureMessage;
      showReconfirmModal = true;
    } else if (partners.length === 0) {
      errorMessage = errorMessages.noPartnerSignupMessage;
      showReconfirmModal = true;
    }

    return {
      isOk,
      errorMessage,
      showReconfirmModal,
    };
  };

  const handleOwner = payload => {
    dispatch({type: 'HANDLE_OWNER', payload});
  };

  const setCurrentUser = async (isLogging, user) => {
    console.log('user', user);
    if (isLogging && user !== null) {
      const salon = await getSalonById(
        user.employee_id.salon_id.objectId,
        false,
      );
      const currentUser = buildCurrentUser(user, salon);

      const loginStatus = Object.keys(currentUser).length > 0 ? 'IN' : 'OUT';

      dispatch({type: 'SET_LOGIN_STATUS', loginStatus});
      dispatch({type: 'SET_CURRENT_USER', currentUser});
    } else {
      dispatch({type: 'SET_LOGIN_STATUS', loginStatus: 'OUT'});
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
            const {employee} = user;

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
              if (partner.employeeType === 'PRC') {
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
            const convertedUser = convertToObj(user);
            await setCurrentUser(true, convertedUser);
            resolve('Deu certo');
          },
        );
      } catch (e) {
        reject(`Deu ruim ao logar usuário ${JSON.stringify(e)}`);
      }
    });
  };

  const doSignup = (employee, userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userToSignup = userData === '' ? state.owner : userData;
        userToSignup.employeeId = employee.id;

        resolve(convertToObj(await signUp(userToSignup)));
      } catch (e) {
        reject(`Deu ruim ao cadastrar os usuários ${e}`);
      }
    });
  };

  const saveSignupInformation = payload => {
    const {procedures, partners} = payload;
    const userInformation = state.owner;
    console.log('Procedimentos', procedures);
    console.log('Parceiros', partners);
    console.log('Dono', userInformation);

    return new Promise(async (resolve, reject) => {
      try {
        userInformation.employeeQt = partners.length;
        const salon = await saveSalon(userInformation, false);
        userInformation.salonId = salon.id;
        userInformation.employeeType = 'OWN';
        const ownerEmployee = await saveEmployeeWithoutProcedures(
          userInformation,
          false,
        );

        if (procedures.length > 0) {
          procedures.map(async procedure => {
            procedure.salonId = salon.id;
            procedure.employeeId = ownerEmployee.id;
            console.log('Procedure', procedure);
            await saveProcedure(procedure, true);
          });
        }

        if (partners.length > 0) {
          partners.map(async partner => {
            partner.salonId = salon.id;

            await saveEmployee(partner, true, true);
          });
        }

        resolve(ownerEmployee);
      } catch (e) {
        console.log(`Deu ruim ao salvar as informações do Salão ${e}`);
        reject(e);
      }
    });
  };

  const updateProfile = payload => {
    return new Promise(async (resolve, reject) => {
      try {
        const {user, salon, employee} = convertUserToProfileObject(payload);
        await updateEmployeeCRUD(employee, false);
        await updateUser(user);
        await updateSalon(salon);
        resolve(dispatch({type: 'UPDATE_USER', payload}));
      } catch (e) {
        console.log(`Deu ruim ao atualizar as informações do Usuário ${e}`);
        reject(e);
      }
    });
  };

  const saveOwnerInformation = payload => {
    dispatch({type: 'SAVE_OWNER', payload});
  };

  const cleanOwnerInformation = payload => {
    dispatch({type: 'CLEAN_OWNER', payload});
  };

  const verifyNotification = payload => {
    let notification = '';
    const {name, verification, method} = payload;

    switch (name) {
      case notificationsMessages.notifications[0].name:
        notification = verification
          ? {
              ...notificationsMessages.notifications[0],
              method: method,
            }
          : {};
        break;
    }

    if (verification) dispatch({type: 'SET_NOTIFICATION', notification});
    else dispatch({type: 'CLEAN_NOTIFICATION', notification});

    dispatch({type: 'HANDLE_NOTIFICATION', payload: verification});
  };

  const handleNotification = payload => {
    dispatch({type: 'HANDLE_NOTIFICATION', payload});
  };

  const handleRegisterError = payload => {
    dispatch({type: 'HANDLE_ERROR', payload});
  };

  const contextValues = {
    handleRegisterError,
    handleNotification,
    verifyNotification,
    updateProfile,
    doLogin,
    setCurrentUser,
    verifyOwner,
    verifyPartner,
    saveOwnerInformation,
    saveSignupInformation,
    doSignup,
    cleanOwnerInformation,
    handleOwner,
    verifySignup,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
