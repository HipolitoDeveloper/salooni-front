import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  Pressable,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
} from 'react-native';
import global from '../../../../../common/global';
import Header from '../../../../components/Header';
import * as S from './styled';
import ActionButton from 'react-native-circular-action-menu';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import {PartnerContext} from '../../../../../contexts/Partner/PartnerContext';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScheduleContext} from '../../../../../contexts/Schedule/ScheduleContext';
const Partners = () => {
  const {partners, loadAllPartners} = useContext(PartnerContext);
  const {loadAllSchedules} = useContext(ScheduleContext);
  const {currentUser} = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigation();

  const loadSchedule = idFunc => {
    setLoading(true);
    loadAllSchedules({
      salonId: currentUser.idSalon,
      employeeId: idFunc,
      employeeType: currentUser.employeeType,
    }).then(
      () => {
        setLoading(false);
        navigate.push('ApplicationStack', {
          screen: 'SchedulingCalendar',
          params: {
            typeView: 'AGN',
          },
        });
      },
      error => {
        console.log(error);
        setLoading(false);
      },
    );
    setLoading(false);
  };

  const getLeftContent = () => (
    <S.LeftContent>
      <Icon name="calendar" size={20} color="#FFF" style={{marginLeft: 20}} />
    </S.LeftContent>
  );

  const loadPartners = partners.map(
    (partner, index) =>
      partner.employeeType === 'PRC' && (
        <Swipeable
          key={index}
          renderLeftActions={getLeftContent}
          onSwipeableLeftOpen={() => loadSchedule(partner.objectId)}>
          <S.BoxContainer>
            <S.BoxContent>
              <S.BoxLabel>Nome</S.BoxLabel>
              <S.BoxText>{partner.name}</S.BoxText>
            </S.BoxContent>
            <S.BoxContent>
              <S.BoxLabel>Telefone</S.BoxLabel>
              <S.BoxText>{partner.tel}</S.BoxText>
            </S.BoxContent>
            <S.DetailsContent>
              <S.DetailsButton
                onPress={() => {
                  navigate.push('ApplicationStack', {
                    screen: 'PartnerRegister',
                    params: {partner: partner},
                  });
                }}>
                <S.DetailsButtonText>Detalhes</S.DetailsButtonText>
              </S.DetailsButton>
            </S.DetailsContent>
          </S.BoxContainer>
        </Swipeable>
      ),
  );

  return (
    <S.Container>
      <S.Content>
        <Header
          headerColor={global.colors.lightBlueColor}
          headerTitle={'Parceiros'}
        />

        {loading && (
          <S.LoadingContent>
            <ActivityIndicator size="large" color={global.colors.blueColor} />
          </S.LoadingContent>
        )}
        <S.BodyContent
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={['transparent']}
              style={{backgroundColor: 'transparent'}}
              refreshing={isRefreshing}
              onRefresh={() => loadAllPartners(currentUser.idSalon)}
            />
          }>
          {loadPartners}
        </S.BodyContent>
        <S.FooterContent>
          <S.ActionButtonContainer>
            <ActionButton
              buttonColor={`${global.colors.lightBlueColor}`}
              onPress={() => {
                navigate.push('ApplicationStack', {
                  screen: 'PartnerRegister',
                  params: {partner: []},
                });
              }}
            />
          </S.ActionButtonContainer>
        </S.FooterContent>
      </S.Content>
    </S.Container>
  );
};

export default Partners;
