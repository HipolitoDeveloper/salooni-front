import React, {useContext, useEffect, useState} from 'react';
import SubmitButton from '../../../components/small/SubmitButton';
import * as S from './styled';
import SalooniLogo from '../../../../assets/icone11-nobackground.png';
import {UserContext} from '../../../../contexts/User/UserContext';
import errorMessages from '../../../../common/errorMessages';

import {useNavigation} from '@react-navigation/native';
import AlertModal from '../../../components/small/AlertModal';
import {ActivityIndicator, StyleSheet} from 'react-native';
import global from '../../../../common/global';
import {MaskedTextInput} from 'react-native-mask-text';
import ErrorMessage from '../../../components/small/ErrorMessage';
import Input from '../../../components/small/Input';
import Loading from '../../../components/small/Loading';

const SignInPartner = () => {
  const {doLogin, verifyPartner, doSignup, owner} = useContext(UserContext);
  const navigate = useNavigation();

  const [verifiedPartner, setVerifiedPartner] = useState({});
  const [userData, setUserData] = useState({});
  const [isPartnerFirstAccess, setIsPartnerFirstAccess] = useState(false);
  const [isPartner, setIsPartner] = useState(false);
  const [isAbleToSignup, setIsAbleToSignup] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    headerText: '',
    isVisible: false,
    text: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value, name) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const doPartnerLogin = () => {
    doLogin(userData).then(
      () => {
        navigate.navigate('TabStack');
      },

      error => {
        console.log(error);
      },
    );
  };

  const doPartnerSignup = () => {
    setIsLoading(true);
    if (verifyPassword()) {
      doSignup(verifiedPartner, userData).then(
        () => {
          setShowAlertModal({
            headerText: 'Parabéns!',
            isVisible: true,
            text: 'Seu cadastro foi realizado com sucesso, realize o seu primeiro acesso',
          });
          setIsPartnerFirstAccess(false);
          setVerifiedPartner({});
          setIsAbleToSignup(false);
          setUserData({});
          setIsLoading(false);
        },

        error => {
          setIsLoading(false);
          console.log(error);
        },
      );
    }
  };

  const verifyPassword = () => {
    let isAbleToSignup = false;

    if (userData.password === userData.confirmPassword) {
      isAbleToSignup = true;
      setErrorMessage('');
    } else {
      setErrorMessage(errorMessages.passwordsNotMatch);
    }

    return isAbleToSignup;
  };
  const verifyEmail = () => {
    setIsLoading(true);
    verifyPartner(userData, '').then(
      ({isPartner, isFirstAccess, verifiedPartner}) => {
        setIsPartner(isPartner);
        setIsPartnerFirstAccess(isFirstAccess);
        setVerifiedPartner(verifiedPartner);
        setIsLoading(false);

        if (!isFirstAccess) {
          setShowAlertModal({
            headerText: 'Boas notícias!',
            isVisible: true,
            text: 'Seu cadastro foi encontrado. Por favor, realize a sua entrada na aplicação.',
          });
        }
      },
      error => {
        setIsPartner(false);
        setShowAlertModal({
          headerText: 'Desculpe...',
          isVisible: true,
          text: 'Não encontramos seu cadastro em nosso sistema de parceiros.',
        });
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const verifyCNPJ = () => {
    setIsLoading(true);
    verifyPartner(userData, verifiedPartner).then(
      ({isAbleToSignup}) => {
        setIsAbleToSignup(isAbleToSignup);
        setIsLoading(false);

        if (isAbleToSignup) {
          setShowAlertModal({
            headerText: 'Boas notícias!',
            isVisible: true,
            text: 'Seu cadastro foi encontrado. Por favor, realize o seu registro na aplicação.',
          });
        }
      },
      error => {
        setIsPartner(false);
        setShowAlertModal({
          headerText: 'Desculpe...',
          isVisible: true,
          text: 'Não encontramos esse cadastro vinculado ao CNPJ informado em nosso sistema de parceiros.',
        });
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  return (
    <S.Container>
      <S.Content>
        <S.SalooniLogo source={SalooniLogo} />
        {isPartnerFirstAccess && !isAbleToSignup && (
          <S.EmailMessage>
            Parece que esse é o seu primeiro acesso. Coloque o CNPJ do seu salão
            para verificarmos seu cadastro.
          </S.EmailMessage>
        )}

        {errorMessage !== '' && (
          <ErrorMessage
            text={errorMessage}
            width={'70%'}
            textColor={`${global.colors.purpleColor}`}
          />
        )}

        <Input
          handleChange={handleChange}
          placeholderTextColor={'grey'}
          placeholder={'E-mail'}
          name={'email'}
          value={userData.email}
          width={'70%'}
          mask={'email'}
        />

        <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />

        {isPartnerFirstAccess ? (
          isAbleToSignup ? (
            <>
              <Input
                handleChange={handleChange}
                name={'password'}
                placeholder={'Senha'}
                value={userData.password}
                isSecureTextEntry={true}
                keyboard={'numeric'}
                width={'70%'}
                mask={'password'}
              />

              <Input
                handleChange={handleChange}
                name={'confirmPassword'}
                placeholder={'Confirme sua senha'}
                value={userData.confirmPassword}
                isSecureTextEntry={true}
                keyboard={'numeric'}
                width={'70%'}
                mask={'password'}
              />
            </>
          ) : (
            <Input
              handleChange={handleChange}
              name={'cnpj'}
              placeholder={'CNPJ'}
              value={userData.cnpj}
              isSecureTextEntry={false}
              mask={'cnpj'}
              keyboard={'numeric'}
              width={'70%'}
            />
          )
        ) : (
          <Input
            handleChange={handleChange}
            name={'password'}
            placeholder={'Senha'}
            value={userData.password}
            editable={isPartner}
            selectTextOnFocus={isPartner}
            isSecureTextEntry={true}
            width={'70%'}
            mask={'password'}
          />
        )}

        {isPartnerFirstAccess ? (
          <SubmitButton
            text={isAbleToSignup ? 'Cadastrar' : 'Verificar'}
            onPress={() => (isAbleToSignup ? doPartnerSignup() : verifyCNPJ())}
            width={'60%'}
            height={'50px'}
            fontSize={'18px'}
            buttonColor={`${global.colors.purpleColor}`}
          />
        ) : (
          <SubmitButton
            text={isPartner ? 'Entrar' : 'Verificar'}
            onPress={() => (isPartner ? doPartnerLogin() : verifyEmail())}
            width={'60%'}
            height={'50px'}
            fontSize={'18px'}
            buttonColor={`${global.colors.purpleColor}`}
          />
        )}

        <AlertModal
          title={showAlertModal.headerText}
          text={showAlertModal.text}
          isVisible={showAlertModal.isVisible}
          onClose={() =>
            setShowAlertModal({isVisible: false, text: '', headerText: ''})
          }
        />
      </S.Content>
    </S.Container>
  );
};

export default SignInPartner;

export const styles = StyleSheet.create({
  input: {
    fontFamily: `${global.fonts.mainFont}`,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: `${global.colors.purpleColor}`,
    color: 'black',
  },
});
