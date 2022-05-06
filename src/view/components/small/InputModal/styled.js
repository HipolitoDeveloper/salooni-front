import styled from 'styled-components/native/dist/styled-components.native.esm';
import {StyleSheet, Platform} from 'react-native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Container = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Select = styled.View`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const TextContent = styled.View`
  margin-top: 10px;
  width: 100%;
  padding-left: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Text = styled.Text`
  font-size: ${props => `${props.screenHeight / 40}px}`};
  font-family: ${Fonts.MAIN};
`;

export const InputsContainer = styled.View`
  display: flex;
  margin: auto auto;
  border-radius: 40px;
  background-color: white;
  min-height: 230px;
  width: ${props =>
          props.isSmallerScreen
                  ? `${props.screenWidth / 1.25}px}`
                  : `${props.screenWidth / 1.3}px}`};
  height: ${props =>
          props.isSmallerScreen
                  ? `${props.screenHeight / 3}px}`
                  : `${props.screenHeight / 4}px}`};
  elevation: 5;
`;

export const InputsContent = styled.View`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CloseButtonContent = styled.TouchableOpacity`
  background-color: ${Colors.PURPLE};
  height: 50px;
  width: 60px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 50px;
  position: absolute;
  top: 0;
  left: ${props =>
          Platform.OS === 'ios' ? '252px' : props.screenWidth / 1.60}px;
  display: flex;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;

export const CloseButton = styled.View``;
