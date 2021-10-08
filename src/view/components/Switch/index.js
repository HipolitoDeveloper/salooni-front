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

import global from '../../../common/global';
import {Text} from '../InputModal/styled';

export const Switch = ({handleSwitch}) => {
  const switchCircle = useRef(new Animated.Value(3)).current;

  const [state, setState] = useState({
    state: false,
    text: 'times',
  });

  const handleState = stateToChange => {
    setState(stateToChange);
    handleSwitch(stateToChange);
    Animated.timing(switchCircle, {
      toValue: stateToChange.state ? 35 : 3,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <S.Container>
      <TouchableWithoutFeedback
        onPress={() =>
          handleState({
            state: !state.state,
            text: state.state ? 'times' : 'check',
          })
        }>
        <View
          style={[
            styles.input,
            {
              backgroundColor: state.state
                ? `${global.colors.purpleColor}`
                : 'transparent',
              elevation: state.state ? 5 : 0,
              borderWidth: state.state ? 0 : StyleSheet.hairlineWidth,
            },
          ]}>
          <Animated.View
            style={[
              styles.circle,
              {
                backgroundColor: state.state ? 'white' : 'black',
                left: switchCircle,
              },
            ]}
          />

          <Icon
            name={state.text}
            size={14}
            style={[
              styles.text,
              {
                left: state.state ? 10 : 35,
                color: state.state ? `white` : 'black',
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
