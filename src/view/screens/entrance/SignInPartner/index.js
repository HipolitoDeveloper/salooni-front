import React, {useContext, useState} from 'react';
import SubmitButton from '../../../components/SubmitButton';
import * as S from './styled';
import SalooniLogo from '../../../../assets/icone11-nobackground.png';
import {UserContext} from '../../../../contexts/User/UserContext';

import {useNavigation} from '@react-navigation/native';
import AlertModal from '../../../components/AlertModal';
import {ActivityIndicator} from 'react-native';
import global from '../../../../common/global';

const SignInPartner = () => {
  const {doLogin, verifyUser} = useContext(UserContext);
  const navigate = useNavigation();

  const [userData, setUserData] = useState({});
  const [isPartnerFirstAccess, setIsPartnerFirstAccess] = useState(false);
  const [isPartner, setIsPartner] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isVerifingPartner, setIsVerifyingPartner] = useState(false);

  const handleChange = (value, name) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onLogin = async () => {
    doLogin(userData).then(
      () => {
        navigate.push('SchedulingList');
      },
      error => {
        console.log(error);
      },
    );
  };

  const verifyEmail = () => {
    setIsVerifyingPartner(true);
    verifyUser(userData.email.trim()).then(
      ({isPartner, isFirstAccess}) => {
        setIsPartner(isPartner);
        setIsPartnerFirstAccess(isFirstAccess);
        console.log(isFirstAccess);
        setIsVerifyingPartner(false);
      },
      error => {
        setIsPartner(false);
        setShowAlertModal(true);
        setIsVerifyingPartner(false);
        console.log(error);
      },
    );
  };

  return (
    <S.Container>
      <S.Content>
        <S.SalooniLogo source={SalooniLogo} />
        {isPartnerFirstAccess && (
          <S.EmailMessage>
            Parece que esse é o seu primeiro acesso. Dê uma olhada no seu
            e-mail, enviamos sua senha lá!
          </S.EmailMessage>
        )}

        <S.Input
          onChangeText={value => handleChange(value, 'email')}
          onEndEditing={() => verifyEmail()}
          placeholderTextColor={'grey'}
          placeholder={'E-mail'}
          value={userData.email}
        />

        {isVerifingPartner && (
          <ActivityIndicator size="large" color={global.colors.purpleColor} />
        )}

        {isPartner && (
          <S.Input
            onChangeText={value => handleChange(value, 'password')}
            placeholderTextColor={'grey'}
            placeholder={'Senha'}
            value={userData.password}
          />
        )}

        <SubmitButton
          text={'Entrar'}
          onPress={() => onLogin()}
          width={'60%'}
          height={'50px'}
          fontSize={'18px'}
        />

        <AlertModal
          title={'Desculpe...'}
          text={'Não encontramos seu cadastro em nosso sistema de parceiros.'}
          isVisible={showAlertModal}
          onClose={() => setShowAlertModal(false)}
        />
      </S.Content>
    </S.Container>
  );
};

export default SignInPartner;
