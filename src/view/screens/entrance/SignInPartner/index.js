import React, {useContext, useState} from 'react';
import SubmitButton from '../../../components/SubmitButton';
import * as S from './styled';
import SalooniLogo from '../../../../assets/icone11-nobackground.png';
import {UserContext} from '../../../../contexts/User/UserContext';
import errorMessages from '../../../../common/errorMessages';

import {useNavigation} from '@react-navigation/native';
import AlertModal from '../../../components/AlertModal';
import {ActivityIndicator, StyleSheet} from 'react-native';
import global from '../../../../common/global';
import {MaskedTextInput} from 'react-native-mask-text';
import ErrorMessage from '../../../components/ErrorMessage';

const SignInPartner = () => {
  const {doLogin, verifyPartner, doSignup} = useContext(UserContext);
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

  const handleChange = (value, rawValue, name) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const doPartnerLogin = () => {
    doLogin(userData).then(
      () => {
        navigate.navigate('ApplicationStack');
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

        <S.Input
          onChangeText={value => handleChange(value, '', 'email')}
          placeholderTextColor={'grey'}
          placeholder={'E-mail'}
          value={userData.email}
        />

        {isLoading && (
          <ActivityIndicator size="large" color={global.colors.purpleColor} />
        )}

        {isPartnerFirstAccess ? (
          isAbleToSignup ? (
            <>
              <S.Input
                onChangeText={value => handleChange(value, '', 'password')}
                placeholderTextColor={'grey'}
                placeholder={'Senha'}
                value={userData.password}
                secureTextEntry={true}
              />

              <S.Input
                onChangeText={value =>
                  handleChange(value, '', 'confirmPassword')
                }
                placeholderTextColor={'grey'}
                placeholder={'Confirme a senha'}
                value={userData.confirmPassword}
                secureTextEntry={true}
              />
            </>
          ) : (
            <MaskedTextInput
              mask={'99.999.999/9999-99'}
              style={[styles.input, {fontSize: 14, width: '70%'}]}
              onChangeText={(text, rawText) =>
                handleChange(text, rawText, 'CNPJ')
              }
              value={userData.CNPJ}
              keyboardType={'numeric'}
              placeholderTextColor={'grey'}
              placeholder={'CNPJ'}
              secureTextEntry={false}
              clearButtonMode={'always'}
            />
          )
        ) : (
          <S.Input
            onChangeText={value => handleChange(value, '', 'password')}
            placeholderTextColor={'grey'}
            placeholder={'Senha'}
            value={userData.password}
            editable={isPartner}
            selectTextOnFocus={isPartner}
            secureTextEntry={true}
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
    fontFamily: `${global.fonts.s}`,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: `${global.colors.purpleColor}`,
    color: 'black',
  },
});
