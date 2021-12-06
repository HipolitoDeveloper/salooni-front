import React, {useContext, useEffect, useState} from 'react';
import SubmitButton from '../../../components/small/SubmitButton';
import * as S from './styled';
import SalooniLogo from '../../../../assets/icone11-nobackground.png';
import {UserContext} from '../../../../contexts/User/UserContext';

import {useNavigation} from '@react-navigation/native';
import Input from '../../../components/small/Input';
import errorMessages from '../../../../common/errorMessages';
import ErrorMessage from '../../../components/small/ErrorMessage';
import global from '../../../../common/global';
import {ActivityIndicator, Dimensions} from 'react-native';
import Loading from '../../../components/small/Loading';

const SignInOwner = () => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const isSmallerScreen = screenHeight < 650;
  const {doLogin, verifyOwner, owner} = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: 'gabriel@gmail.com',
    password: '123Abc@',
  });
  const navigate = useNavigation();

  const handleChange = (text, name) => {
    setUserData({
      ...userData,
      [name]: text,
    });
  };

  const onLogin = () => {
    setIsLoading(true);
    verifyOwner(userData).then(
      () => {
        doLogin(userData).then(
          () => {
            navigate.navigate('TabStack');
            setErrorMessage('');
            setIsLoading(false);
          },
          error => {
            setErrorMessage(errorMessages.signinMessage);
            console.log(error);
            setIsLoading(false);
          },
        );
      },
      error => {
        setErrorMessage(errorMessages.notOwner);
        console.log(error);
        setIsLoading(false);
      },
    );
  };

  return (
    <S.Container>
      <S.Content>
        <S.SalooniLogo source={SalooniLogo} />

        <Input
          handleChange={handleChange}
          name={'email'}
          placeholder={'E-mail'}
          value={userData.email}
          width={'70%'}
          keyboard={'email-address'}
          isSecureTextEntry={false}
          fontSize={40}
          disabled={false}
          mask="email"
          validateInput={true}
          color={global.colors.purpleColor}
          label={'Usuário'}
          isToValidate={true}
          noEmpty={true}
        />

        <Input
          handleChange={handleChange}
          name={'password'}
          placeholder={'Senha'}
          value={userData.password}
          width={'70%'}
          keyboard={'default'}
          isSecureTextEntry={true}
          fontSize={40}
          disabled={false}
          mask="password"
          validateInput={false}
          color={global.colors.purpleColor}
          label={'Senha'}
          isToValidate={true}
          noEmpty={true}
        />

        <S.PasswordResetButton>
          <S.PasswordResetText screenHeight={screenHeight}>
            Esqueceu a senha?
          </S.PasswordResetText>
        </S.PasswordResetButton>

        <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />
        <SubmitButton
          text={'Entrar'}
          onPress={() => onLogin()}
          width={1.6}
          height={15}
          fontSize={30}
          buttonColor={`${global.colors.purpleColor}`}
        />
        {errorMessage !== '' && (
          <ErrorMessage
            text={errorMessage}
            width={'70%'}
            textColor={`${global.colors.purpleColor}`}
          />
        )}

        <S.RegisterContent>
          <S.RegisterText screenHeight={screenHeight}>
            Não possui cadastro?
          </S.RegisterText>
          <S.RegisterButton onPress={() => navigate.navigate('SignupStack')}>
            <S.RegisterButtonText>{''} Registre-se</S.RegisterButtonText>
          </S.RegisterButton>
        </S.RegisterContent>
      </S.Content>
    </S.Container>
  );
};

export default SignInOwner;
