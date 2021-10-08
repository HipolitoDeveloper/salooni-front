import ActionButton from 'react-native-circular-action-menu';
import global from '../../../common/global';
import * as S from '../../screens/MainScreens/Client/Clients/styled';
import React from 'react';
import {View} from 'react-native';

const FloatButton = ({onPress, buttonColor}) => {
  return (
    <View
      style={{
        position: 'absolute',
        right: 0,
        bottom: 100,
        elevation: 10,
      }}>
      <S.ActionButtonContainer>
        <ActionButton buttonColor={buttonColor} onPress={onPress} />
      </S.ActionButtonContainer>
    </View>
  );
};

export default FloatButton;
