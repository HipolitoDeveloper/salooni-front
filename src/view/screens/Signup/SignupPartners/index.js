import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {PartnerContext} from '../../../../contexts/Partner/PartnerContext';
import {ProcedureContext} from '../../../../contexts/Procedure/ProcedureContext';
import global from '../../../../common/global';
import ErrorMessage from '../../../components/ErrorMessage';
import {UserContext} from '../../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import AlertModal from '../../../components/AlertModal';
import errorMessages from '../../../../common/errorMessages';
import BackButton from '../../../components/BackButton';
import {xorBy} from 'lodash';

import SelectBox from 'react-native-multi-selectbox';
import MultipleSelect from '../../../components/MultipleSelect';

const PartnerRegister = () => {
  const {
    registeredProcedures,
    cleanProceduresInformation,
    cleanRegisteredProcedures,
  } = useContext(ProcedureContext);
  const {addPartner, registeredPartners, cleanPartnersInformation} =
    useContext(PartnerContext);
  const {doSignup, saveSignupInformation, cleanOwnerInformation} =
    useContext(UserContext);

  const [partner, setPartner] = useState({procedures: []});
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);

  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });

  const [showWarnModal, setShowWarnModal] = useState({
    isShowing: false,
    text: '',
  });

  const navigate = useNavigation();

  const handleChange = (text, name) => {
    setPartner({
      ...partner,
      [name]: text,
    });
  };

  const handleModal = (name, isShowing, text, isNavigating) => {
    if (name === 'showAlertModal') {
      setShowAlertModal({isShowing: isShowing, text: text});
    } else {
      setShowWarnModal({isShowing: isShowing, text: text});
    }

    if (isNavigating) navigate.navigate('EntranceStack');
  };

  const handleMultiSelect = item => {
    let selectedItem = xorBy(partner.procedures, [item], 'name');

    setPartner({
      ...partner,
      ['procedures']: selectedItem,
    });
  };

  const addNewPartner = () => {
    if (verifyInformation()) {
      addPartner(partner);
      setPartner({procedures: []});
      setErrorMessage('');
    }
  };

  const saveInformations = () => {
    setIsLoadingSignup(true);
    saveSignupInformation({
      procedures: registeredProcedures,
      partners: registeredPartners,
    }).then(
      ownerData => {
        doSignup(ownerData, '').then(
          user => {
            setIsLoadingSignup(false);
            cleanRegisteredProcedures();
            cleanProceduresInformation();
            cleanOwnerInformation();
            cleanPartnersInformation();
            handleModal(
              'showAlertModal',
              true,
              `Realize a entrada como proprietário com o usuário ${user.email}`,
            );
          },
          error => {
            handleModal('showWarnModal', false, ``);
            setIsLoadingSignup(false);
            setErrorMessage(errorMessages.salonWarningMessage);
          },
        );
      },
      error => {
        console.log(error);
        setIsLoadingSignup(false);
        setErrorMessage(errorMessages.userWarningMessage);
      },
    );
  };

  const goWithPartners = () => {
    if (verifyInformationToGo()) {
      saveInformations();
    }
  };

  const goWithoutPartners = () => {
    handleModal('showWarnModal', false, '');
    saveInformations();
  };

  const verifyInformation = () => {
    let ableToGo = true;
    let errorMessage = '';

    if (
      partner === {} ||
      partner.name === undefined ||
      partner.name === '' ||
      partner.tel === undefined ||
      partner.tel === '' ||
      partner.email === undefined ||
      partner.email === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessages.partnerMessage;
    }

    setErrorMessage(errorMessage);

    return ableToGo;
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;
    let errorMessage = '';

    if (Object.keys(partner).length >= 3) {
      addPartner(partner);
      setPartner({procedures: []});
      setErrorMessage('');
      return ableToGo;
    } else if (registeredPartners.length === 0) {
      handleModal('showWarnModal', true, errorMessages.noPartnerMessage);
      ableToGo = false;
    }

    setErrorMessage(errorMessage);
    return ableToGo;
  };

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContainer>
          <BackButton
            positionTop={'35px'}
            buttonColor={`${global.colors.purpleColor}`}
            onPress={navigate.goBack}
          />
          <S.HeaderContent>
            <S.HeaderTitle>Parceiros</S.HeaderTitle>
            <S.HeaderText>
              Adicione os parceiros do seu Salão.
              {'\n'}
              Depois disso você poderá usar o Salooni tranquilamente
            </S.HeaderText>
          </S.HeaderContent>
        </S.HeaderContainer>
        <S.BodyContent>
          <Input
            handleChange={handleChange}
            name={'name'}
            placeholder={'Nome'}
            value={partner.name}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask="none"
          />

          <Input
            handleChange={handleChange}
            name={'email'}
            placeholder={'E-mail'}
            value={partner.email}
            width={'80%'}
            keyboard={'email-address'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask="none"
          />

          <Input
            handleChange={handleChange}
            name={'tel'}
            placeholder={'Celular'}
            value={partner.tel}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'phone'}
          />

          <Input
            handleChange={handleChange}
            name={'cnpj'}
            placeholder={'CNPJ (Opcional)'}
            value={partner.cnpj}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'cnpj'}
          />

          {/*<Picker*/}
          {/*  selectedValue={partner.procedure}*/}
          {/*  onValueChange={itemValue => handleChange(itemValue, 'procedure')}*/}
          {/*  style={styles.picker}*/}
          {/*  dropdownIconColor={'black'}>*/}
          {/*  <Picker.Item*/}
          {/*    style={styles.itemStylePicker}*/}
          {/*    label="Nenhuma"*/}
          {/*    value="Nenhuma"*/}
          {/*  />*/}
          {/*  {procedures.map((procedure, index) => (*/}
          {/*    <Picker.Item*/}
          {/*      style={styles.itemStylePicker}*/}
          {/*      label={`${procedure.name}`}*/}
          {/*      value={procedure}*/}
          {/*      key={index}*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*</Picker>*/}
          <View
            style={{
              width: '80%',
            }}>
            <MultipleSelect
              iconColor={global.colors.purpleColor}
              plusIconColor={global.colors.purpleColor}
              modalHeaderText={'Escolha os procedimentos'}
              options={registeredProcedures}
              selectTextColor={'black'}
              selectedItemBorderColor={global.colors.purpleColor}
              value={partner.procedures}
              handleMultiSelect={handleMultiSelect}
            />
            {/*<SelectBox*/}
            {/*  options={registeredProcedures}*/}
            {/*  selectedValues={partner.procedures}*/}
            {/*  onMultiSelect={handleMultiSelect}*/}
            {/*  onTapClose={handleMultiSelect}*/}
            {/*  isMulti*/}
            {/*/>*/}
          </View>
        </S.BodyContent>
        <S.FooterContent>
          {errorMessage !== '' && (
            <ErrorMessage
              text={errorMessage}
              width={'70%'}
              textColor={`${global.colors.purpleColor}`}
            />
          )}

          {isLoadingSignup && (
            <S.LoadingContent>
              <ActivityIndicator
                size="large"
                color={global.colors.purpleColor}
              />
            </S.LoadingContent>
          )}
          <S.AddButtonContent>
            <SubmitButton
              text={'Adicionar'}
              onPress={() => addNewPartner()}
              width={'40%'}
              height={'30px'}
              fontSize={'18px'}
              buttonColor={`${global.colors.purpleColor}`}
            />
          </S.AddButtonContent>
          <S.SubmitButtonContent>
            <SubmitButton
              text={'Avançar'}
              onPress={() => goWithPartners()}
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
          handleModal('showAlertModal', '', false, true);
        }}
        title={'O cadastro foi concluído.'}
      />

      <AlertModal
        text={showWarnModal.text}
        isVisible={showWarnModal.isShowing}
        onClose={() => handleModal('showWarnModal', false, '')}
        onOk={() => {
          goWithoutPartners(false);
        }}
        title={'Atenção'}
      />
    </S.Container>
  );
};
export default PartnerRegister;

const styles = StyleSheet.create({
  picker: {
    height: 20,
    width: '89%',
    color: 'black',
    // position: 'absolute',
    // right: 90,
  },
  itemStylePicker: {
    backgroundColor: `${global.colors.lightGreyColor}`,
    color: `${global.colors.purpleColor}`,
  },
});
