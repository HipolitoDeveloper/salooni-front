import React, {useContext, useState} from 'react';
import * as S from './styled';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';
import {ActivityIndicator, StyleSheet} from 'react-native';
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

const PartnerRegister = () => {
  const {procedures, cleanProceduresInformation} = useContext(ProcedureContext);
  const {addPartner, partners, cleanPartnersInformation} =
    useContext(PartnerContext);
  const {doSignup, saveSignupInformation, cleanOwnerInformation} =
    useContext(UserContext);

  const [partner, setPartner] = useState({procedure: 'Nenhuma'});
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });

  const [showWarnModal, setShowWarnModal] = useState({
    isShowing: false,
    text: '',
  });

  const navigate = useNavigation();

  const handleChange = (text, rawText, name) => {
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

    if (isNavigating) navigate.push('EntranceStack');
  };

  const addNewPartner = () => {
    if (verifyInformation()) {
      addPartner(partner);
      setPartner({});
      setErrorMessage('');
    }
  };

  const saveInformations = () => {
    setIsLoadingSignup(true);
    saveSignupInformation({
      procedures: procedures,
      partners: partners,
    }).then(
      ownerData => {
        doSignup(ownerData).then(
          user => {
            handleModal(
              'showAlertModal',
              true,
              `Realize a entrada como proprietário com o usuário ${user.email}`,
            );
            setIsLoadingSignup(false);
            cleanOwnerInformation();
            cleanProceduresInformation();
            cleanPartnersInformation();
          },
          error => {
            handleModal('showWarnModal', false, ``);
            setIsLoadingSignup(false);
            setErrorMessage(errorMessages.warningMessage);
          },
        );
      },
      error => {
        console.log(error);
        setIsLoadingSignup(false);
        setErrorMessage(errorMessages.warningMessage);
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
      setPartner({});
      setErrorMessage('');
      return ableToGo;
    } else if (partners.length === 0) {
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
            mask={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}
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
            mask={
              'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS'
            }
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
            mask={'(99) 99999-9999'}
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
            mask={'99.999.999/9999-99'}
          />

          <Picker
            selectedValue={partner.procedure}
            onValueChange={itemValue => handleChange(itemValue, 'procedure')}
            style={styles.picker}
            dropdownIconColor={'black'}>
            <Picker.Item
              style={styles.itemStylePicker}
              label="Nenhuma"
              value="Nenhuma"
            />
            {procedures.map((procedure, index) => (
              <Picker.Item
                style={styles.itemStylePicker}
                label={`${procedure.name}`}
                value={procedure}
                key={index}
              />
            ))}
          </Picker>
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
