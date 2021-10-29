import styled from 'styled-components/native';
import global from '../../../../common/global';
import {StyleSheet} from 'react-native';
import {backgroundColor} from 'react-native-calendars/src/style';

export const Container = styled.Pressable`
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: ${props => (props.itemSelected ? '60px' : '65px')};
  width: ${props => (props.itemSelected ? '95%' : '100%')};
  background-color: ${props => (props.itemSelected ? 'white' : 'transparent')};
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

export const InformationContent = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-left: ${props => (props.selected ? '40px' : '40px')};
`;

export const NameText = styled.Text`
  font-size: 16px;
  font-family: ${global.fonts.mainFont};
  opacity: ${props => (props.passedHour ? 0.4 : 1)};
  color: ${props =>
    props.nextHour ? `${global.colors.purpleColor}` : 'black'};
`;

export const TelText = styled.Text`
  font-size: 13px;
  font-family: ${global.fonts.mainFont};
  opacity: ${props => (props.passedHour ? 0.4 : 1)};
  color: ${props =>
    props.nextHour ? `${global.colors.purpleColor}` : 'black'};
`;

export const GenericText = styled.Text`
  font-size: 13px;
  font-family: ${global.fonts.mainFont};
`;

export const InlineInformationContent = styled.View`
  display: flex;
  flex-direction: row;
`;

export const DeleteIconContent = styled.View`
  border: 1px solid red;
  position: absolute;
  left: 2px;
  top: 20px;
  width: 20px;
  height: 20px;
  background-color: ${props => (props.selected ? props.color : 'transparent')};
  border: ${StyleSheet.hairlineWidth}px solid
    ${props => (props.selected ? 'transparent' : props.color)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  z-index: 5;
`;

export const RightContent = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
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
  margin-bottom: 23px;
  margin-right: 20px;
  height: 20px;
  width: 20px;
  background-color: ${props =>
    props.selected ? `${global.colors.purpleColor}` : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
`;
