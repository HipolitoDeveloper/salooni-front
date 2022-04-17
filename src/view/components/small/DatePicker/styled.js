import styled from "styled-components/native";
import Fonts from "../../../../common/style/Fonts";
import {StyleSheet} from "react-native";

export const DateTextContainer = styled.TouchableOpacity`
  height: 60px;
  display: flex;
  margin: 20px;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
`;

export const DateTextContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const DateText = styled.Text`
  margin-left: 10px;
  font-family: ${Fonts.AUXILIAR};
  font-size: 18px;
  color: ${props => (props.isInView ? 'red' : 'black')};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: black;
  width: 90%;
`;


export const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;
