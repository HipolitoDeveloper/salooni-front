import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import global from '../../../../../common/global';
import Header from '../../../../components/Header';
import {Alert, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import Calendar from '../../../../components/Calendar';
import {useNavigation} from '@react-navigation/native';
import {ScheduleContext} from '../../../../../contexts/Schedule/ScheduleContext';
import {UserContext} from '../../../../../contexts/User/UserContext';

const SchedulingCalendar = () => {
  const {loadAllSchedules, schedules} = useContext(ScheduleContext);
  const {currentUser} = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigation();
  useEffect(() => {
    setLoading(true);
    const getAllSchedules = () => {
      loadAllSchedules(currentUser.idFunc).then(
        () => setLoading(false),
        error => {
          console.log(error);
          setLoading(false);
        },
      );
      setLoading(false);
    };

    getAllSchedules();
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={async () => {
          console.log(schedules);
        }}>
        <Text>Aaaaa</Text>
      </TouchableOpacity>
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
