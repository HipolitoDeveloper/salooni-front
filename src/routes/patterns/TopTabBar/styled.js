import styled from 'styled-components/native';
import global from '../../../common/global';
import {StyleSheet, Platform, Dimensions} from 'react-native';

export const Container = styled.View`
  background-color: ${global.colors.lightGreyColor};
  border: ${StyleSheet.hairlineWidth}px solid ${props => props.headerColor};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${props => (props.isSmallerScreen ? '20%' : '16%')};
`;

export const Content = styled.View`
  background-color: ${global.colors.lightGreyColor};
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: ${Platform.OS === 'ios' ? '10px' : '20px'};
  margin-top: ${Platform.OS === 'ios' ? '40px' : '5px'};
`;

export const ButtonContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 12px;
  color: black;
  opacity: 0.4;
  font-family: ${global.fonts.mainFont};
`;

export const CancelButton = styled.TouchableOpacity`
  elevation: 10;
`;

export const ConfirmButton = styled.TouchableOpacity`
  elevation: 10;

  opacity: ${props => (props.isConfirmAvailable ? 1 : 0.4)};
`;

export const HeaderTitleContainer = styled.View`
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.isOneOption ? 'center' : 'space-between')};
  align-items: flex-start;
`;

export const HeaderTitleContent = styled.TouchableOpacity`
  padding: 0 10px 0 10px;
`;

export const HeaderTitle = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: ${props => props.screenHeight / 45}px;
  color: ${props => props.headerColor};
`;

export const ExitButtonContent = styled.View`
  position: absolute;
  right: 10px;
  top: 20px;
  width: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ExitButtonText = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 12px;
  font-weight: bold;
`;

export const ExitButton = styled.TouchableOpacity``;
