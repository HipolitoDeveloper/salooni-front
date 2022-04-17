import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Agenda from "../../../../components/huge/AgendaComponent";
import List from "../../../../components/huge/ListComponent";
import Loading from "../../../../components/small/Loading";
import Notification from "../../../../components/small/Notification";
import * as S from "./styled";
import { setFirstAccessUser } from "../../../../../services/UserService";
import Colors from "../../../../../common/style/Colors";
import { useSchedule, useUser } from "../../../../../hooks";

const Schedules = ({ route }) => {
  const { currentUser, verifyNotification, setCurrentUser } = useUser();
  const {
    calendarSchedule,
    schedules,
    loadAllSchedules,
    deleteScheduleProcedure,
    deleteUniqueSchedule,
    deleteScheduleList,
    checkSchedule,
    confirmSchedules,
  } = useSchedule();

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

  useEffect(() => {

    if (currentUser.isFirstAccess) {
      setShowAlertModal({
        text: "Qualquer dúvida relacionada ao funcionamento da aplicação, fique a vontade para explorar nossos vídeos explicativos.",
        isVisible: true,
        onOk: navigateToTutorial,
        title: `Bem-vindo ao Salooni.`,
        cancelTitle: "Continuar",
        okTitle: "TUTORIAL",
        onClose: async () => {
          await setCurrentUser(true, await setFirstAccessUser(currentUser.id));
          setShowAlertModal({ text: "", isVisible: false, ...showAlertModal });
        },
      });

    }
  }, []);


  const navigateToTutorial = async () => {
    await setCurrentUser(true, await setFirstAccessUser(currentUser.id));
    navigate.navigate("UserInformationStack", { screen: "Videos" });
  };

  const handleAgenda = state => {
    setIsShowingAgenda(!isShowingAgenda);
  };

  const confirmSchedule = checkedItems => {
    confirmSchedules(checkedItems);
    // verifyNotification({
    //   name: notificationsMessages.notifications[0].name,
    //   verification: checkedItems.some(
    //     schedule => !schedule.checked && schedule.passedHour,
    //   ),
    //   method: () =>
    //     navigate.push("ApplicationStack", {
    //       screen: "UnconfirmedSchedules",
    //     }),
    // });
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
        color={Colors.PURPLE}
        handleModal={handleAgenda}
        calendarSchedule={calendarSchedule}
      />
      <List
        showMenu={true}
        showAddButton={true}
        onRefresh={onRefresh}
        refreshing={isLoading}
        searchPlaceHolder={"Procure pelo cliente agendado "}
        isOwner={true}
        showHeader={true}
        handleAgenda={handleAgenda}
        showProfileIcon={true}
        headerText={"Calendário"}
        color={Colors.PURPLE}
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

      <Loading isLoading={isLoading} color={Colors.PURPLE} />

      {/*<Modal*/}
      {/*  text={*/}
      {/*    showAlertModal.text*/}
      {/*  }*/}
      {/*  isVisible={showAlertModal.isVisible}*/}
      {/*  onOk={showAlertModal.onOk}*/}
      {/*  title={showAlertModal.title}*/}
      {/*  onClose={showAlertModal.onClose}*/}
      {/*  cancelTitle={showAlertModal.cancelTitle}*/}
      {/*  okTitle={showAlertModal.okTitle}*/}
      {/*/>*/}
    </S.Container>
  );
};
export default Schedules;
