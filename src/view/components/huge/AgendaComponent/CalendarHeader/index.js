import React from 'react';
import * as S from './styled';
import Salooni from '../../../../../assets/svg/salooniSVG.svg';
import Profile from '../../../../../assets/svg/profileSVG.svg';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../../../small/BackButton';
import tourMessages from '../../../../../common/tourMessages';

const CalendarHeader = ({
  color,
  headerTitle,
  handleAgenda,
  navigate,
  route,
}) => {
  const employeeView = route.params?.employeeView;
  const employee = route.params?.employee;
  return (
    <S.Container>
      <S.IconContent>
        {employeeView ? (
          <BackButton
            onPress={() => navigate.goBack()}
            positionTop={'10px'}
            positionLeft={'10px'}
            buttonColor={color}
          />
        ) : (
          <Salooni fill={color} borderFill={'#fff'} width={60} height={60} />
        )}
      </S.IconContent>
      <S.TitleName headerColor={color}>{headerTitle}</S.TitleName>
      {employeeView && (
        <S.EmployeeName headerColor={color}>do {employee.name}</S.EmployeeName>
      )}
      <S.ChangeIconContent onPress={handleAgenda} employeeView={employeeView}>
        <Icon name={'exchange-alt'} size={20} color={color} />
      </S.ChangeIconContent>

      {!employeeView && (
        <S.IconContent>
          <TouchableOpacity
            style={{marginRight: 30}}
            onPress={() =>
              navigate.push('ApplicationStack', {
                screen: 'UserInformationStack',
              })
            }>
            <Profile fill={color} borderFill={'#fff'} width={40} height={40} />
          </TouchableOpacity>
        </S.IconContent>
      )}
    </S.Container>
  );
};

export default CalendarHeader;
