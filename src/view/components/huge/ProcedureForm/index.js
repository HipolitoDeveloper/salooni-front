import React, {useContext, useEffect, useRef, useState} from 'react';
import * as S from './styled';
import Input from '../../small/Input';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import global from '../../../../common/global';
import ErrorMessage from '../../small/ErrorMessage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import errorMessages from '../../../../common/errorMessages';
import AlertModal from '../../small/AlertModal';
import {UserContext} from '../../../../contexts/User/UserContext';
import {ProcedureContext} from '../../../../contexts/Procedure/ProcedureContext';
import {InputModal} from '../../small/InputModal';
import RegisterComponent from '../RegisterComponent';
import Loading from '../../small/Loading';

const ProcedureForm = ({
  route,

  goBack,
  isSigningUp,
}) => {
  const {
    addProcedure,
    editProcedure,
    registeredProcedures,
    saveProcedures,
    cleanProceduresInformation,
    updateProcedureInView,
    updateProcedure,
    deleteProcedure,
    deleteProcedureInView,
  } = useContext(ProcedureContext);

  const {currentUser} = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });
  const [procedure, setProcedure] = useState({
    name: '',
    time: '',
    value: '',
    maintenanceValue: '',
    maintenanceDays: '',
    commissionPercentage: '',
    commissionValue: '',
    hasCommission: {state: false, text: 'times'},
    hasMaintenance: {state: false, text: 'times'},
  });

  const navigate = useNavigation();
  const isFocused = useIsFocused();

  console.log('isFocused', isFocused);

  navigate.addListener('focus', () => {
    if (!isSigningUp) {
      const procedureInView = route.params?.procedure;

      if (Object.keys(procedureInView).length !== 0) {
        setProcedure(procedureInView);
        setIsEditing(true);
      }
    }
  });

  useEffect(() => {
    registeredProcedures.forEach(procedure => (procedure.isInView = false));
  }, []);

  const clearProcedure = () => {
    setProcedure({
      name: '',
      time: '',
      value: '',
      maintenanceValue: '',
      maintenanceDays: '',
      commissionPercentage: '',
      commissionValue: '',
      hasCommission: {state: false, text: 'times'},
      hasMaintenance: {state: false, text: 'times'},
    });
  };

  const handleChange = (text, name, isSwitch) => {
    if (name === 'commissionPercentage') {
      delete procedure.isFixedValue;
      procedure.commissionValue = '';
      setProcedure({
        ...procedure,
        ['isPercentage']: !!text,
        [name]: isSwitch ? '' : text,
      });
    } else if (name === 'commissionValue') {
      delete procedure.isPercentage;
      procedure.commissionPercentage = '';
      setProcedure({
        ...procedure,
        ['isFixedValue']: !!text,
        [name]: isSwitch ? '' : text,
      });
    } else {
      setProcedure({
        ...procedure,
        [name]: text,
      });
    }
  };

  const handleModal = (isShowing, text, isNavigating) => {
    setShowAlertModal({isShowing: isShowing, text: text});

    if (isNavigating) {
      navigate.navigate('SignupPartners');
    }
  };

  const chooseAddProcedureMethod = () => {
    const {isInView, indexInView} = {...procedure};
    if (verifyInformation(true) && isInView) {
      procedure.isInView = false;
      editProcedure({procedure: procedure, index: indexInView});
      setErrorMessage('');
      clearProcedure();
    }

    if (verifyInformation(true) && !isInView) {
      if (!isSigningUp) {
        procedure.salonId = currentUser.idSalon;
        procedure.employeeId = currentUser.idFunc;
      }

      addProcedure(procedure);
      setErrorMessage('');
      clearProcedure();
    }
  };

  const deletePreRegisteredItem = procedure => {
    deleteProcedureInView(procedure);
    clearProcedure();
  };

  const handleProcedure = (procedure, index) => {
    updateProcedureInView(index);
    procedure.isInView = !procedure.isInView;
    procedure.indexInView = index;

    procedure.isFixedValue = !!procedure.commissionValue;

    procedure.isPercentage = !!procedure.commissionPercentage;

    setProcedure(procedure);

    if (!verifyIfIsEditing()) {
      clearProcedure();
    }
  };

  const verifyIfIsEditing = () => {
    return registeredProcedures.some(procedure => procedure.isInView === true);
  };

  const cancelEditing = () => {
    updateProcedureInView(-1);
    clearProcedure();
  };

  const saveProcedure = () => {
    setIsLoading(true);

    if (verifyInformationToGo()) {
      saveProcedures().then(
        () => {
          setTimeout(() => {
            setIsLoading(false);
            goBack();
            clearProcedure();
            cleanProceduresInformation();
          }, 3000);
          setErrorMessage('');
        },
        error => {
          setIsLoading(false);
          console.log(error);
        },
      );
    }
  };

  const updateProcedures = () => {
    setIsLoading(true);
    if (verifyInformation(true)) {
      updateProcedure(procedure).then(
        async () => {
          setTimeout(() => {
            setIsLoading(false);
            goBack();
            clearProcedure();
          }, 1000);
          setErrorMessage('');
        },
        error => {
          setIsLoading(false);
          console.log(error);
        },
      );
    }
  };

  const deleteProcedures = () => {
    setIsLoading(true);
    deleteProcedure(procedure).then(
      () => {
        setIsLoading(false);
        goBack();
        setErrorMessage('');
        clearProcedure();
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;
    if (Object.keys(procedure).length === 6) {
      addProcedure(procedure);
      return ableToGo;
    } else if (registeredProcedures.length === 0) {
      ableToGo = false;
      if (isSigningUp)
        handleModal(true, errorMessages.noProcedureMessage, false);
      else setErrorMessage(errorMessages.saveErrorProcedureMessage);
      setIsLoading(false);
    }
    return ableToGo;
  };

  const verifyInformation = showErrorMessages => {
    let ableToGo = true;
    let errorMessage = '';
    if (
      procedure === {} ||
      procedure.name === undefined ||
      procedure.name === '' ||
      procedure.time === undefined ||
      procedure.time === '' ||
      procedure.value === undefined ||
      procedure.value === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessages.procedureMessage;
      if (showErrorMessages) setIsLoading(false);
    }

    if (!procedure.hasMaintenance.state) {
      procedure.maintenanceValue = '';
      procedure.maintenanceDays = '';
    } else if (
      procedure.hasMaintenance.state &&
      (procedure.maintenanceValue === '' ||
        procedure.maintenanceDays === '' ||
        procedure.maintenanceValue === undefined ||
        procedure.maintenanceDays === undefined)
    ) {
      ableToGo = false;
      errorMessage = errorMessages.maintenanceMessage;
      setErrorMessage(errorMessage);
      if (showErrorMessages) setIsLoading(false);
    }

    if (!procedure.hasCommission.state) {
      procedure.commissionValue = '';
      procedure.commissionPercentage = '';
    } else if (
      procedure.hasCommission.state &&
      (procedure.commissionPercentage === '' ||
        procedure.commissionPercentage === undefined ||
        procedure.commissionPercentage === 0) &&
      (procedure.commissionValue === '' ||
        procedure.commissionValue === undefined ||
        procedure.commissionValue === 0)
    ) {
      ableToGo = false;
      errorMessage = errorMessages.commissionMessage;
      if (showErrorMessages) setIsLoading(false);
    } else {
      const procedureValue = parseFloat(
        procedure.value !== 0 ? procedure.value.replace(',', '') : 0,
      );

      const commissionValue = parseFloat(
        procedure.commissionValue !== 0
          ? procedure.commissionValue.replace(',', '')
          : 0,
      );

      if (commissionValue > procedureValue) {
        errorMessage = errorMessages.commissionMismatchMessage;
        setErrorMessage(errorMessage);
        ableToGo = false;
        if (showErrorMessages) setIsLoading(false);
      }
    }

    if (showErrorMessages) setErrorMessage(errorMessage);
    if (errorMessage === '') setErrorMessage('');
    return ableToGo;
  };

  return (
    <RegisterComponent
      validForm={() => verifyInformation(false)}
      isSigningUp={isSigningUp}
      onCancel={goBack}
      color={`${global.colors.purpleColor}`}
      preRegisteredItems={registeredProcedures}
      handleSelect={handleProcedure}
      deletePreRegisteredItem={deletePreRegisteredItem}
      onConfirm={isEditing ? updateProcedures : saveProcedure}
      isEditing={isEditing}
      isPreRegisteredEditing={verifyIfIsEditing()}
      cancelEditing={cancelEditing}
      onAdd={chooseAddProcedureMethod}
      registeredItemRightInformation={'value'}
      headerTitle={'Procedimentos'}>
      {errorMessage !== '' && (
        <ErrorMessage
          text={errorMessage}
          width={'70%'}
          textColor={`${global.colors.purpleColor}`}
        />
      )}

      <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />
      <S.BodyContent isSigningUp={isSigningUp}>
        <Input
          handleChange={handleChange}
          name={'name'}
          placeholder={'Nome do Procedimento'}
          value={procedure.name}
          width={'80%'}
          keyboard={'default'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={false}
          color={global.colors.purpleColor}
          label={'Nome*'}
          isToValidate={isFocused}
          noEmpty={true}
        />

        <Input
          handleChange={handleChange}
          name={'time'}
          placeholder={'Duração do Procedimento'}
          value={procedure.time}
          width={'80%'}
          keyboard={'numeric'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={false}
          mask={'hour'}
          maxLength={3}
          rightPlaceholder={'minutos'}
          color={global.colors.purpleColor}
          label={'Duração*'}
          isToValidate={isFocused}
          noEmpty={true}
        />

        <Input
          handleChange={handleChange}
          name={'value'}
          placeholder={'Valor do Procedimento*'}
          value={procedure.value}
          width={'80%'}
          keyboard={'numeric'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={false}
          mask={'brl'}
          leftPlaceholder={'R$'}
          color={global.colors.purpleColor}
          label={'Valor*'}
          isToValidate={isFocused}
          noEmpty={true}
        />

        <InputModal
          name={'hasMaintenance'}
          inputTitle={'Manutenção'}
          handleSwitch={handleChange}
          stateSwitch={procedure.hasMaintenance}>
          <Input
            handleChange={handleChange}
            name={'maintenanceValue'}
            placeholder={'Valor de Manutenção'}
            value={procedure.maintenanceValue}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={14}
            disabled={false}
            mask="brl"
            leftPlaceholder={'R$'}
            color={global.colors.purpleColor}
            label={'Valor*'}
            isToValidate={isFocused}
            noEmpty={true}
          />
          <Input
            handleChange={handleChange}
            name={'maintenanceDays'}
            placeholder={'Dias para Manutenção'}
            value={procedure.maintenanceDays}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={14}
            disabled={false}
            mask="none"
            color={global.colors.purpleColor}
            label={'Dias*'}
            isToValidate={isFocused}
            noEmpty={true}
          />
        </InputModal>

        <InputModal
          name={'hasCommission'}
          inputTitle={'Comissão'}
          handleSwitch={handleChange}
          stateSwitch={procedure.hasCommission}>
          <S.CheckboxContainer>
            <S.CheckboxContent>
              <BouncyCheckbox
                isChecked={procedure.isPercentage}
                onPress={isChecked =>
                  handleChange(
                    !procedure.isPercentage,
                    'commissionPercentage',
                    true,
                  )
                }
                fillColor={`${global.colors.purpleColor}`}
                disableBuiltInState={true}
                disableText={true}
              />
              <Input
                handleChange={handleChange}
                name={'commissionPercentage'}
                value={procedure.commissionPercentage}
                width={'73%'}
                keyboard={'numeric'}
                placeholder={'Porcentagem da Comissão'}
                isSecureTextEntry={false}
                fontSize={13}
                disabled={false}
                mask={'percentage'}
                maxLength={3}
                rightPlaceholder={'%'}
                validateInput={false}
                color={global.colors.purpleColor}
                label={'Porcentagem'}
              />
            </S.CheckboxContent>
            <S.CheckboxContent>
              <BouncyCheckbox
                style={{borderColor: global.colors.purpleColor}}
                isChecked={procedure.isFixedValue}
                onPress={isChecked =>
                  handleChange(!procedure.isFixedValue, 'commissionValue', true)
                }
                fillColor={`${global.colors.purpleColor}`}
                disableBuiltInState={true}
                disableText={true}
              />
              <Input
                handleChange={handleChange}
                name={'commissionValue'}
                value={procedure.commissionValue}
                width={'73%'}
                placeholder={'Valor da Comissão.'}
                keyboard={'numeric'}
                isSecureTextEntry={false}
                fontSize={13}
                disabled={false}
                mask={'brl'}
                leftPlaceholder={'R$'}
                validateInput={false}
                color={global.colors.purpleColor}
                label={'Valor'}
              />
            </S.CheckboxContent>
          </S.CheckboxContainer>
        </InputModal>
      </S.BodyContent>

      <AlertModal
        text={showAlertModal.text}
        isVisible={showAlertModal.isShowing}
        onClose={() => {
          handleModal(false, '', false);
        }}
        onOk={() => {
          isSigningUp
            ? handleModal(false, '', true)
            : deleteProcedures(procedure);
        }}
        title={'Atenção.'}
      />
    </RegisterComponent>
  );
};

export default ProcedureForm;
