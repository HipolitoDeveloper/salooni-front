import styled from 'styled-components/native';
import global from '../../../../common/global';
import {StyleSheet, Dimensions} from 'react-native';

export const ModalContainer = styled.View``;

export const ModalContent = styled.View`
  display: flex;
  margin: auto auto;
  border-radius: 40px;
  background-color: transparent;
  width: 90%;
  height: 90%;
`;

export const CloseButtonContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseButtonContent = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 100px;
  background-color: ${global.colors.purpleColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  elevation: 10;
`;

export const DayContainer = styled.TouchableOpacity`
  height: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${props => props.color};
  border-radius: 10px;
  margin: 30px 1px 5px 5px;
`;

export const ScheduleAddButton = styled.View``;

export const DayContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Day = styled.Text`
  font-size: 12px;
  font-family: ${global.fonts.mainFont};
  color: ${global.colors.lightGreyColor};
  font-weight: ${props => (props.color !== 'black' ? 'bold' : 'normal')};
`;

export const DayName = styled.Text`
  font-size: 12px;

  font-family: ${global.fonts.mainFont};
  color: ${global.colors.lightGreyColor};
  font-weight: ${props => (props.color !== 'black' ? 'bold' : 'normal')};
`;
