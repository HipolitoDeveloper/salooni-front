import React, { useContext, useState } from "react";

import { View, Text } from "react-native";
import moment from "moment";
import * as S from "../../Calendar/Schedules/styled";
import Notification from "../../../../components/small/Notification";
import Agenda from "../../../../components/huge/AgendaComponent";
import global from "../../../../../common/global";
import List from "../../../../components/ListComponent";
import Loading from "../../../../components/small/Loading";
import AlertModal from "../../../../components/small/AlertModal";
import { useNavigation } from "@react-navigation/native";
import { ScheduleContext } from "../../../../../contexts/Schedule/ScheduleContext";

const ClientSchedules = ({ route }) => {
  const { loadAllSchedulesByClient } = useContext(ScheduleContext);
  const { schedules, client } = route.params;

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigation();


  const onRefresh = () => {
    return new Promise(resolve => {
      setIsLoading(true);
      loadAllSchedulesByClient({
        clientId: client.id,
      }).then(
        newSchedules => {
          setIsLoading(false);
          resolve(newSchedules);
        },
        error => {
          console.log(error);
          setIsLoading(false);
        },
      );
    });
  };

  return (
    <S.Container>
      <Notification />
      {/*<Agenda*/}
      {/*  isVisible={isShowingAgenda}*/}
      {/*  color={global.colors.purpleColor}*/}
      {/*  handleModal={handleAgenda}*/}
      {/*  calendarSchedule={calendarSchedule}*/}
      {/*/>*/}
      <List
        showMenu={false}
        showAddButton={true}
        onRefresh={onRefresh}
        refreshing={isLoading}
        searchPlaceHolder={"Procure por procedimentos"}
        isOwner={true}
        showHeader={true}
        headerText={`Agendamentos`}
        subHeaderText={`${client.name}`}
        color={global.colors.purpleColor}
        itemList={schedules}
        menuItems={["name", "tel", "email", "procedures"]}
        objectMenuItems={["client", "client", "client"]}
        itemType={"clientSchedule"}
        listProperty={["name", "scheduleHour"]}

        isLoading={false}
        onAddNavigateTo={() =>
          navigate.push("ApplicationStack", {
            screen: "ScheduleRegister",
            params: { schedule: [], date: moment(new Date()).format() },
          })
        }
        onEditNavigateTo={item =>
          navigate.push("ApplicationStack", {
            screen: "ScheduleRegister",
            params: {
              schedule: item,
              date: { date: moment(new Date()).format() },
            },
          })
        }
      />


    </S.Container>
  );
};

export default ClientSchedules;
