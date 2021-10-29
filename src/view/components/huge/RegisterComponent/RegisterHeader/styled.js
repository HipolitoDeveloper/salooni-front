import styled from 'styled-components/native';
import global from '../../../../../common/global';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  border: ${StyleSheet.hairlineWidth}px solid ${props => props.headerColor};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 13%;
  background-color: ${global.colors.lightGreyColor};
  elevation: 10;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 70%;
  width: 100%;
`;

export const CancelButton = styled.TouchableOpacity``;

export const ConfirmButton = styled.TouchableOpacity`
  opacity: ${props => (props.isEditing ? 0.6 : 1)};
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
