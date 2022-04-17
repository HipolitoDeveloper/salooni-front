import styled from 'styled-components/native';
import {StyleSheet, Platform} from 'react-native';
import Colors from "../../../../../common/style/Colors";
import Fonts from "../../../../../common/style/Fonts";

export const Container = styled.View`
  border: ${StyleSheet.hairlineWidth}px solid ${props => props.headerColor};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 13%;
  background-color: ${Colors.LIGHT_GREY};
  elevation: 10;
  padding-top: ${Platform.OS === 'ios' ? '40px' : '0'};
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 70%;
  width: 100%;
`;

export const ButtonContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
  elevation: 10;
`;

export const ConfirmButton = styled.TouchableOpacity`
  elevation: 10;
  opacity: ${props => (props.isEditing || props.disabled ? 0.3 : 1)};
`;

export const ButtonText = styled.Text`
  font-size: 12px;
  color: black;
  opacity: 0.4;
  font-family: ${Fonts.MAIN};
`;

export const HeaderTitleContent = styled.View``;

export const HeaderTitle = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: ${props => props.screenHeight / 46}px;
  color: ${props => props.headerColor};
`;

export const HeaderLine = styled.View`
  margin-top: ${props => props.screenHeight / 140}px;
  height: 6px;
  width: 55px;
  background-color: ${props => props.headerColor};
`;
