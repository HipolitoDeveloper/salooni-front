import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";
import Loading from "../../small/Loading";
import * as S from "./styled";
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";
import {currentDate} from "../../../../factory/ScheduleFactory";

const Agenda = ({ isVisible, handleModal, calendarSchedule }) => {
  const INITIAL_DATE = moment(currentDate).format("YYYY-MM-DD");

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
          <Loading isLoading={isLoading} color={Colors.PURPLE} />
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
              textSectionTitleColor: Colors.PURPLE,
              textDayFontFamily: Fonts.MAIN,
              textMonthFontFamily: Fonts.MAIN,
              textDayHeaderFontFamily: Fonts.MAIN,
              monthTextColor: Colors.PURPLE,
              textMonthFontSize: 20,
              arrowColor: "black",
              todayTextColor: Colors.PURPLE,
            }}
          />

          <S.EventsContainer>
            <FlatList
              keyExtractor={item => item.id}
              data={calendarEvents}
              scrollEventThrottle={16}
              scrollEnabled={true}
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
                        {item.client.tel}-11
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

export default Agenda;
