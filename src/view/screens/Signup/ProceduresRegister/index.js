import React, {useContext, useState} from 'react';
import * as S from './styled';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import global from '../../../../common/global';
import {PartnerContext} from '../../../../contexts/Partner/PartnerContext';
import ErrorMessage from '../../../components/ErrorMessage';
import {useNavigation} from '@react-navigation/native';
import {ProcedureContext} from '../../../../contexts/Procedure/ProcedureContext';
import errorMessages from '../../../../common/errorMessages';
import AlertModal from '../../../components/AlertModal';
import BackButton from '../../../components/BackButton';

const ProceduresRegister = () => {
  const [procedure, setProcedure] = useState({commission: {}});
  const {addProcedure, procedures, updateProcedures, editProcedure} =
    useContext(ProcedureContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });

  const navigate = useNavigation();

  const handleChange = (text, rawText, name) => {
    if (name === 'percentage') {
      delete procedure.isFixedValue;
      delete procedure.fixed_value;

      procedure.commission = {value: text, type: name};
      setProcedure({
        ...procedure,
        ['isPercentage']: !!text,
        [name]: text,
      });
    } else if (name === 'fixed_value') {
      delete procedure.isPercentage;
      delete procedure.percentage;
      procedure.commission = {value: text, type: name};
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
    updateProcedures(index);
    procedure.isInView = !procedure.isInView;
    procedure.indexInView = index;

    procedure.fixed_value = procedure.commission.percentage
      ? procedure.commission.percentage
      : null;
    procedure.isFixedValue = !!procedure.commission.percentage;
    procedure.percentage = procedure.commission.value
      ? procedure.commission.value
      : null;
    procedure.isPercentage = !!procedure.commission.value;

    setProcedure(procedure);

    if (!verifyIfIsEditing()) {
      setProcedure({commission: {}});
    }
  };

  const verifyIfIsEditing = () => {
    return procedures.some(procedure => procedure.isInView === true);
  };

  const handleModal = (isShowing, text, isNavigating) => {
    setShowAlertModal({isShowing: isShowing, text: text});

    if (isNavigating) {
      navigate.push('PartnerRegister');
    }
  };

  const chooseAddProcedureMethod = () => {
    const {isInView, indexInView} = {...procedure};
    if (verifyInformation() && isInView) {
      procedure.isInView = false;
      editProcedure({procedure: procedure, index: indexInView});

      setErrorMessage('');
      setProcedure({commission: {}});
    }

    if (verifyInformation() && !isInView) {
      addProcedure(procedure);
      setErrorMessage('');
      setProcedure({commission: {}});
    }
  };

  const goNextPage = () => {
    updateProcedures(-1);
    if (verifyInformationToGo()) {
      navigate.push('PartnerRegister');
      setErrorMessage('');
      setProcedure({commission: {}});
    }
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;
    let errorMessage = '';
    if (Object.keys(procedure).length === 6) {
      addProcedure(procedure);
      return ableToGo;
    } else if (procedures.length === 0) {
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
    } else if (Object.keys(procedure.commission).length === 0) {
      ableToGo = false;
      errorMessage = errorMessages.commissionMessage;
    } else if (
      (procedure.commission.percentage === undefined ||
        procedure.commission.percentage === '') &&
      (procedure.commission.value === undefined ||
        procedure.commission.value === '')
    ) {
      ableToGo = false;
      errorMessage = errorMessages.commissionMessage;
    }

    setErrorMessage(errorMessage);
    return ableToGo;
  };

  const loadBoxInformation = () =>
    procedures.map((procedure, index) => (
      <S.BoxContent
        onPress={() => handleProcedure(procedure, index)}
        key={index}>
        <S.BoxText isInView={procedure.isInView}>{procedure.name} - </S.BoxText>
        <S.BoxText isInView={procedure.isInView}>
          {procedure.time} minutos
        </S.BoxText>
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
            mask={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}
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
            mask={'00:99'}
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
                mask={'R$999,99'}
              />

              <S.CheckboxContent>
                <BouncyCheckbox
                  isChecked={procedure.isPercentage}
                  onPress={isChecked => handleChange(isChecked, 'isPercentage')}
                  fillColor={`${global.colors.purpleColor}`}
                  disableBuiltInState={true}
                  disableText={true}
                />

                <Input
                  handleChange={handleChange}
                  name={'percentage'}
                  placeholder={'%'}
                  value={procedure.percentage}
                  width={'73%'}
                  keyboard={'numeric'}
                  isSecureTextEntry={false}
                  fontSize={18}
                  disabled={false}
                  mask={'%999'}
                />
              </S.CheckboxContent>
              <S.CheckboxContent>
                <BouncyCheckbox
                  isChecked={procedure.isFixedValue}
                  onPress={isChecked => handleChange(isChecked, 'isFixedValue')}
                  fillColor={`${global.colors.purpleColor}`}
                  disableBuiltInState={true}
                  disableText={true}
                />

                <Input
                  handleChange={handleChange}
                  name={'fixed_value'}
                  placeholder={'R$'}
                  value={procedure.fixed_value}
                  width={'73%'}
                  keyboard={'numeric'}
                  isSecureTextEntry={false}
                  fontSize={18}
                  disabled={false}
                  mask={'R$999,99'}
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
            <SubmitButton
              text={procedure.isInView ? 'Editar' : 'Adicionar'}
              onPress={() => chooseAddProcedureMethod()}
              width={'40%'}
              height={'30px'}
              fontSize={'18px'}
              buttonColor={`${global.colors.purpleColor}`}
            />
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
