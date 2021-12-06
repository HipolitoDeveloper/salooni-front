import styled from 'styled-components/native';
import global from '../../../../common/global';
import {StyleSheet} from 'react-native';
import {backgroundColor} from 'react-native-calendars/src/style';

export const Container = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  background-color: white;
  width: 100%;
  elevation: 5;
`;

export const Content = styled.View`
  margin-top: 0;
  font-size: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${global.colors.darkBlueColor};
  elevation: 30;
`;

export const NotificationMessage = styled.TouchableOpacity`
  width: 80%;
  font-family: ${global.fonts.mainFont};
  margin-left: 10px;
  color: ${global.colors.lightGreyColor};
  font-size: 16px;
`;

export const NotificationText = styled.Text`
  width: 80%;
  font-family: ${global.fonts.mainFont};
  margin-left: 10px;
  color: ${global.colors.lightGreyColor};
  font-size: 16px;
`;

export const CloseButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 200px;
  margin-right: 10px;
  margin-left: 10px;
  width: 30px;
  height: 30px;
  border: ${StyleSheet.hairlineWidth}px solid ${global.colors.lightGreyColor}; ;
`;
