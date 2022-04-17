import ActionButton from 'react-native-circular-action-menu';
import * as S from './styled';
import React from 'react';
import {View} from 'react-native';
import {Button} from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import tourMessages from '../../../../common/tourMessages';
const FloatButton = ({buttonColor, onPress, icon, right, bottom, disabled}) => {
  return (
    <S.Button
      disabled={disabled}
      buttonColor={buttonColor}
      onPress={onPress}
      right={right}
      bottom={bottom}>
      <Icon name={icon} color={buttonColor} size={15} />
    </S.Button>
  );
};

export default FloatButton;
