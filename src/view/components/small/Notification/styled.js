import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {backgroundColor} from 'react-native-calendars/src/style';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: ${Colors.DARK_BLUE};

  width: 100%;
  elevation: 5;
`;


export const NotificationMessage = styled.TouchableOpacity`
  width: 80%;
  font-family: ${Fonts.MAIN};
  margin-left: 10px;
  color: ${Colors.LIGHT_GREY};
  font-size: 16px;
`;

export const NotificationTitle = styled.Text`
  width: 80%;
  font-family: ${Fonts.MAIN};
  margin-left: 10px;
  color: ${Colors.LIGHT_GREY};
  font-size: 23px;
`;

export const NotificationText = styled.Text`
  width: 80%;
  font-family: ${Fonts.MAIN};
  margin-left: 10px;
  color: ${Colors.LIGHT_GREY};
  font-size: 14px;
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
  border: ${StyleSheet.hairlineWidth}px solid ${Colors.LIGHT_GREY}; ;
`;
