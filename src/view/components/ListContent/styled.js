import styled from 'styled-components/native';
import global from '../../../common/global';
import {StyleSheet} from 'react-native';

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 65px;
`;

export const LeftSwipeableContent = styled.TouchableOpacity`
  background-color: ${global.colors.purpleColor};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
`;

export const LeftContent = styled.View`
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const NameText = styled.Text`
  font-size: 18px;
  opacity: ${props => (props.passedHour ? 0.4 : 1)};
  color: ${props =>
    props.nextHour ? `${global.colors.purpleColor}` : 'black'};
`;

export const ScheduledDadeText = styled.Text`
  opacity: ${props => (props.passedHour ? 0.4 : 1)};
  color: ${props =>
    props.nextHour ? `${global.colors.purpleColor}` : 'black'};
  font-size: 13px;
`;

export const TelephoneText = styled.Text``;

export const InformationContent = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const CalendarIconContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 10px;
  margin-left: 20px;
`;

export const RightContent = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  padding-right: 10px;
`;

export const MenuIconContent = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 10px;
  margin-left: 20px;
`;

export const CheckContent = styled.View`
  border: ${StyleSheet.hairlineWidth}px solid black;
  border-radius: 100px;
  height: 20px;
  width: 20px;
  position: absolute;
  right: 110px;
  top: 20px;
  background-color: ${props =>
    props.selected ? `${global.colors.purpleColor}` : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
`;
