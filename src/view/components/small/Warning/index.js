import React, {useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../../common/style/Colors";
import {Dimensions, StyleSheet, Text, View} from "react-native";


export const Warning = ({color, bottom, left, right, onPress}) => {
    return (
        <S.WarningContent
            onPress={onPress}
            color={Colors.PURPLE}
            bottom={bottom}
            left={left}
            right={right}>
            <Icon name={"exclamation"} size={20} color={color}/>
            {/* <Icon name={'exclamation'} color={color} size={size ? size : 30} /> */}
        </S.WarningContent>
    );
};

export default Warning;
