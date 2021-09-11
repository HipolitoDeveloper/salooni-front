import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import Input from '../Input';
import SubmitButton from '../SubmitButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import global from '../../../common/global';
import ErrorMessage from '../ErrorMessage';
import {useNavigation} from '@react-navigation/native';
import errorMessages from '../../../common/errorMessages';
import AlertModal from '../AlertModal';
import {ActivityIndicator, Text} from 'react-native';
import BackButton from '../BackButton';
import {UserContext} from '../../../contexts/User/UserContext';
import {getSalonById} from '../../../services/SalonService';
import Icon from 'react-native-vector-icons/Ionicons';
import {ProcedureParseObjectToProcedureObject} from '../../../common/conversor';
import {ProcedureContext} from '../../../contexts/Procedure/ProcedureContext';

const ProcedureRegister = ({
  route,
  pageTitle,
  pageDescription,
  goBack,
  isSigningUp,
}) => {
  const {
    addProcedure,
    editProcedure,
    registeredProcedures,
    saveProcedures,
    cleanRegisteredProcedures,
    updateProcedureInView,
    updateProcedure,
    deleteProcedure,
    deleteProcedureInView,
  } = useContext(ProcedureContext);

  const {currentUser} = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });
  const [procedure, setProcedure] = useState({});
  const navigate = useNavigation();

  useEffect(() => {
    navigate.addListener('focus', () => {
      const procedureInView = route.params?.procedure
        ? ProcedureParseObjectToProcedureObject(route.params?.procedure)
        : {};

      if (Object.keys(procedureInView).length !== 0) {
        setProcedure(procedureInView);
        setIsEditing(true);
      }
    });
  }, [navigate]);

  useEffect(() => {
    registeredProcedures.forEach(client => (client.isInView = false));
  }, []);

  const handleChange = (text, rawText, name) => {
    if (name === 'percentage') {
      delete procedure.isFixedValue;
      procedure.fixedValue = 0;
      setProcedure({
        ...procedure,
        ['isPercentage']: !!text,
        [name]: text,
      });
    } else if (name === 'fixedValue') {
      delete procedure.isPercentage;
      procedure.percentage = 0;
      setProcedure({
        ...procedure,
        ['isFixedValue']: !!text,
        [name]: text,
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

  const chooseAddProcedureMethod = async () => {
    const {isInView, indexInView} = {...procedure};

    if (verifyInformation() && isInView) {
      procedure.isInView = false;
      editProcedure({procedure: procedure, index: indexInView});
      setErrorMessage('');
      setProcedure({});
    }

    if (verifyInformation() && !isInView) {
      if (!isSigningUp)
        procedure.IdSalaoFK = await getSalonById(currentUser.idSalon, true);
      addProcedure({
        salonId: isSigningUp ? null : currentUser.idSalon,
        employeeId: isSigningUp ? null : currentUser.idFunc,
        procedure: procedure,
        isSignup: isSigningUp,
      });
      setErrorMessage('');
      setProcedure({});
    }
  };

  const handleProcedure = (procedure, index) => {
    updateProcedureInView(index);
    procedure.isInView = !procedure.isInView;
    procedure.indexInView = index;

    procedure.isFixedValue = !!procedure.value;

    procedure.isPercentage = !!procedure.percentage;

    setProcedure(procedure);

    if (!verifyIfIsEditing()) {
      setProcedure({});
    }
  };

  const verifyIfIsEditing = () => {
    return registeredProcedures.some(procedure => procedure.isInView === true);
  };

  const goNextPage = () => {
    updateProcedureInView(-1);
    if (verifyInformationToGo()) {
      navigate.navigate('SignupPartners');
      setErrorMessage('');
      setProcedure({});
    }
  };

  const saveProcedure = () => {
    setIsLoading(true);

    if (verifyInformationToGo()) {
      saveProcedures().then(
        () => {
          setIsLoading(false);
          cleanRegisteredProcedures();
          navigate.navigate('Procedures');
          setErrorMessage('');
          setProcedure({});
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
    updateProcedure(procedure).then(
      async () => {
        setIsLoading(false);
        navigate.navigate('Procedures');
        setErrorMessage('');
        setProcedure({});
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const deleteProcedures = () => {
    setIsLoading(true);
    deleteProcedure(procedure).then(
      () => {
        setIsLoading(false);
        navigate.navigate('Procedures');
        setErrorMessage('');
        setProcedure({});
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
    }
    setIsLoading(false);
    return ableToGo;
  };

  const verifyInformation = () => {
    let ableToGo = true;
    let errorMessage = '';

    if (
      procedure === {} ||
      procedure.name === undefined ||
      procedure.name === '' ||
      procedure.time === undefined ||
      procedure.time === '' ||
      procedure.price === undefined ||
      procedure.price === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessages.procedureMessage;
    } else if (
      (procedure.percentage === undefined || procedure.percentage === '') &&
      (procedure.fixedValue === undefined || procedure.fixedValue === '')
    ) {
      ableToGo = false;
      errorMessage = errorMessages.commissionMessage;
    } else {
      const procedureValue = parseFloat(
        procedure.price !== 0 ? procedure.price.replace('$', '') : 0,
      );
      const commissionValue = parseFloat(
        procedure.fixedValue !== 0 ? procedure.fixedValue.replace('$', '') : 0,
      );
      if (commissionValue > procedureValue) {
        errorMessage = errorMessages.commissionMismatchMessage;
        ableToGo = false;
      }
    }

    setErrorMessage(errorMessage);
    return ableToGo;
  };

  const loadBoxInformation = () =>
    registeredProcedures?.map((procedure, index) => (
      <S.BoxContent
        onPress={() => handleProcedure(procedure, index)}
        key={index}>
        <S.BoxText isInView={procedure.isInView}>{procedure.name}</S.BoxText>
      </S.BoxContent>
    ));

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContent isSigningUp={isSigningUp}>
          <BackButton
            positionTop={isSigningUp ? '30px' : '40px'}
            positionLeft={isSigningUp ? '25px' : '-60px'}
            buttonColor={`${global.colors.purpleColor}`}
            onPress={() => goBack()}
          />
          <S.HeaderTitle>{pageTitle}</S.HeaderTitle>
          {pageDescription && (
            <S.HeaderText>
              Cadastre os procedimentos realizados em seu estabelecimento.
              {'\n'}
              Se precisar, você poderá mudar ou adicionar detalhes depois
            </S.HeaderText>
          )}
        </S.HeaderContent>
        <S.BodyContent isSigningUp={isSigningUp}>
          <Input
            handleChange={handleChange}
            name={'name'}
            placeholder={'Nome*'}
            value={procedure.name}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask="none"
          />

          <Input
            handleChange={handleChange}
            name={'time'}
            placeholder={'Hora: minutos*'}
            value={procedure.time}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'9:99'}
          />

          <Input
            handleChange={handleChange}
            name={'price'}
            placeholder={'Preço*'}
            value={procedure.price}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            type={'currency'}
            options={{
              prefix: '$',
              decimalSeparator: '.',
              groupSeparator: ',',
              precision: 2,
            }}
          />

          <S.ClientInformationContent>
            <S.InformationContent isEditing={isEditing}>
              <S.CheckboxContent>
                <BouncyCheckbox
                  isChecked={procedure.isPercentage}
                  onPress={isChecked =>
                    handleChange(!procedure.isPercentage, '', 'percentage')
                  }
                  fillColor={`${global.colors.purpleColor}`}
                  disableBuiltInState={true}
                  disableText={true}
                />
                <Input
                  handleChange={(text, rawText, name) =>
                    handleChange(text, rawText, name)
                  }
                  name={'percentage'}
                  placeholder={'%'}
                  value={procedure.percentage}
                  width={'73%'}
                  keyboard={'numeric'}
                  isSecureTextEntry={false}
                  fontSize={18}
                  disabled={false}
                  type={'currency'}
                  options={{
                    prefix: '%',
                    decimalSeparator: '.',
                    groupSeparator: ',',
                    precision: 2,
                  }}
                />
              </S.CheckboxContent>
              <S.CheckboxContent>
                <BouncyCheckbox
                  style={{borderColor: global.colors.purpleColor}}
                  isChecked={procedure.isFixedValue}
                  onPress={isChecked =>
                    handleChange(!procedure.isFixedValue, '', 'fixedValue')
                  }
                  fillColor={`${global.colors.purpleColor}`}
                  disableBuiltInState={true}
                  disableText={true}
                />
                <Input
                  handleChange={(text, rawText, name) =>
                    handleChange(text, rawText, name)
                  }
                  name={'fixedValue'}
                  placeholder={'R$'}
                  value={procedure.fixedValue}
                  width={'73%'}
                  keyboard={'numeric'}
                  isSecureTextEntry={false}
                  fontSize={18}
                  disabled={false}
                  type={'currency'}
                  options={{
                    prefix: '$',
                    decimalSeparator: '.',
                    groupSeparator: ',',
                    precision: 2,
                  }}
                />
              </S.CheckboxContent>
            </S.InformationContent>
            {!isEditing && (
              <S.RegisteredProceduresContent>
                <S.RegisteredProceduresBoxTitle>
                  Já Cadastrados
                </S.RegisteredProceduresBoxTitle>
                <S.RegisteredProceduresBox>
                  {loadBoxInformation()}
                </S.RegisteredProceduresBox>
              </S.RegisteredProceduresContent>
            )}
          </S.ClientInformationContent>
        </S.BodyContent>
        <S.FooterContent>
          <S.AddButtonContent>
            {errorMessage !== '' && (
              <ErrorMessage
                text={errorMessage}
                width={'70%'}
                textColor={`${global.colors.purpleColor}`}
              />
            )}

            {isLoading && (
              <S.LoadingContent>
                <ActivityIndicator
                  size="large"
                  color={global.colors.purpleColor}
                />
              </S.LoadingContent>
            )}

            <S.ButtonsContent>
              {!isEditing && (
                <SubmitButton
                  text={procedure.isInView ? 'Editar' : 'Adicionar'}
                  onPress={() => chooseAddProcedureMethod()}
                  width={'40%'}
                  height={'30px'}
                  fontSize={'18px'}
                  buttonColor={`${global.colors.purpleColor}`}
                />
              )}

              {procedure.isInView && (
                <S.DeleteButton
                  onPress={() => {
                    deleteProcedureInView(procedure);
                    setProcedure({});
                  }}>
                  <Icon name="trash" size={17} />
                </S.DeleteButton>
              )}
            </S.ButtonsContent>
          </S.AddButtonContent>
          <S.SubmitButtonContent>
            {isSigningUp ? (
              <SubmitButton
                disabled={verifyIfIsEditing()}
                text={'Avançar'}
                onPress={() => goNextPage()}
                width={'40%'}
                height={'50px'}
                fontSize={'18px'}
                buttonColor={`${global.colors.purpleColor}`}
              />
            ) : (
              <SubmitButton
                disabled={verifyIfIsEditing()}
                text={'Salvar'}
                onPress={() =>
                  !isEditing ? saveProcedure() : updateProcedures()
                }
                width={'40%'}
                height={'50px'}
                fontSize={'18px'}
                buttonColor={`${global.colors.purpleColor}`}
              />
            )}
            {isEditing && (
              <S.DeleteButton
                onPress={() => handleModal(true, errorMessages.deleteMessage)}>
                <Icon name="trash" size={17} />
              </S.DeleteButton>
            )}
          </S.SubmitButtonContent>
        </S.FooterContent>
      </S.Content>

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
    </S.Container>
  );
};

export default ProcedureRegister;
