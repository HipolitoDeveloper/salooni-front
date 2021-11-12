import React, {useContext, useEffect, useRef, useState} from 'react';
import * as S from './styled';
import Input from '../../../components/small/Input';
import SubmitButton from '../../../components/small/SubmitButton';
import global from '../../../../common/global';
import ErrorMessage from '../../../components/small/ErrorMessage';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import errorMessages from '../../../../common/errorMessages';
import AlertModal from '../../../components/small/AlertModal';
import {ActivityIndicator, View} from 'react-native';
import BackButton from '../../../components/small/BackButton';
import {UserContext} from '../../../../contexts/User/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PartnerContext} from '../../../../contexts/Partner/PartnerContext';
import {xorBy} from 'lodash';
import {ProcedureContext} from '../../../../contexts/Procedure/ProcedureContext';
import MultipleSelect from '../../../components/small/MultipleSelect';
import RegisterComponent from '../RegisterComponent';
import SignupComponent from '../SignupComponent';
import Loading from '../../small/Loading';
import {noProceduresText} from './styled';
import {
  CNPJVerifier,
  CPFVerifier,
  EMAILVerifier,
  TELVerifier,
} from '../../small/Input/verifier';

const PartnerForm = ({route, goBack, isSigningUp, color}) => {
  const {procedures, registeredProcedures} = useContext(ProcedureContext);

  const {
    addPartner,
    editPartner,
    registeredPartners,
    savePartner,
    cleanPartnersInformation,
    updatePartnerInView,
    updatePartner,
    deletePartner,
    deletePartnerInView,
  } = useContext(PartnerContext);

  const {currentUser} = useContext(UserContext);

  const [partner, setPartner] = useState({
    procedures: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
    method: () => {},
  });

  const navigate = useNavigation();
  const isFocused = useIsFocused();
  navigate.addListener('focus', async () => {
    if (!isSigningUp) {
      const partnerInView = route.params?.partner;

      if (Object.keys(partnerInView).length !== 0) {
        setPartner({
          ...partnerInView,
          procedureListWithoutChanges: partnerInView.procedures,
        });
        setIsEditing(true);
      }
    }
  });

  useEffect(() => {
    registeredPartners.forEach(partner => (partner.isInView = false));
  }, []);

  const clearPartner = () => {
    setPartner({procedures: []});
  };

  const handleChange = (text, name) => {
    setPartner({
      ...partner,
      [name]: text,
    });
  };

  const handleMultiSelect = item => {
    let selectedItem = xorBy(partner.procedures, [item], 'name');

    setPartner({
      ...partner,
      ['procedures']: selectedItem,
    });
  };

  const handleModal = (isShowing, text, method) => {
    setShowAlertModal({isShowing: isShowing, text: text, method: method});
  };

  const chooseAddPartnerMethod = async () => {
    const {isInView, indexInView} = {...partner};

    if (verifyInformation(true) && isInView) {
      partner.isInView = false;
      editPartner({partner: partner, index: indexInView});
      setErrorMessage('');
      clearPartner();
    }

    if (verifyInformation(true) && !isInView) {
      if (!isSigningUp) partner.salonId = currentUser.idSalon;
      addPartner(partner);
      setErrorMessage('');
      clearPartner();
    }
  };

  const handlePartner = (partner, index) => {
    updatePartnerInView(index);
    partner.isInView = !partner.isInView;
    partner.indexInView = index;

    setPartner(partner);

    if (!verifyIfIsPreRegisteredEditing()) {
      clearPartner();
    }
  };

  const verifyIfIsPreRegisteredEditing = () => {
    return registeredPartners.some(partner => partner.isInView === true);
  };

  const savePartners = () => {
    setIsLoading(true);

    if (verifyInformationToGo()) {
      savePartner().then(
        () => {
          setTimeout(() => {
            setIsLoading(false);
            navigate.push('TabStack', {screen: 'Partners'});
            clearPartner();

            cleanPartnersInformation();
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

  const updatePartners = () => {
    setIsLoading(true);
    updatePartner(partner).then(
      () => {
        setTimeout(() => {
          setIsLoading(false);
          navigate.push('TabStack', {screen: 'Partners'});
          clearPartner();
        }, 500);

        setErrorMessage('');
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const cancelEditing = () => {
    updatePartnerInView(-1);
    clearPartner();
  };

  const deletePreRegisteredItem = partner => {
    deletePartnerInView(partner);
    clearPartner();
  };

  const deletePartners = () => {
    setIsLoading(true);
    deletePartner(partner).then(
      () => {
        setIsLoading(false);
        navigate.navigate('Partners');
        setErrorMessage('');
        clearPartner();
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;
    if (Object.keys(partner).length >= 3) {
      addPartner(partner);
      setPartner({procedures: []});
      setErrorMessage('');
      return ableToGo;
    } else if (registeredPartners.length === 0) {
      ableToGo = false;

      setErrorMessage(
        isSigningUp
          ? errorMessages.noPartnerSignupMessage
          : errorMessages.noPartnerMessage,
      );
      setIsLoading(false);
    }
    return ableToGo;
  };

  const verifyInformation = showErrorMessages => {
    let ableToGo = true;
    let errorMessage = '';

    if (
      partner === {} ||
      partner.name === undefined ||
      partner.name === '' ||
      partner.email === undefined ||
      partner.email === '' ||
      partner.tel === undefined ||
      partner.tel === '' ||
      partner.tel === undefined ||
      partner.tel === '' ||
      partner.email === undefined ||
      partner.email === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessages.partnerMessage;
      if (showErrorMessages) setIsLoading(false);
    } else {
      if (!TELVerifier(partner.tel).state) {
        ableToGo = false;
        errorMessage = errorMessages.invalidTel;
        if (showErrorMessages) setIsLoading(false);
      }

      if (!EMAILVerifier(partner.email).state) {
        ableToGo = false;
        errorMessage = errorMessages.invalidEmail;
        if (showErrorMessages) setIsLoading(false);
      }
    }

    if (
      partner.cnpj !== '' &&
      partner.cnpj !== undefined &&
      !CNPJVerifier(partner.cnpj).state
    ) {
      ableToGo = false;
      errorMessage = errorMessages.invalidCNPJ;
      if (showErrorMessages) setIsLoading(false);
    }

    if (showErrorMessages) setErrorMessage(errorMessage);
    return ableToGo;
  };

  const clearProcedures = () => {
    setPartner({...partner, procedures: []});
  };

  const renderChildren = () => (
    <>
      {errorMessage !== '' && (
        <ErrorMessage text={errorMessage} width={'70%'} textColor={color} />
      )}

      <Loading isLoading={isLoading} color={color} />

      <S.BodyContent>
        <Input
          handleChange={handleChange}
          name={'name'}
          placeholder={'Nome do Parceiro'}
          value={partner.name}
          width={'80%'}
          keyboard={'default'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={false}
          isToValidate={isFocused}
          noEmpty={true}
          color={color}
          label={'Nome*'}
        />

        <Input
          handleChange={handleChange}
          name={'email'}
          placeholder={'E-mail'}
          value={partner.email}
          width={'80%'}
          keyboard={'email-address'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={false}
          mask="email"
          isToValidate={isFocused}
          noEmpty={true}
          color={color}
          label={'E-mail*'}
        />

        <Input
          handleChange={handleChange}
          name={'tel'}
          placeholder={'Celular do Parceiro'}
          value={partner.tel}
          width={'80%'}
          keyboard={'numeric'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={false}
          mask={'phone'}
          isToValidate={isFocused}
          noEmpty={true}
          color={color}
          label={'Celular*'}
        />

        <Input
          handleChange={handleChange}
          name={'cnpj'}
          placeholder={'CNPJ do Parceiro'}
          value={partner.cnpj}
          width={'80%'}
          keyboard={'numeric'}
          isSecureTextEntry={false}
          fontSize={18}
          disabled={false}
          mask={'cnpj'}
          isToValidate={isFocused}
          noEmpty={false}
          color={color}
          label={'CNPJ'}
        />

        <View
          style={{
            width: '80%',
            marginTop: 20,
          }}>
          {isFocused ? (
            <MultipleSelect
              iconColor={color}
              plusIconColor={color}
              modalHeaderText={'Escolha os procedimentos'}
              options={isSigningUp ? registeredProcedures : procedures}
              selectTextColor={'black'}
              selectedItemBorderColor={color}
              value={partner.procedures}
              handleMultiSelect={handleMultiSelect}
              navigate={navigate}
              inputText={'Procedimentos'}
              clearValue={clearProcedures}
            />
          ) : (
            <S.noProceduresText>
              Você ainda não adicionou procedimentos.
            </S.noProceduresText>
          )}
        </View>
      </S.BodyContent>

      <AlertModal
        text={showAlertModal.text}
        isVisible={showAlertModal.isShowing}
        onClose={() => {
          handleModal(false, '', false);
        }}
        onOk={() => {
          deletePartners(partner);
        }}
        title={'Atenção.'}
      />
      <AlertModal
        text={showAlertModal.text}
        isVisible={showAlertModal.isShowing}
        onClose={() => handleModal(false, '', null)}
        onOk={showAlertModal.method}
        title={'Atenção'}
      />
    </>
  );

  return (
    <RegisterComponent
      validForm={() => verifyInformation(false)}
      isSigningUp={isSigningUp}
      onCancel={goBack}
      color={color}
      preRegisteredItems={registeredPartners}
      handleSelect={handlePartner}
      deletePreRegisteredItem={deletePreRegisteredItem}
      onConfirm={isEditing ? updatePartners : savePartners}
      isEditing={isEditing}
      isPreRegisteredEditing={verifyIfIsPreRegisteredEditing()}
      cancelEditing={cancelEditing}
      onAdd={chooseAddPartnerMethod}
      registeredItemRightInformation={'procedures'}
      headerTitle={'Parceiros'}>
      {renderChildren()}
    </RegisterComponent>
  );
};

export default PartnerForm;
