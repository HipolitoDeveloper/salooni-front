import ActionButton from 'react-native-circular-action-menu';
import global from '../../../../common/global';
import * as S from './styled';
import React from 'react';
import {View} from 'react-native';
import {Button} from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FloatButton = ({buttonColor, onPress, icon, right, bottom}) => {
  return (
    <S.Button
      buttonColor={buttonColor}
      onPress={onPress}
      right={right}
      bottom={bottom}>
      <Icon name={icon} color={buttonColor} size={15} />
    </S.Button>
  );
};

export default FloatButton;
