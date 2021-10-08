import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import global from '../../../../../common/global';
import Header from '../../../../components/Header';
import {ScheduleContext} from '../../../../../contexts/Schedule/ScheduleContext';
import Calendar from '../../../../components/Calendar';
import {Alert, FlatList, RefreshControl, Text, View} from 'react-native';
import ListContent from '../../../../components/ListContent';
import FloatButton from '../../../../components/FloatButton';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {buildDropdown} from '../../../../../factory/common';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {PartnerContext} from '../../../../../contexts/Partner/PartnerContext';
import {ClientContext} from '../../../../../contexts/Client/ClientContext';
import {ProcedureContext} from '../../../../../contexts/Procedure/ProcedureContext';

const SchedulingCalendar = ({route}) => {
  const {calendarSchedule, schedules, loadAllSchedules} =
    useContext(ScheduleContext);
  const {currentUser} = useContext(UserContext);
  const {loadAllPartners} = useContext(PartnerContext);
  const {loadAllClients} = useContext(ClientContext);
  const {loadAllProcedures} = useContext(ProcedureContext);

  const [viewType, setViewType] = useState(route.params.typeView);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigation();

  const handleIsListing = viewToShow => {
    setViewType(viewToShow);
  };

  return (
    <>
      <Header
        headerColor={global.colors.blueColor}
        headerTitle={'Calendário'}
        handleIsListing={handleIsListing}
        viewChangeIcon={viewType}
      />

      <S.Content>
        {viewType === 'AGN' ? (
          <Calendar calendarSchedule={calendarSchedule} />
        ) : (
          <S.List>
            <FlatList
              refreshControl={
                <RefreshControl
                  tintColor="transparent"
                  colors={['transparent']}
                  style={{backgroundColor: 'transparent'}}
                  refreshing={isRefreshing}
                  onRefresh={async () =>
                    await loadAllSchedules({
                      salonId: currentUser.idSalon,
                      employeeId: currentUser.idFunc,
                      employeeType: currentUser.employeeType,
                    })
                  }
                />
              }
              key={item => item.id}
              data={schedules}
              renderItem={({item}) => (
                <ListContent
                  {...item}
                  fromSchedule={true}
                  onSwipeableLeftOpen={() =>
                    navigate.push('ApplicationStack', {
                      screen: 'SchedulingRegister',
                      params: {
                        schedule: item,
                        date: {date: moment(new Date()).format()},
                      },
                    })
                  }
                />
              )}
            />
            <FloatButton
              buttonColor={`${global.colors.blueColor}`}
              onPress={() =>
                navigate.navigate('ApplicationStack', {
                  screen: 'SchedulingRegister',
                  params: {date: moment(new Date()).format()},
                })
              }
            />
          </S.List>
        )}
      </S.Content>
    </>
  );
};
export default SchedulingCalendar;
