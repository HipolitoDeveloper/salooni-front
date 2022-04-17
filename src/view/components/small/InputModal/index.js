import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useRef, useState} from 'react';
import {InputsContainer, InputsContent} from './styled';
import {Switch} from '../Switch';
import {Animated, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Colors from "../../../../common/style/Colors";

export const InputModal = ({
  children,
  inputTitle,
  name,
  handleSwitch,
                             switchState,
}) => {
  const [isShowingInput, setIsShowingInput] = useState(false);
  const [inputModal, setInputModal] = useState(false);
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const isSmallerScreen = screenHeight < 650;



  const changeSwitch = state => {
    handleSwitch(state.state);
    console.log("state", state)
    if (state.state) {
      handleInputModal(state.state);
      setIsShowingInput(state.state);
    }
  };

  const handleInputModal = state => {
    setInputModal(state);
  };

  return (
    <S.Container>
      <S.Select>
        <Switch
          handleSwitch={changeSwitch}
          switchState={switchState}
          backgroundColor={Colors.LIGHT_GREY}
          circleColor={Colors.PURPLE}
        />
        <S.Text screenHeight={screenHeight}>{inputTitle}</S.Text>
        {switchState && (
          <TouchableOpacity
            onPress={() => {
              setIsShowingInput(true);
              handleInputModal(true);
            }}>
            <Icon
              name={'eye'}
              size={screenHeight / 28}
              color={Colors.PURPLE}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        )}
      </S.Select>
      {isShowingInput && (
        <Modal
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          onBackButtonPress={() => handleInputModal(false)}
          isVisible={inputModal}
          onBackdropPress={() => handleInputModal(false)}
          onRequestClose={() => handleInputModal(false)}>
          <S.InputsContainer
            isSmallerScreen={isSmallerScreen}
            screenHeight={screenHeight}
            screenWidth={screenWidth}>
            <S.TextContent>
              <S.Text screenHeight={screenHeight}>{inputTitle}</S.Text>
            </S.TextContent>
            <S.CloseButtonContent
              screenWidth={screenWidth}
              onPress={() => setIsShowingInput(false)}>
              <S.CloseButton>
                <Icon name={'times'} size={18} color={'white'} />
              </S.CloseButton>
            </S.CloseButtonContent>
            <S.InputsContent>{children}</S.InputsContent>
          </S.InputsContainer>
        </Modal>
      )}
    </S.Container>
  );
};
