import React, {useContext, useEffect, useState} from 'react';
import {LocaleConfig, Agenda} from 'react-native-calendars';
import global from '../../../../common/global';
import {Alert, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../../contexts/User/UserContext';
import {ScheduleContext} from '../../../../contexts/Schedule/ScheduleContext';
import moment from 'moment';

const Calendar = ({calendarSchedule}) => {
  const navigate = useNavigation();

  const [items, setItems] = useState(calendarSchedule);
  const {currentUser} = useContext(UserContext);
  const {loadAllSchedules} = useContext(ScheduleContext);

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
    backgroundColor: `${global.colors.backgroundColor}`,
    calendarBackground: `${global.colors.backgroundColor}`,
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: `${global.colors.blueColor}`,
    selectedDayTextColor: `${global.colors.backgroundColor}`,
    todayTextColor: '#00adf5',
    dayTextColor: '#000',
    textDisabledColor: '#d9e1e8',
    arrowColor: `${global.colors.blueColor}`,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: `${global.colors.blueColor}`,
    indicatorColor: 'blue',
    textDayFontFamily: `${global.fonts.mainFont}`,
    textMonthFontFamily: `${global.fonts.mainFont}`,
    textDayHeaderFontFamily: `${global.fonts.mainFont}`,
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
    <>
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: item.nextHour
              ? `${global.colors.purpleColor}`
              : 'white',
          },
        ]}
        onPress={() => Alert.alert(JSON.stringify(item.nextHour))}>
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
          <View style={{color: global.colors.lightGreyColor}}>
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

  const renderDay = (day, item) => (
    <View>
      <Text>{JSON.stringify(day)}</Text>
    </View>
  );

  return (
    <>
      <Agenda
        onPress={date =>
          navigate.push('ApplicationStack', {
            screen: 'SchedulingRegister',
            params: {
              schedule: [],
              date: new Date(date),
            },
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
        renderItem={(item, firstItemInDay) => (
          <>
            {firstItemInDay && (
              <View
                style={[
                  styles.firtsItemDay,
                  {backgroundColor: global.colors.backgroundColor},
                ]}
              />
            )}
            {renderItems(item)}
          </>
        )}
        renderEmptyDate={renderEmptyDate}
        renderKnob={renderKnob}
        rowHasChanged={(r1, r2) => {
          return r1.name !== r2.name;
        }}
        showClosingKnob={true}
        onRefresh={async () =>
          await loadAllSchedules({
            salonId: currentUser.idSalon,
            employeeId: currentUser.idFunc,
            employeeType: currentUser.employeeType,
          })
        }
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
  firtsItemDay: {
    height: 40,
  },
  item: {
    marginRight: 10,
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Calendar;
