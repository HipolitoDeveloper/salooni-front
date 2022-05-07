import styled from 'styled-components/native/dist/styled-components.native.esm';
import Fonts from "../../../../common/style/Fonts";
import {StyleSheet} from "react-native";

export const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

`;

export const InputContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5px;

`;

export const InputTitle = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: ${props => `${props.screenHeight / 50}px`};
  position: absolute;
  left: 0;
  top: -5px;
  color: ${props => props.color};
`;

export const ShowPasswordButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 10px;
`;

export const MessageBox = styled.View`
  width: 100%;
  margin-top: 3px;
  z-index: 5;
  background-color: white;
  border-radius: 5px;
  elevation: 2;
`;

export const InputPlaceholder = styled.Text`
  font-family: ${Fonts.MAIN};
  color: grey
`
