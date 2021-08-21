import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import global from '../../../../common/global';
import ErrorMessage from '../../../components/ErrorMessage';
import {useNavigation} from '@react-navigation/native';
import {ProcedureContext} from '../../../../contexts/Procedure/ProcedureContext';
import errorMessages from '../../../../common/errorMessages';
import AlertModal from '../../../components/AlertModal';
import BackButton from '../../../components/BackButton';
import Icon from 'react-native-vector-icons/Ionicons';

const ProceduresRegister = () => {
  const [procedure, setProcedure] = useState({});
  const {
    addProcedure,
    registeredProcedures,
    updateProcedureInView,
    editProcedure,
    deleteProcedureInView,
    cleanProceduresInformation,
  } = useContext(ProcedureContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });

  const navigate = useNavigation();

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

  const handleModal = (isShowing, text, isNavigating) => {
    setShowAlertModal({isShowing: isShowing, text: text});

    if (isNavigating) {
      navigate.navigate('PartnerRegister');
    }
  };

  const chooseAddProcedureMethod = () => {
    const {isInView, indexInView} = {...procedure};
    if (verifyInformation() && isInView) {
      procedure.isInView = false;
      editProcedure({procedure: procedure, index: indexInView});

      setErrorMessage('');
      setProcedure({});
    }

    if (verifyInformation() && !isInView) {
      addProcedure({procedure: procedure, isSignup: true});
      setErrorMessage('');
      setProcedure({});
    }
  };

  const goNextPage = () => {
    updateProcedureInView(-1);
    if (verifyInformationToGo()) {
      navigate.navigate('PartnerRegister');
      setErrorMessage('');
      setProcedure({});
    }
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;
    let errorMessage = '';
    if (Object.keys(procedure).length === 6) {
      addProcedure(procedure);
      return ableToGo;
    } else if (registeredProcedures.length === 0) {
      ableToGo = false;
      handleModal(true, errorMessages.noProcedureMessage);
    }

    setErrorMessage(errorMessage);
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
    registeredProcedures.map((procedure, index) => (
      <S.BoxContent
        onPress={() => handleProcedure(procedure, index)}
        key={index}>
        <S.BoxText isInView={procedure.isInView}>{procedure.name}</S.BoxText>
      </S.BoxContent>
    ));

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContainer>
          <BackButton
            positionTop={'45px'}
            buttonColor={`${global.colors.purpleColor}`}
            onPress={navigate.goBack}
          />
          <S.HeaderContent>
            <S.HeaderTitle>Procedimentos</S.HeaderTitle>
            <S.HeaderText>
              Cadastre os procedimentos realizados em seu estabelecimento.
              {'\n'}
              Se precisar, você poderá mudar ou adicionar detalhes depois
            </S.HeaderText>
          </S.HeaderContent>
        </S.HeaderContainer>
        <S.BodyContent>
          <Input
            handleChange={handleChange}
            name={'name'}
            placeholder={'Procedimento'}
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
            placeholder={'Hora: minutos'}
            value={procedure.time}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'99:99'}
          />

          <S.ProcedureInformationContent>
            <S.PriceContent>
              <Input
                handleChange={handleChange}
                name={'price'}
                placeholder={'Preço'}
                value={procedure.price}
                width={'85%'}
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
            </S.PriceContent>

            <S.RegisteredProceduresContent>
              <S.RegisteredProceduresBoxTitle>
                Já Cadastrados
              </S.RegisteredProceduresBoxTitle>
              <S.RegisteredProceduresBox>
                {loadBoxInformation()}
              </S.RegisteredProceduresBox>
            </S.RegisteredProceduresContent>
          </S.ProcedureInformationContent>
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

            <S.ButtonsContent>
              <SubmitButton
                text={procedure.isInView ? 'Editar' : 'Adicionar'}
                onPress={() => chooseAddProcedureMethod()}
                width={'40%'}
                height={'30px'}
                fontSize={'18px'}
                buttonColor={`${global.colors.purpleColor}`}
              />

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
              text={'Avançar'}
              onPress={() => goNextPage()}
              width={'40%'}
              height={'50px'}
              fontSize={'18px'}
              buttonColor={`${global.colors.purpleColor}`}
            />
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
export default ProceduresRegister;
