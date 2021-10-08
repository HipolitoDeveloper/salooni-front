import * as S from './styled';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useRef, useState} from 'react';
import {InputsContainer, InputsContent} from './styled';
import {Switch} from '../Switch';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import global from '../../../common/global';

export const InputModal = ({renderInputs}) => {
  const [isShowingInput, setIsShowingInput] = useState(false);
  const [isWithMaintenance, setIsWithMaintenance] = useState(false);
  const inputsContentSize = useRef(new Animated.Value(0)).current;

  const handleSwitch = switchState => {
    if (switchState.state) {
      // Animated.timing(inputsContentSize, {
      //   toValue: 1,
      //   duration: 1200,
      //   useNativeDriver: false,
      // }).start();

      setIsShowingInput(switchState);
    }
    setIsWithMaintenance(switchState.state);
  };

  return (
    <S.Container>
      <S.Select>
        <Switch handleSwitch={handleSwitch} />
        <S.Text>Manutenção</S.Text>
        {isWithMaintenance && (
          <TouchableOpacity onPress={() => setIsShowingInput(true)}>
            <Icon
              name={'eye'}
              size={24}
              color={`${global.colors.purpleColor}`}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        )}
      </S.Select>
      {isShowingInput && (
        <S.InputsContainer>
          <S.TextContent>
            <S.Text>Manutenção</S.Text>
          </S.TextContent>
          <S.CloseButtonContent onPress={() => setIsShowingInput(false)}>
            <S.CloseButton>
              <Icon name={'close'} size={18} color={'white'} />
            </S.CloseButton>
          </S.CloseButtonContent>
          <S.InputsContent>{renderInputs()}</S.InputsContent>
        </S.InputsContainer>
      )}
    </S.Container>
  );
};
