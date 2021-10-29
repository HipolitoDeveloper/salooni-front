import React, {useContext, useEffect, useState} from 'react';
import global from '../../../../../common/global';
import * as S from './styled';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import {PartnerContext} from '../../../../../contexts/Partner/PartnerContext';
import {ScheduleContext} from '../../../../../contexts/Schedule/ScheduleContext';
import List from '../../../../components/ListComponent';
import {ProcedureContext} from '../../../../../contexts/Procedure/ProcedureContext';

const Partners = () => {
  const {
    partners,
    deleteUniquePartner,
    deletePartnerList,
    deletePartnerProcedure,
  } = useContext(PartnerContext);
  const {loadAllSchedules} = useContext(ScheduleContext);
  const {currentUser, isOwner} = useContext(UserContext);

  const items = partners.filter(partner => partner.employeeType === 'PRC');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigation();

  const navigateToEmployeeCalendar = employee => {
    setIsLoading(true);
    loadAllSchedules({
      salonId: currentUser.idSalon,
      employeeId: employee.id,
      employeeType: employee.employeeType,
      showCurrentUserSchedules: false,
    }).then(
      () => {
        setIsLoading(false);
        navigate.push('ApplicationStack', {
          screen: 'SchedulingCalendar',
          params: {
            calendarViewState: true,
            employeeView: true,
            employee: employee,
          },
        });
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

  return (
    <S.Container>
      <List
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
