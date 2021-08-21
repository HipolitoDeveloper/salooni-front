import React, {useState} from 'react';
import {LocaleConfig, Agenda} from 'react-native-calendars';
import global from '../../../../src/common/global';
import {Alert, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Calendar = () => {
  const navigate = useNavigation();

  const [items, setItems] = useState({
    '2021-08-16': [{name: 'item 1 - any js object'}],
    '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
    '2012-05-24': [],
    '2021-08-18': [{name: 'item 3 - any js object'}, {name: 'any js object'}],
  });

  LocaleConfig.locales['br'] = {
    monthNames: [
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
    ],
    monthNamesShort: [
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
    ],
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['DOM.', 'SEG.', 'TER.', 'QUA.', 'QUI.', 'SEX.', 'SAB.'],
    today: 'Hoje',
  };
  LocaleConfig.defaultLocale = 'br';

  const theme = {
    backgroundColor: `${global.colors.lightGreyColor}`,
    calendarBackground: `${global.colors.lightGreyColor}`,
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: `${global.colors.blueColor}`,
    selectedDayTextColor: `${global.colors.lightGreyColor}`,
    todayTextColor: '#00adf5',
    dayTextColor: '#000',
    textDisabledColor: '#d9e1e8',
    arrowColor: `${global.colors.blueColor}`,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: `${global.colors.blueColor}`,
    indicatorColor: 'blue',
    textDayFontFamily: `${global.fonts.s}`,
    textMonthFontFamily: `${global.fonts.s}`,
    textDayHeaderFontFamily: `${global.fonts.s}`,
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 12,
  };

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
    <TouchableOpacity
      style={[styles.item, {height: item.height}]}
      onPress={() => Alert.alert(item.name)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
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

  const renderDay = (day, item) => (
    <View>
      <Text>{JSON.stringify(day)}</Text>
    </View>
  );

  return (
    <>
      <Agenda
        onPress={date =>
          navigate.navigate('ApplicationStack', {
            screen: 'SchedulingRegister',
            params: {date: date},
          })
        }
        items={items}
        loadItemsForMonth={month => {
          loadItems(month);
        }}
        onCalendarToggled={calendarOpened => {
          console.log(calendarOpened);
        }}
        onDayPress={day => {
          console.log('day pressed');
        }}
        onDayChange={day => {
          console.log('day changed');
        }}
        // renderDay={renderDay}
        pastScrollRange={50}
        futureScrollRange={50}
        renderItem={renderItems}
        renderEmptyDate={renderEmptyDate}
        renderKnob={renderKnob}
        rowHasChanged={(r1, r2) => {
          return r1.name !== r2.name;
        }}
        showClosingKnob={true}
        onRefresh={() => console.log('refreshing...')}
        refreshing={false}
        refreshControl={null}
        theme={{
          ...theme,
          agendaDayTextColor: `${global.colors.lightBlueColor}`,
          agendaDayNumColor: `${global.colors.blueColor}`,
          agendaTodayColor: `${global.colors.purpleColor}`,
          agendaKnobColor: `${global.colors.purpleColor}`,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Calendar;
