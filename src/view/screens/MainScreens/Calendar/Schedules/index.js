import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import global from "../../../../../common/global";
import notificationsMessages from "../../../../../common/notificationsMessages";
import { ScheduleContext } from "../../../../../contexts/Schedule/ScheduleContext";
import { UserContext } from "../../../../../contexts/User/UserContext";
import Calendar from "../../../../components/huge/AgendaComponent";
import List from "../../../../components/ListComponent";
import AlertModal from "../../../../components/small/AlertModal";
import Loading from "../../../../components/small/Loading";
import Notification from "../../../../components/small/Notification";
import * as S from "./styled";
import Agenda from "../../../../components/huge/AgendaComponent";

const Schedules = ({ route }) => {
  const { currentUser, verifyNotification } = useContext(UserContext);
  const {
    calendarSchedule,
    schedules,
    loadAllSchedules,
    deleteScheduleProcedure,
    deleteUniqueSchedule,
    deleteScheduleList,
    checkSchedule,
    confirmSchedules,
  } = useContext(ScheduleContext);

  const [isShowingAgenda, setIsShowingAgenda] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    text: "",
    isVisible: false,
    onOk: () => {
    },
    title: "",
    onClose: () => {
    },
    cancelTitle: "",
    okTitle: "",
  });

  const navigate = useNavigation();

  useEffect(() => {
    navigate.addListener("focus", () => {
      setIsShowingAgenda(route.params?.isToShowAgenda);
    });
  }, [navigate]);

  const handleAgenda = state => {
    setIsShowingAgenda(!isShowingAgenda);
  };

  const confirmSchedule = checkedItems => {
    confirmSchedules(checkedItems);
    verifyNotification({
      name: notificationsMessages.notifications[0].name,
      verification: checkedItems.some(
        schedule => !schedule.checked && schedule.passedHour,
      ),
      method: () =>
        navigate.push("ApplicationStack", {
          screen: "UnconfirmedSchedules",
        }),
    });
  };

  const deleteSchedule = scheduleToDelete => {
    setIsLoading(true);
    deleteUniqueSchedule(scheduleToDelete).then(
      () => {
        setIsLoading(false);
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const deleteSchedules = schedulesToDelete => {
    setIsLoading(true);
    deleteScheduleList(schedulesToDelete).then(
      () => {
        setIsLoading(false);
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const checkSchedules = scheduleId => {
    checkSchedule(scheduleId);
  };

  const onRefresh = () => {
    return new Promise(resolve => {
      setIsLoading(true);
      loadAllSchedules({
        salonId: currentUser.idSalon,
        employeeId: currentUser.idFunc,
        employeeType: currentUser.employeeType,
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
      <Agenda
        isVisible={isShowingAgenda}
        color={global.colors.purpleColor}
        handleModal={handleAgenda}
      />
      <List
        showAddButton={true}
        onRefresh={onRefresh}
        refreshing={isLoading}
        searchPlaceHolder={"Procure pelo cliente agendado "}
        isOwner={true}
        showHeader={true}
        handleAgenda={handleAgenda}
        showProfileIcon={true}
        headerText={"Calendário"}
        color={global.colors.purpleColor}
        itemList={schedules}
        menuItems={["name", "tel", "email", "procedures"]}
        objectMenuItems={["client", "client", "client"]}
        itemType={"schedule"}
        listProperty={["name", "scheduleHour"]}
        checkItems={checkSchedules}
        confirmItems={confirmSchedule}
        deleteItemList={deleteSchedules}
        deleteUniqueItem={deleteSchedule}
        deleteProcedure={deleteScheduleProcedure}
        isLoading={isRefreshing}
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

      <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />

      <AlertModal
        text={
          "Se você apagar o último procedimento desse agendamento, o agendamento por inteiro também será excluído!"
        }
        isVisible={showAlertModal.isVisible}
        onOk={showAlertModal.onOk}
        title={showAlertModal.title}
        onClose={showAlertModal.onClose}
        cancelTitle={showAlertModal.cancelTitle}
        okTitle={showAlertModal.okTitle}
      />
    </S.Container>
  );
};
export default Schedules;
