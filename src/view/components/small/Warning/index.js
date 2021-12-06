import React, {useEffect, useState} from 'react';
import * as S from './styled';
import global from '../../../../common/global';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Warning = ({color, bottom, left, right, size}) => {
  return (
    <S.WarningContent
      color={global.colors.purpleColor}
      bottom={bottom}
      left={left}
      right={right}>
      <Icon name={'exclamation'} color={color} size={size ? size : 30} />
    </S.WarningContent>
  );
};

export default Warning;
