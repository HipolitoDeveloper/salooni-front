import React, {useState} from 'react';
import * as S from './styled';
import {Swipeable} from 'react-native-gesture-handler';
import {Pressable} from 'react-native';
import global from '../../../common/global';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  LeftSwipeableContent,
  MenuIconContent,
  RightInformationContainer,
} from './styled';

const ListContent = ({
  fromSchedule,
  client,
  formattedDateHour,
  passedHour,
  nextHour,
  onSwipeableLeftOpen,
}) => {
  const getRightContent = () => (
    <S.LeftSwipeableContent onPress={() => onSwipeableLeftOpen()}>
      <Icon name="edit" size={20} color="#FFF" />
    </S.LeftSwipeableContent>
  );

  return (
    <Swipeable
      containerStyle={{backgroundColor: `${global.colors.purpleColor}`}}
      renderRightActions={() => getRightContent()}>
      <Pressable
        onLongPress={() => console.log(nextHour)}
        style={({pressed}) => [
          {
            width: '100%',
            backgroundColor: pressed
              ? `${global.colors.lightGreyColor}`
              : `${global.colors.backgroundColor}`,
          },
        ]}>
        <S.Content>
          <S.LeftContent>
            <S.CalendarIconContent>
              <Icon name="calendar" size={25} color={'black'} />
            </S.CalendarIconContent>
            <S.InformationContent>
              <S.NameText passedHour={passedHour} nextHour={nextHour}>
                {client.name}
              </S.NameText>
              {fromSchedule ? (
                <S.ScheduledDadeText
                  passedHour={passedHour}
                  nextHour={nextHour}>
                  {formattedDateHour}
                </S.ScheduledDadeText>
              ) : (
                <S.TelephoneText>TESTE</S.TelephoneText>
              )}
            </S.InformationContent>
          </S.LeftContent>
          <S.RightContent>
            <S.CheckContent selected={false} />
            <S.MenuIconContent>
              <Icon name="ellipsis-v" size={18} color={'black'} />
            </S.MenuIconContent>
          </S.RightContent>
        </S.Content>
      </Pressable>
    </Swipeable>
  );
};

export default ListContent;
