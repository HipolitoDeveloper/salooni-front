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
import {useTourGuideController} from 'rn-tourguide';

const SchedulingCalendar = ({route}) => {
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController();

  const {currentUser, isOwner} = useContext(UserContext);
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

  const [calendarState, setCalendarState] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigation();

  navigate.addListener('focus', () => {
    setCalendarState(route.params?.calendarViewState);
  });

  const handleIsListing = viewToShow => {
    setCalendarState(!calendarState);
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

  return (
    <>
      {calendarState && (
        <CalendarHeader
          route={route}
          navigate={navigate}
          handleState={handleIsListing}
          headerTitle={'Calendário'}
          color={global.colors.purpleColor}
        />
      )}
      <S.Content>
        {calendarState ? (
          <Calendar
            calendarSchedule={calendarSchedule}
            color={global.colors.purpleColor}
          />
        ) : (
          <List
            searchPlaceHolder={'Procure pela sua agenda '}
            isOwner={true}
            showHeader={true}
            handleState={handleIsListing}
            headerText={'Calendário'}
            color={global.colors.purpleColor}
            itemList={schedules}
            menuItems={['name', 'tel', 'email', 'procedures']}
            objectMenuItems={['client', 'client', 'client']}
            itemType={'schedule'}
            listProperty={['name', 'scheduleHour']}
            checkItems={checkSchedules}
            confirmItems={confirmSchedules}
            deleteItemList={deleteSchedules}
            deleteUniqueItem={deleteSchedule}
            deleteProcedure={deleteScheduleProcedure}
            isLoading={isRefreshing}
            onAddNavigateTo={() =>
              navigate.push('ApplicationStack', {
                screen: 'SchedulingRegister',
                params: {schedule: [], date: moment(new Date()).format()},
              })
            }
            onEditNavigateTo={item =>
              navigate.push('ApplicationStack', {
                screen: 'SchedulingRegister',
                params: {
                  schedule: item,
                  date: {date: moment(new Date()).format()},
                },
              })
            }
            //   onRefresh={async () =>
            //   await loadAllSchedules({
            //   salonId: currentUser.idSalon,
            //   employeeId: currentUser.idFunc,
            //   employeeType: currentUser.employeeType,
            // })
            // }
          />
        )}
      </S.Content>
    </>
  );
};
export default SchedulingCalendar;
