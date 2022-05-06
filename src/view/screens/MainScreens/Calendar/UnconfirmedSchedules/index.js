import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import List from '../../../../components/huge/ListComponent';
import * as S from './styled';
import Colors from "../../../../../common/style/Colors";
import Modal from "../../../../components/small/Modal";
import { useSchedule, useUser } from "../../../../../hooks";
import {useLayout} from "../../../../../hooks/Layout";
import Errors from "../../../../../common/Errors";

const UnconfirmedSchedules = ({route}) => {
  const {currentUser} = useUser();
  const {
    calendarSchedule,
    schedules,
    loadAllSchedules,
    updateSchedule,
    deleteSchedule,
    analyzeSchedules,
  } = useSchedule();

  const {handleLoading, modal, handleModal, loading, handleNotification} = useLayout()

  const [isShowingAgenda, setIsShowingAgenda] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigation();

  const handleAgenda = state => {
    setIsShowingAgenda(!isShowingAgenda);
  };

  // const confirmSchedule = checkedItems => {
  //   confirmSchedules(checkedItems);
  //
  //   // verifyNotification({
  //   //   // name: notificationsMessages.notifications[0].name,
  //   //   verification: checkedItems.some(
  //   //     schedule => !schedule.checked && schedule.passedHour,
  //   //   ),
  //   //   method: () =>
  //   //     navigate.push('ApplicationStack', {
  //   //       screen: 'UnconfirmedSchedules',
  //   //     }),
  //   // });
  // };

  const onDeleteSchedule = async scheduleToDelete => {
    handleLoading(true);
    try {
      await deleteSchedule(scheduleToDelete)
      handleLoading(false)
    } catch (error) {
      handleLoading(false);
      console.log(error);
    }
  };

  const fetchData = async (skip, limit) => {
    handleLoading(true);
    try {
      const {idSalon: salonId, idFunc: employeeId, employeeType} = currentUser

      await loadAllSchedules({employeeId, salonId, employeeType})
      handleLoading(false);
    } catch (e) {
      console.error(e)
      handleLoading(false);
      handleModal({
        ...modal,
        visible: true,
        variant: "alert",
        errors: Errors.LOAD_MORE_ERROR,
      });
    }
  };

  const onUpdateSchedule = async (data) => {
    handleLoading(true);
    try {
      await updateSchedule(data)
      handleLoading(false);

    } catch (error) {
      console.error(error)
      handleLoading(false);
    }
  };

  const onAnalyzeSchedule = async (analyzedSchedules) => {
    handleLoading(true);
    try {
      const newSchedules = await analyzeSchedules(analyzedSchedules)
      handleLoading(false);

      if (newSchedules.every(schedule => schedule.analyzedSchedule)) {
        handleNotification(false)
        navigate.push("TabStack", { screen: "Schedules" });
      }

    } catch (error) {
      console.error(error)
      handleLoading(false);
    }
  }


  return (
    <S.Container>
      <List
        showMenu
        backButtonHeader
        fetchData={fetchData}
        refreshing={loading}
        searchPlaceHolder={'Procure pela sua agenda '}
        showHeader
        handleAgenda={handleAgenda}
        headerText={'Calendário'}
        color={Colors.PURPLE}
        items={schedules.filter(schedule => !schedule.analyzedSchedule && schedule.passedHour)}
        menuItems={['name', 'tel', 'email', 'procedures']}
        objectMenuItems={['client', 'client', 'client']}
        itemType={'schedule'}
        listProperty={['name', 'scheduleHour']}
        analyzeItem={onAnalyzeSchedule}
        onDeleteItem={onDeleteSchedule}
        onUpdateItem={onUpdateSchedule}
        onAddNavigateTo={() =>
          navigate.push('ApplicationStack', {
            screen: 'ScheduleRegister',
            params: {schedule: [], date: moment(new Date()).format()},
          })
        }
        onEditNavigateTo={item =>
          navigate.push('ApplicationStack', {
            screen: 'ScheduleRegister',
            params: {
              schedule: item,
              date: {date: moment(new Date()).format()},
            },
          })
        }
      />
      {/*<Modal*/}
      {/*  text={*/}
      {/*    'Se você apagar o último procedimento desse agendamento, o agendamento por inteiro também será excluído!'*/}
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
export default UnconfirmedSchedules;
