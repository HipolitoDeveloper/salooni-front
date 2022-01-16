import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState, useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import global from "../../../../common/global";
import * as S from "./styled";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScheduleContext } from "../../../../contexts/Schedule/ScheduleContext";
import { DayEvent, DayWrapper, EmptyMessageText, EmptyMessageWrapper } from "./styled";
import Loading from "../../small/Loading";


const Agenda = ({ isVisible, handleModal, calendarSchedule }) => {
  const INITIAL_DATE = moment(new Date()).format("YYYY-MM-DD");

  const navigate = useNavigation();
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    onDayPress(INITIAL_DATE);
  }, []);


  LocaleConfig.locales["br"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan.",
      "Fev.",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul.",
      "Out",
      "Set.",
      "Out.",
      "Nov.",
      "Dec.",
    ],
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["DOM.", "SEG.", "TER.", "QUA.", "QUI.", "SEX.", "SAB."],
    today: "Hoje",
  };
  LocaleConfig.defaultLocale = "br";

  const onDayPress = day => {
    setSelected(day);
    setCalendarEvents(calendarSchedule[day]?.periods);
    console.log("periods", calendarSchedule[day]?.periods)
    setIsLoading(false)
  };

  const onMonthChange = month => {
    const { month: monthNumber, year } = month;
    const formattedMonthNumber = monthNumber.toString().length === 1 ? `0${monthNumber}` : monthNumber;
    const currentMonth = moment(new Date()).format("M");

    const newSelectedDate = currentMonth === monthNumber.toString()
      ? INITIAL_DATE
      : `${year}-${formattedMonthNumber}-01`;

    setCalendarEvents(calendarSchedule[newSelectedDate]?.periods);
    setSelected(newSelectedDate);
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
          <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />
          <Calendar
            dayComponent={({ date, state }) => {
              return (
                <S.DayWrapper selected={selected === date.dateString} onPress={() => onDayPress(date.dateString)}>
                  <S.DayText state={state} selected={selected === date.dateString}>{date.day}</S.DayText>
                  {Object.keys(calendarSchedule).some(scheduleDate => scheduleDate === date.dateString) &&
                  <S.DayEvent />
                  }
                </S.DayWrapper>
              );
            }}
            onDayPress={onDayPress}
            current={INITIAL_DATE}
            minDate={INITIAL_DATE}
            enableSwipeMonths
            onMonthChange={onMonthChange}
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
            <FlatList
              keyExtractor={item => item}
              data={calendarEvents}
              ListEmptyComponent={
                <S.EmptyMessageWrapper>
                  <S.EmptyMessageText>
                    Não existem eventos nesse dia.
                  </S.EmptyMessageText>
                </S.EmptyMessageWrapper>
              }
              renderItem={({ item }) => (
                <S.EventWrapper onPress={() => {
                  handleModal();
                  navigate.push("ApplicationStack", {
                    screen: "ScheduleRegister",
                    params: {
                      schedule: item,
                      date: { date: moment(new Date()).format() },
                    },
                  });
                }}
                >
                  <S.EventContent nextHour={item.nextHour}>
                    <S.LeftContent>
                      <S.HourText passedHour={item.passedHour} nextHour={item.nextHour}>
                        {item.formattedHour}
                      </S.HourText>
                      <S.ClientText passedHour={item.passedHour}>
                        {item.client.name}
                      </S.ClientText>
                    </S.LeftContent>
                    <S.RightContent>
                      <S.TelText passedHour={item.passedHour}>
                        {item.client.tel}
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
