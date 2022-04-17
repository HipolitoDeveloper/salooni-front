import React, {useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../../common/style/Colors";
import { Dimensions, StyleSheet, Text, View } from "react-native";


export const Warning = ({color, bottom, left, right, size}) => {
  return (
    <S.WarningContent
      color={Colors.PURPLE}
      bottom={bottom}
      left={left}
      right={right}>
        <Text style={{fontSize: 30, color: color}}>!</Text>
      {/* <Icon name={'exclamation'} color={color} size={size ? size : 30} /> */}
    </S.WarningContent>
  );
};

export default Warning;
