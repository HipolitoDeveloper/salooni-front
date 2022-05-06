import styled from "styled-components/native";
import Fonts from "../../../../common/style/Fonts";
import {StyleSheet} from "react-native";


export const DateTextContainer = styled.TouchableOpacity`
  margin-top: 20px;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: ${props => (props.width ?? '100%')};
`;

export const DateTextContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const DateText = styled.Text`
  margin-left: ${props => (props.hasIcon ? "10px" : "0px")};
  font-family: ${Fonts.AUXILIAR};
  font-size: ${props => (props.fontSize ?? '18px')};;
  color: ${props => (props.isInView ? 'red' : 'black')};
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.color ?? 'black')};
  width: 100%;
  padding-bottom: 10px;

`;


export const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;
