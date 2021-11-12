import styled from 'styled-components/native';
import global from '../../../../../common/global';
import {StyleSheet, Platform} from 'react-native';

export const Container = styled.View`
  border: ${StyleSheet.hairlineWidth}px solid ${props => props.headerColor};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 13%;
  background-color: ${global.colors.lightGreyColor};
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
  font-family: ${global.fonts.mainFont};
`;

export const HeaderTitleContent = styled.View``;

export const HeaderTitle = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 16px;
  color: ${props => props.headerColor};
`;

export const HeaderLine = styled.View`
  margin-top: 5px;
  height: 6px;
  width: 55px;
  background-color: ${props => props.headerColor};
`;
