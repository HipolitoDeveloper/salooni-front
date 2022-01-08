import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import global from "../../../../common/global";
import * as S from "./styled";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScheduleContext } from "../../../../contexts/Schedule/ScheduleContext";


const Agenda = ({ isVisible, handleModal }) => {
  const {
    calendarSchedule,
  } = useContext(ScheduleContext);


  const INITIAL_DATE = moment(new Date()).format("YYYY-MM-DD");

  const navigate = useNavigation();
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [calendarEvents, setCalendarEvents] = useState([])
  const [markedDates, setMarkedDates] = useState([])

  useEffect(() => {
    onDayPress({ dateString: INITIAL_DATE })
    setMarkedDates(calendarSchedule)
  }, []);


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

  const onDayPress = day => {
    const { dateString } = day;
    setSelected(dateString);
    setCalendarEvents(calendarSchedule[dateString]?.periods)
  };


  return (
    <>
      <Modal
        isVisible={isVisible}
        style={{
          margin: 0,
        }}
        onBackButtonPress={handleModal}
        onBackdropPress={handleModal}
        onRequestClose={handleModal}>
        <S.ModalContent>

          <Calendar
            onDayPress={onDayPress}
            current={INITIAL_DATE}
            minDate={INITIAL_DATE}
            enableSwipeMonths
            markingType="multi-period"
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: `${global.colors.purpleColor}`,
                selectedTextColor: `${global.colors.lightGreyColor}`,
              },  
              ...markedDates,
            }}

            theme={{
              textSectionTitleDisabledColor: "grey",
              textSectionTitleColor: `${global.colors.purpleColor}`,
              textDayFontFamily: `${global.fonts.mainFont}`,
              textMonthFontFamily: `${global.fonts.mainFont}`,
              textDayHeaderFontFamily: `${global.fonts.mainFont}`,
              monthTextColor: `${global.colors.purpleColor}`,
              textMonthFontSize: 20,
              arrowColor: "black",
              todayTextColor: `${global.colors.purpleColor}`,
            }}
          />

          <S.EventsContainer>
            <FlatList keyExtractor={item => item} data={calendarEvents} renderItem={({ item }) => (
              <S.EventWrapper>
                <S.EventContent nextHour={item.nextHour}>
                  <S.LeftContent>
                    <S.HourText passedHour={item.passedHour} nextHour={item.nextHour}>
                      {item.formattedHour}
                    </S.HourText>
                    <S.ClientText passedHour={item.passedHour}>
                      {item.clientName}
                    </S.ClientText>
                  </S.LeftContent>
                  <S.RightContent>
                    <S.TelText passedHour={item.passedHour}>
                      {item.clientTel}
                    </S.TelText>
                  </S.RightContent>
                </S.EventContent>
              </S.EventWrapper>
            )} />
          </S.EventsContainer>
          <S.CloseButtonContainer>
            <S.CloseButtonContent onPress={handleModal}>
              <Icon name={"times"} size={20} color={"black"} />
            </S.CloseButtonContent>
          </S.CloseButtonContainer>
        </S.ModalContent>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dayNames: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",


  },
  days: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",

  },
  daysRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

  },

  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Agenda;
