import React, {useContext, useState} from 'react';
import SubmitButton from '../../../components/SubmitButton';
import * as S from './styled';
import SalooniLogo from '../../../../assets/icone11-nobackground.png';
import {UserContext} from '../../../../contexts/User/UserContext';

import {useNavigation} from '@react-navigation/native';
import Input from '../../../components/Input';

const SignInOwner = () => {
  const {doLogin} = useContext(UserContext);
  const navigate = useNavigation();

  const [userData, setUserData] = useState({});

  const handleChange = (value, name) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onLogin = async () => {
    await doLogin(userData).then(
      () => {
        navigate.push('SchedulingList');
      },
      error => {
        console.log(error);
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
        />

        <Input
          handleChange={handleChange}
          name={'password'}
          placeholder={'Senha'}
          value={userData.password}
          width={'70%'}
          keyboard={'default'}
          isSecureTextEntry={true}
        />

        <S.PasswordResetButton>
          <S.PasswordResetText>Esqueceu a senha?</S.PasswordResetText>
        </S.PasswordResetButton>
        <SubmitButton
          text={'Entrar'}
          onPress={() => onLogin()}
          width={'60%'}
          height={'50px'}
          fontSize={'18px'}
        />
        <S.RegisterContent>
          <S.RegisterText>Não possui cadastro?</S.RegisterText>
          <S.RegisterButton onPress={() => navigate.push('SignupStack')}>
            <S.RegisterButtonText>{''} Registre-se</S.RegisterButtonText>
          </S.RegisterButton>
        </S.RegisterContent>
      </S.Content>
    </S.Container>
  );
};

export default SignInOwner;
