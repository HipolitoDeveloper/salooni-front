import React, {useContext, useState} from 'react';
import * as S from './styled';
import global from '../../../../../common/global';
import {ScheduleContext} from '../../../../../contexts/Schedule/ScheduleContext';
import Calendar from '../../../../components/huge/CalendarComponent';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {UserContext} from '../../../../../contexts/User/UserContext';
import CalendarHeader from '../../../../components/huge/CalendarComponent/CalendarHeader';
import List from '../../../../components/ListComponent';
import AlertModal from '../../../../components/small/AlertModal';
import Notification from '../../../../components/small/Notification';
import {HeaderContent} from './styled';
import notificationsMessages from '../../../../../common/notificationsMessages';

const UnconfirmedSchedules = ({route}) => {
  const {currentUser, verifyNotification} = useContext(UserContext);
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

  const [isShowingAgenda, setIsShowingAgenda] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    text: '',
    isVisible: false,
    onOk: () => {},
    title: '',
    onClose: () => {},
    cancelTitle: '',
    okTitle: '',
  });

  const navigate = useNavigation();

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
        navigate.push('ApplicationStack', {
          screen: 'UnconfirmedSchedules',
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
    setIsLoading(true);
    loadAllSchedules({
      salonId: currentUser.idSalon,
      employeeId: currentUser.idFunc,
      employeeType: currentUser.employeeType,
    }).then(
      () => {
        setIsLoading(false);
      },
      error => {
        console.log(error);
        setIsLoading(false);
      },
    );
  };

  return (
    <S.Container>
      <List
        backButtonHeader={true}
        onRefresh={onRefresh}
        refreshing={isLoading}
        searchPlaceHolder={'Procure pela sua agenda '}
        isOwner={false}
        showHeader={true}
        showAddButton={false}
        handleAgenda={handleAgenda}
        showProfileIcon={false}
        headerText={'Calendário'}
        color={global.colors.purpleColor}
        itemList={schedules.filter(schedule => schedule.passedHour)}
        menuItems={['name', 'tel', 'email', 'procedures']}
        objectMenuItems={['client', 'client', 'client']}
        itemType={'schedule'}
        listProperty={['name', 'scheduleHour']}
        checkItems={checkSchedules}
        confirmItems={confirmSchedule}
        deleteItemList={deleteSchedules}
        deleteUniqueItem={deleteSchedule}
        deleteProcedure={deleteScheduleProcedure}
        isLoading={isRefreshing}
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
      <AlertModal
        text={
          'Se você apagar o último procedimento desse agendamento, o agendamento por inteiro também será excluído!'
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
export default UnconfirmedSchedules;
