import { useNavigation } from '@react-navigation/native';
import { reduce } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import global from '../../../../common/global';
import * as S from './styled';
import { Calendar, CalendarList } from 'react-native-calendars';

const Agenda = ({ calendarSchedule, isVisible, handleModal }) => {
  const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD')

  const navigate = useNavigation();
  const [selected, setSelected] = useState(INITIAL_DATE);

  const [months, setMonths] = useState([])
  const [items, setItems] = useState([]);

  useEffect(() => {

  }, []);


  const events = {
    '12-12-2021':
      [{
        clientName: 'Gabriel',
        clientTel: '11 999725949',
        formattedHour: '09:10',
        passedHour: true,
        nextHour: false,
      },
      {
        clientName: 'Gabriel',
        clientTel: '11 999725949',
        formattedHour: '09:10',
        passedHour: true,
        nextHour: false,
      }

      ]
  }

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  const monthNamesShort = [
    'Jan.',
    'Fev.',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul.',
    'Out',
    'Set.',
    'Out.',
    'Nov.',
    'Dec.',
  ]

  const dayNames = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S',
  ]

  const onDayPress = day => {
    setSelected(day.dateString);
  };

  return (
    <>

      <Calendar
        onDayPress={onDayPress}
        current={INITIAL_DATE}
        minDate={INITIAL_DATE}
        enableSwipeMonths
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
            selectedTextColor: 'red'
          },
          '2021-12-30': { marked: true, dotColor: '#50cebb' },
          '2022-05-16': { marked: true, dotColor: '#50cebb' },
          '2022-05-21': { startingDay: true, color: '#50cebb', textColor: 'white' },
          '2022-05-22': {
            color: '#70d7c7',
            customTextStyle: {
              color: '#FFFAAA',
              fontWeight: '700'
            }
          },
          '2022-05-23': { color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white' },
          '2022-05-24': { color: '#70d7c7', textColor: 'white' },
          '2022-05-25': {
            endingDay: true,
            color: '#50cebb',
            textColor: 'white',
            customContainerStyle: {
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5
            }
          },
          '2022-05-30': { disabled: true, disableTouchEvent: true }
        }}
          
        theme={{
          textSectionTitleDisabledColor: 'grey',
          textSectionTitleColor: '#00BBF2'
        }}
      />

      <S.EventsContainer>

      </S.EventsContainer>
    </>
  );
};

const styles = StyleSheet.create({
  dayNames: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',


  },
  days: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',

  },
  daysRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',

  },

  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Agenda;
