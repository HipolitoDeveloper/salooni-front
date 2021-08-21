import React, {useState} from 'react';
import * as S from './styled';
import global from '../../../../../common/global';
import Header from '../../../../components/Header';
import {Alert, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import Calendar from '../../../../components/Calendar';
import {useNavigation} from '@react-navigation/native';
const SchedulingCalendar = () => {
  const navigate = useNavigation();

  return (
    <>
      <Header
        headerColor={global.colors.blueColor}
        headerTitle={'Calendário'}
      />
      <S.Content>
        <Calendar />
      </S.Content>
    </>
  );
};

export default SchedulingCalendar;
