import styled from 'styled-components/native';

import {StyleSheet} from 'react-native';
import Colors from "../../../../../common/style/Colors";
import Fonts from "../../../../../common/style/Fonts";

export const Container = styled.View`
  background-color: ${Colors.HEADER_COLOR};
  width: 100%;
  height: 14%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Platform.OS === "ios" ? '10px' : '0'};
`;

export const IconContent = styled.View`
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 40px;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ChangeIconContent = styled.TouchableOpacity`
  margin: 10px ${props => (props.employeeView ? `10px` : 0)} 0 10px;
  transform: scaleX(1);
`;

export const TitleName = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: 24px;
  color: ${props => props.headerColor};
  letter-spacing: 2px;
  margin-top: 10px;
`;

export const EmployeeName = styled.Text`
  position: absolute;
  bottom: 10px;
  right: 100px;
  font-family: ${Fonts.MAIN};
  font-size: 16px;
  color: ${props => props.headerColor};
  opacity: 0.8;
`;
