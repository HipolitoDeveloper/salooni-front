import React, {useEffect, useState} from "react";
import moment from "moment";
import Notification from "../../../../components/small/Notification";
import List from "../../../../components/huge/ListComponent";
import { useNavigation } from "@react-navigation/native";
import { getScheduleProceduresByClientId } from "../../../../../services/ScheduleProcedureService";
import Colors from "../../../../../common/style/Colors";
import { View } from "react-native";
import {useLayout} from "../../../../../hooks/Layout";
import {useProcedure, useSchedule} from "../../../../../hooks";
import Errors from "../../../../../common/Errors";
import {getSchedulesByClientId} from "../../../../../services/ScheduleService";

const ClientSchedules = ({ route }) => {
    const {
        deleteSchedule,
    } = useSchedule();
    const {procedures} = useProcedure()

    const {handleModal, modal, handleLoading, loading} = useLayout();

    const { client } = route.params;
    const [clientSchedules, setClientSchedules] = useState([])

    const navigate = useNavigation();

    useEffect(() => {
        (async () => {
            await fetchData()
        })();
    },[client, procedures])

    const fetchData = async (skip, limit) => {
        handleLoading(true);
        try {
            const schedules = await getSchedulesByClientId(client.id)
            handleLoading(false);

            const clientAgenda = []
            console.log("procedure",procedures);

            schedules.forEach(({procedures:scheduleProcedures , scheduleDate, employee, formattedDateHour, analyzedSchedule, passedHour, marked, id}) => {
                if(scheduleProcedures.length) {
                    scheduleProcedures?.forEach(scheduleProcedure => {
                        const procedure = procedures.find(procedure => scheduleProcedure.id === procedure.id)
                        clientAgenda.push({
                            ...scheduleProcedure,
                            name: procedure?.name,
                            scheduleDate,
                            employee,
                            formattedDateHour,
                            analyzedSchedule,
                            passedHour,
                            marked
                        })
                    })
                } else {
                    clientAgenda.push({
                        name:"Agendamento sem procedimento",
                        id,
                        scheduleDate,
                        employee,
                        formattedDateHour,
                        analyzedSchedule,
                        passedHour,
                        marked
                    })
                }
            })

            setClientSchedules(clientAgenda)
        } catch (e) {
            console.error(e)
            handleLoading(false);
            handleModal({
                ...modal,
                visible: true,
                variant: "alert",
                errors: [Errors.LOAD_MORE_ERROR],
            });
        }
    };

    const onDeleteSchedule = async scheduleToDelete => {
        handleLoading(true);
        try {
            await deleteSchedule(scheduleToDelete)
            await fetchData()
            handleLoading(false)
        } catch (error) {
            handleLoading(false);
            console.log(error);
        }
    };

  return (
    <View style={{flex: 1}}>
      {/*<Agenda*/}
      {/*  isVisible={isShowingAgenda}*/}
      {/*  color={global.colors.purpleColor}*/}
      {/*  handleModal={handleAgenda}*/}
      {/*  calendarSchedule={calendarSchedule}*/}
      {/*/>*/}
      <List
        showAddButton
        showCloseButton
        fetchData={fetchData}
        onDeleteItem={onDeleteSchedule}
        refreshing={loading}
        searchPlaceHolder={"Procure por procedimentos"}
        isOwner
        showHeader
        headerText={`Agendamentos`}
        subHeaderText={`${client.name}`}
        color={Colors.PURPLE}
        items={clientSchedules}
        menuItems={["name", "tel", "email", "procedures"]}
        objectMenuItems={["client", "client", "client"]}
        itemType={"clientSchedule"}
        listProperty={["name", "scheduleHour"]}

        isLoading={loading}
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
