import React, {useContext, useState} from 'react';
import * as S from './styled';
import SalooniLogo from '../../../assets/icone11-nobackground.png';
import {UserContext} from '../../../contexts/User/UserContext';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ExitButton} from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import global from '../../../common/global';
import {ScheduleContext} from '../../../contexts/Schedule/ScheduleContext';
import {ClientContext} from '../../../contexts/Client/ClientContext';
import {PartnerContext} from '../../../contexts/Partner/PartnerContext';
export default ({state, navigation}) => {
  const {setCurrentUser} = useContext(UserContext);

  const doLogout = async () => {
    await Parse.User.logOut().then(async () => {
      setCurrentUser(false, {});
      await AsyncStorage.clear().then(() => {
        navigation.navigate('EntranceStack');
      });
    });
  };

  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <S.Container>
      <S.SalooniLogo source={SalooniLogo} />
      <ExitButton onPress={doLogout}>
        <Icon
          name={'sign-out-alt'}
          color={global.colors.purpleColor}
          size={24}
        />
      </ExitButton>
      <S.DrawerContent>
        <S.DrawerContentText
          color={state.index === 0}
          onPress={() => goTo('Clients')}>
          Clientes
        </S.DrawerContentText>
      </S.DrawerContent>
      <S.DrawerContent onPress={() => goTo('Procedures')}>
        <S.DrawerContentText color={state.index === 1}>
          Procedimentos
        </S.DrawerContentText>
      </S.DrawerContent>
      <S.DrawerContent onPress={() => goTo('Partners')}>
        <S.DrawerContentText color={state.index === 2}>
          Parceiros
        </S.DrawerContentText>
      </S.DrawerContent>
      <S.DrawerContent
        onPress={() =>
          navigation.push('ApplicationStack', {
            screen: 'SchedulingCalendar',
            params: {
              typeView: 'AGN',
            },
          })
        }>
        <S.DrawerContentText color={state.index === 3}>
          Calendário
        </S.DrawerContentText>
      </S.DrawerContent>
    </S.Container>
  );
};
