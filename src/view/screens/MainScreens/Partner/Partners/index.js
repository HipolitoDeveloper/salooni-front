import React, {useContext, useState} from 'react';
import global from '../../../../../common/global';
import * as S from './styled';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import {PartnerContext} from '../../../../../contexts/Partner/PartnerContext';
import {ScheduleContext} from '../../../../../contexts/Schedule/ScheduleContext';
import List from '../../../../components/ListComponent';
import Calendar from '../../../../components/huge/AgendaComponent';
import Notification from '../../../../components/small/Notification';

const Partners = () => {
  const {
    partners,
    deleteUniquePartner,
    deletePartnerList,
    deletePartnerProcedure,
    loadAllPartners,
  } = useContext(PartnerContext);
  const {loadAllSchedulesByPartner} = useContext(ScheduleContext);
  const {currentUser, isOwner} = useContext(UserContext);

  const items = partners.filter(partner => partner.employeeType === 'PRC');
  const [isLoading, setIsLoading] = useState(false);
  const [stateAgenda, setStateAgenda] = useState({isShowing: false, item: {}});
  const navigate = useNavigation();

  const navigateToEmployeeCalendar = employee => {
    setIsLoading(true);
    loadAllSchedulesByPartner({
      salonId: currentUser.idSalon,
      employeeId: employee.id,
      employeeType: employee.employeeType,
      showCurrentUserSchedules: false,
    }).then(
      calendarSchedule => {
        setIsLoading(false);
        console.log('calendarSchedule', calendarSchedule);
        handleAgenda(calendarSchedule);
        // navigate.push('ApplicationStack', {
        //   screen: 'Schedules',
        //   params: {
        //     calendarViewState: true,
        //     employeeView: true,
        //     employee: employee,
        //   },
        // });
      },
      error => {
        console.log(error);
        setIsLoading(false);
      },
    );
  };

  const deletePartner = partnerToDelete => {
    setIsLoading(true);
    deleteUniquePartner(partnerToDelete).then(
      () => {
        setIsLoading(false);
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const deletePartners = partnersToDelete => {
    setIsLoading(true);
    deletePartnerList(partnersToDelete).then(
      () => {
        setIsLoading(false);
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const onRefresh = () => {
    return new Promise(resolve => {
      setIsLoading(true);
      loadAllPartners(currentUser.idSalon).then(
        newPartnerList => {
          setIsLoading(false);
          resolve(
            newPartnerList.filter(partner => partner.employeeType === 'PRC'),
          );
        },
        error => {
          console.log(error);
          setIsLoading(false);
        },
      );
    });
  };
  const handleAgenda = item => {
    setStateAgenda({isShowing: !stateAgenda.isShowing, item: item});
  };

  return (
    <S.Container>
      <Notification />

      {stateAgenda.isShowing && (
        <Calendar
          isVisible={stateAgenda.isShowing}
          calendarSchedule={stateAgenda.item}
          color={global.colors.purpleColor}
          handleModal={handleAgenda}
        />
      )}

      <List
        showAddButton={true}
        onRefresh={onRefresh}
        refreshing={isLoading}
        searchPlaceHolder={'Procure pelos seus parceiros'}
        navigateToCalendar={navigateToEmployeeCalendar}
        isOwner={isOwner}
        showCalendarButton={true}
        showHeader={true}
        headerText={'Parceiros'}
        color={`${global.colors.greenColor}`}
        itemList={items}
        menuItems={['name', 'tel', 'email', 'procedures']}
        deleteItemList={deletePartners}
        deleteUniqueItem={deletePartner}
        deleteProcedure={deletePartnerProcedure}
        isLoading={isLoading}
        onAddNavigateTo={() =>
          navigate.push('ApplicationStack', {
            screen: 'PartnerRegister',
            params: {partner: []},
          })
        }
        onEditNavigateTo={partner =>
          navigate.push('ApplicationStack', {
            screen: 'PartnerRegister',
            params: {partner: partner},
          })
        }
      />
    </S.Container>
  );
};

export default Partners;
