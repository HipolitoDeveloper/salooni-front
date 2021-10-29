import React, {useState} from 'react';
import * as S from './styled';
import {Swipeable} from 'react-native-gesture-handler';
import {Pressable, StyleSheet} from 'react-native';
import global from '../../../../common/global';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Container, GenericText, InlineInformationContent} from './styled';
import {backgroundColor} from 'react-native-calendars/src/style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ListContent = ({
  name,
  tel,
  color,
  id,
  client,
  item,
  value,
  time,
  checked,
  formattedDateHour,
  nextHour,
  passedHour,
  itemType,
  selected,
  selectItem,
  changeListState,
  onPressItem,
  isDeleting,
  checkItem,
}) => {
  const showInformationContent = () => {
    if (itemType === 'schedule') {
      return (
        <>
          <S.NameText nextHour={nextHour} passedHour={passedHour}>
            {client.name}
          </S.NameText>
          <S.TelText nextHour={nextHour} passedHour={passedHour}>
            {formattedDateHour}
          </S.TelText>
        </>
      );
    } else if (itemType === 'procedure') {
      return (
        <>
          <S.NameText>{name}</S.NameText>
          <S.InlineInformationContent>
            <S.GenericText>{time} min - </S.GenericText>
            <S.GenericText>R$ {value}</S.GenericText>
          </S.InlineInformationContent>
        </>
      );
    } else {
      return (
        <>
          <S.NameText>{name}</S.NameText>
          <S.TelText>{tel}</S.TelText>
        </>
      );
    }
  };

  return (
    <S.Container
      onLongPress={() => changeListState(id)}
      onPress={() => selectItem(id, false)}
      style={({pressed}) => [
        {
          backgroundColor: selected
            ? color
            : pressed
            ? `${global.colors.lightGreyColor}`
            : `${global.colors.backgroundColor}`,
        },
      ]}>
      {isDeleting && (
        <S.DeleteIconContent color={color} selected={selected}>
          {selected && <Icon name="trash" size={10} color={'black'} />}
        </S.DeleteIconContent>
      )}

      <S.Content itemSelected={selected}>
        <S.LeftContent>
          <S.InformationContent selected={selected}>
            {showInformationContent()}
          </S.InformationContent>
        </S.LeftContent>
        <S.RightContent>
          {itemType === 'schedule' && !isDeleting && (
            <S.CheckContent selected={false}>
              <BouncyCheckbox
                style={{borderColor: global.colors.purpleColor}}
                isChecked={checked}
                onPress={isChecked => checkItem(id)}
                fillColor={`${global.colors.purpleColor}`}
                disableBuiltInState={true}
                disableText={true}
              />
            </S.CheckContent>
          )}

          <S.MenuIconContent onPress={onPressItem}>
            <Icon name="ellipsis-v" size={18} color={color} />
          </S.MenuIconContent>
        </S.RightContent>
      </S.Content>
    </S.Container>
  );
};

export default ListContent;
