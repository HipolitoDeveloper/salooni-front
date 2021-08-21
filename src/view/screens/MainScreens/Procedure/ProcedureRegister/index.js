import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import Input from '../../../../components/Input';
import SubmitButton from '../../../../components/SubmitButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import global from '../../../../../common/global';
import ErrorMessage from '../../../../components/ErrorMessage';
import {useNavigation} from '@react-navigation/native';
import {ClientContext} from '../../../../../contexts/Client/ClientContext';
import errorMessages from '../../../../../common/errorMessages';
import AlertModal from '../../../../components/AlertModal';
import {ClientInformationContent, InformationContent} from './styled';
import {ActivityIndicator} from 'react-native';
import BackButton from '../../../../components/BackButton';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {getSalonById} from '../../../../../services/Salon';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ClientParseObjectToClientObject,
  ProcedureParseObjectToProcedureObject,
} from '../../../../../common/conversor';
import {ProcedureContext} from '../../../../../contexts/Procedure/ProcedureContext';

const ProcedureRegister = ({route}) => {
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
      navigate.navigate('Procedures');
    }
  };

  const chooseAddClientMethod = async () => {
    const {isInView, indexInView} = {...procedure};

    if (verifyInformation() && isInView) {
      procedure.isInView = false;
      editProcedure({procedure: procedure, index: indexInView});
      setErrorMessage('');
      setProcedure({});
    }

    if (verifyInformation() && !isInView) {
      procedure.IdSalaoFK = await getSalonById(currentUser.idSalon, true);
      addProcedure({
        salonId: currentUser.idSalon,
        employeeId: currentUser.idFunc,
        procedure: procedure,
        isSignup: false,
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
      setErrorMessage(errorMessages.noProcedureMessage);
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
      (procedure.fixedValue === undefined || procedure.value === '')
    ) {
      ableToGo = false;
      errorMessage = errorMessages.commissionMessage;
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
        <S.HeaderContent>
          <BackButton
            positionTop={'20px'}
            positionLeft={'-35px'}
            buttonColor={`${global.colors.purpleColor}`}
            onPress={() => navigate.navigate('Procedures')}
          />
          <S.HeaderTitle>Registro de Procedimentos</S.HeaderTitle>
        </S.HeaderContent>
        <S.BodyContent>
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
            mask={'99:99'}
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
                  onPress={() => chooseAddClientMethod()}
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
            {isEditing && (
              <S.DeleteButton onPress={() => deleteProcedures(procedure)}>
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
          handleModal('', false, false);
        }}
        onOk={() => {
          handleModal('', false, true);
        }}
        title={'Atenção.'}
      />
    </S.Container>
  );
};

export default ProcedureRegister;
