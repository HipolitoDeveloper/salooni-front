import React, { useState } from "react";
import moment from "moment";
import Notification from "../../../../components/small/Notification";
import List from "../../../../components/huge/ListComponent";
import { useNavigation } from "@react-navigation/native";
import { getScheduleProceduresByClientId } from "../../../../../services/ScheduleProcedureService";
import Colors from "../../../../../common/style/Colors";
import { View } from "react-native";

const ClientSchedules = ({ route }) => {
  const { schedules, client } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigation();


  const onRefresh = () => {
    return new Promise(resolve => {
      setIsLoading(true);
      getScheduleProceduresByClientId(
        client.id,
        false,
      ).then(
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
    <View style={{flex: 1}}>
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
        showCloseButton={true}
        onRefresh={onRefresh}
        refreshing={isLoading}
        searchPlaceHolder={"Procure por procedimentos"}
        isOwner={true}
        showHeader={true}
        headerText={`Agendamentos`}
        subHeaderText={`${client.name}`}
        color={Colors.PURPLE}
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


    </View>
  );
};

export default ClientSchedules;
