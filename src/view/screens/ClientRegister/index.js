import React, {useContext, useState} from 'react';
import * as S from './styled';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import global from '../../../common/global';
import ErrorMessage from '../../components/ErrorMessage';
import {useNavigation} from '@react-navigation/native';
import {ClientContext} from '../../../contexts/Client/ClientContext';
import errorMessages from '../../../common/errorMessages';
import AlertModal from '../../components/AlertModal';
import {ClientInformationContent, InformationContent} from './styled';
import {ActivityIndicator} from 'react-native';

const ClientRegister = () => {
  const [client, setClient] = useState({});
  const {addClient, registeredClients, saveClients, cleanRegisteredClients} =
    useContext(ClientContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });
  const navigate = useNavigation();

  const handleChange = (value, name) => {
    setClient({
      ...client,
      [name]: value,
    });
  };

  const handleModal = (isShowing, text, isNavigating) => {
    setShowAlertModal({isShowing: isShowing, text: text});

    if (isNavigating) {
      navigate.push('PartnerRegister');
    }
  };

  const addNewClient = () => {
    if (verifyInformation()) {
      addClient(client);
      setErrorMessage('');
      setClient({});
    }
  };

  const saveClient = () => {
    setIsLoading(true);
    if (verifyInformationToGo()) {
      saveClients().then(
        () => {
          setIsLoading(false);
          cleanRegisteredClients();
          navigate.push('Client');
          setErrorMessage('');
          setClient({});
        },
        error => {
          setIsLoading(false);
          console.log(error);
        },
      );
    }
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;

    if (Object.keys(client).length === 5) {
      addClient(client);
      return ableToGo;
    } else if (registeredClients.length === 0) {
      ableToGo = false;

      setErrorMessage(errorMessages.noClientMessage);
    }
    setIsLoading(false);
    return ableToGo;
  };

  const verifyInformation = () => {
    let ableToGo = true;
    let errorMessage = '';

    if (
      client === {} ||
      client.name === undefined ||
      client.name === '' ||
      client.email === undefined ||
      client.email === '' ||
      client.cpf === undefined ||
      client.cpf === '' ||
      client.tel === undefined ||
      client.tel === '' ||
      client.born_date === undefined ||
      client.born_date === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessages.clientMessage;
    }

    setErrorMessage(errorMessage);
    return ableToGo;
  };

  const loadBoxInformation = () =>
    registeredClients.map((client, index) => (
      <S.BoxContent key={index}>
        <S.BoxText>{client.name} - </S.BoxText>
        <S.BoxText>{client.time} minutos</S.BoxText>
      </S.BoxContent>
    ));

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContent>
          <S.HeaderTitle>Clientes</S.HeaderTitle>
        </S.HeaderContent>
        <S.BodyContent>
          <Input
            handleChange={handleChange}
            name={'name'}
            placeholder={'Nome'}
            value={client.name}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
            fontSize={'18px'}
            disabled={false}
          />

          <Input
            handleChange={handleChange}
            name={'email'}
            placeholder={'E-mail'}
            value={client.email}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
            fontSize={'18px'}
            disabled={false}
          />

          <Input
            handleChange={handleChange}
            name={'cpf'}
            placeholder={'CPF'}
            value={client.cpf}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={'18px'}
            disabled={false}
          />

          <S.ClientInformationContent>
            <S.InformationContent>
              <Input
                handleChange={handleChange}
                name={'tel'}
                placeholder={'Telefone'}
                value={client.tel}
                width={'85%'}
                keyboard={'numeric'}
                isSecureTextEntry={false}
                fontSize={'18px'}
                disabled={false}
              />

              <Input
                handleChange={handleChange}
                name={'born_date'}
                placeholder={'Data de Nascimento'}
                value={client.born_date}
                width={'85%'}
                keyboard={'numeric'}
                isSecureTextEntry={false}
                fontSize={'18px'}
                disabled={false}
              />
            </S.InformationContent>

            <S.RegisteredProceduresContent>
              <S.RegisteredProceduresBoxTitle>
                Já Cadastrados
              </S.RegisteredProceduresBoxTitle>
              <S.RegisteredProceduresBox>
                {loadBoxInformation()}
              </S.RegisteredProceduresBox>
            </S.RegisteredProceduresContent>
          </S.ClientInformationContent>
        </S.BodyContent>
        <S.FooterContent>
          <S.AddButtonContent>
            {errorMessage !== '' && (
              <ErrorMessage
                text={errorMessage}
                width={'70%'}
                textColor={`${global.colors.blueColor}`}
              />
            )}

            {isLoading && (
              <S.LoadingContent>
                <ActivityIndicator
                  size="large"
                  color={global.colors.blueColor}
                />
              </S.LoadingContent>
            )}
            <SubmitButton
              text={'Adicionar'}
              onPress={() => addNewClient()}
              width={'40%'}
              height={'30px'}
              fontSize={'18px'}
              buttonColor={`${global.colors.blueColor}`}
            />
          </S.AddButtonContent>
          <S.SubmitButtonContent>
            <SubmitButton
              text={'Avançar'}
              onPress={() => saveClient()}
              width={'40%'}
              height={'50px'}
              fontSize={'18px'}
              buttonColor={`${global.colors.blueColor}`}
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

export default ClientRegister;
