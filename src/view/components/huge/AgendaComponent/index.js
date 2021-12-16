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
const Agenda = ({ calendarSchedule, isVisible, handleModal }) => {
  const navigate = useNavigation();

  const [months, setMonths] = useState([])
  const [items, setItems] = useState([]);

  useEffect(() => {
    buildMonths()
    setItems(calendarSchedule);
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




  const loadItems = day => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            // items[strTime].push({
            //   name: 'Item for ' + strTime + ' #' + j,
            //   height: Math.max(50, Math.floor(Math.random() * 150)),
            // });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const renderItems = (item, firstItemInDay) => (
    <>
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: item.nextHour
              ? `${global.colors.purpleColor}`
              : 'white',
          },
        ]}>
        <View style={[styles.itemContent]}>
          <View>
            <Text
              style={{
                color: item.nextHour ? 'white' : `${global.colors.purpleColor}`,
                opacity: item.passedHour ? 0.6 : 1,
              }}>
              {item.formattedHour}
            </Text>
            <Text
              style={{
                opacity: item.passedHour ? 0.6 : 1,
              }}>
              {item.clientName}
            </Text>
          </View>
          <View style={{ color: global.colors.lightGreyColor }}>
            <Text
              style={{
                opacity: item.passedHour ? 0.6 : 1,
              }}>
              {item.clientTel}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );

  const renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text>Este dia não possui agendamentos.</Text>
    </View>
  );

  const renderKnob = () => (
    <View>
      <Text>Abrir</Text>
    </View>
  );

  const renderDay = (day, item) => {
    if (day !== undefined) {
      const dayDate = moment(day?.dateString).format('DD');
      const dayName =
        LocaleConfig.locales['br'].dayNamesShort[
        new Date(day?.dateString).getDay()
        ];
      const isCurrentDate =
        moment(day?.dateString).format('yyyy/MM/DD') ===
        moment(new Date()).format('yyyy/MM/DD');
      const dayColor = isCurrentDate
        ? global.colors.purpleColor
        : global.colors.darkGreyColor;

      return (
        <S.DayContainer
          color={dayColor}
          onPress={date =>
            navigate.push('ApplicationStack', {
              screen: 'ScheduleRegister',
              params: {
                schedule: [],
                date: moment(day.dateString),
              },
            })
          }>
          <Icon name={'plus'} size={12} color={global.colors.lightGreyColor} />
          <S.Day>{dayDate}</S.Day>
          <S.DayName>{dayName}</S.DayName>
        </S.DayContainer>
      );
    } else {
      return <></>;
    }
  };

  const daysInMonth = (month, year) => {
    return 32 - new Date(year, month, 32).getDate();
  }

  const buildMonths = (selectedYear) => {
    const today = new Date();

    const year = selectedYear ? selectedYear : today.getFullYear()
    const days = [];

    monthNames.map((_, index) => {
      const numberDays = daysInMonth(index, year)

      for (let day = 1; day <= numberDays; day++) {
        days.push(day)
      }

      // return {
      //   [index]: days
      // }
    })

    // const rowsNumber = days.length / 7
    const teste = []
    days.map((day, index) => {
      const week = [];

      for (let i = 1; i <= 7 * i; i++) {
        const weekNumber = 7 * i
        week.push(days.filter((day, index) => index < weekNumber))

        console.log("week", days.filter((day, index) => index < weekNumber))
      }
      
      // teste.push({
      //   [index]: week
      // })
    })

    console.log("days", teste)

  }

  const renderMonths = ({ item: month, index }) => {
    const monthNumber = Object.keys(month)
    return (
      <>
        <FlatList
          contentContainerStyle={styles.days}
          columnWrapperStyle={styles.daysRow}
          scrollEnabled={false}
          numColumns={7}
          keyExtractor={Math.random}
          data={month[monthNumber]}
          renderItem={({ item }) => (
            <S.DayContainer>
              {item}
            </S.DayContainer>
          )} />
      </>
    )
  }

  return (
    <>
      <S.MonthContainer>
        <S.MonthHeader>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.dayNames}
            keyExtractor={Math.random}
            data={dayNames}
            horizontal={true}
            renderItem={({ item }) => (
              <S.MonthHeaderItem>
                {item}
              </S.MonthHeaderItem>
            )}
          />
        </S.MonthHeader>
        <Carousel
          containerCustomStyle={{

          }}
          layout={"default"}
          data={months}
          renderItem={renderMonths}
          sliderWidth={300}
          itemWidth={300}
          onSnapToItem={index => console.log("rte", index)}
        />

      </S.MonthContainer>
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 50, }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
        
        </View>
      </SafeAreaView> */}

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
