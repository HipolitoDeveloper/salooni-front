import React, {useRef, useState} from 'react';
import * as S from './styled';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import global from '../../../../common/global';
import {Text} from '../InputModal/styled';
import {PropsType} from 'react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type';
import PropTypes from 'prop-types';

export const Switch = ({
  handleSwitch,
  switchState,
  marginTop,
  circleColor,
  backgroundColor,
}) => {
  const switchCircle = useRef(new Animated.Value(3)).current;
  const backgroundSwitchColor = backgroundColor
    ? backgroundColor
    : `${global.colors.purpleColor}`;
  const circleSwitchColor = circleColor
    ? circleColor
    : `${global.colors.lightGreyColor}`;

  Animated.timing(switchCircle, {
    toValue: switchState.state ? 35 : 3,
    duration: 500,
    useNativeDriver: false,
  }).start();

  const handleState = stateToChange => {
    handleSwitch(stateToChange);
    Animated.timing(switchCircle, {
      toValue: switchState.state ? 35 : 3,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <S.Container marginTop={marginTop}>
      <TouchableWithoutFeedback
        onPress={() =>
          handleState({
            state: !switchState.state,
            text: switchState.state ? 'times' : 'check',
          })
        }>
        <View
          style={[
            styles.input,
            {
              backgroundColor: switchState.state
                ? backgroundSwitchColor
                : 'transparent',
              elevation: switchState.state ? 5 : 0,
              borderWidth: switchState.state ? 0 : StyleSheet.hairlineWidth,
            },
          ]}>
          <Animated.View
            style={[
              styles.circle,
              {
                backgroundColor: switchState.state
                  ? circleSwitchColor
                  : 'black',
                left: switchCircle,
              },
            ]}
          />

          <Icon
            name={switchState.text}
            size={14}
            style={[
              styles.text,
              {
                left: switchState.state ? 10 : 35,
                color: switchState.state ? circleSwitchColor : 'black',
              },
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 30,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
  },
  circle: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 100,
    top: 2,
    elevation: 5,
  },
  text: {
    position: 'absolute',
    fontSize: 14,
  },
});
