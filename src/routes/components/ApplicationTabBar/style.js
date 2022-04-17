import styled from 'styled-components/native';
import {StyleSheet, Platform} from 'react-native';

export const TabArea = styled.View`
  border-top-width: ${StyleSheet.hairlineWidth}px;
  height: ${Platform.OS === "ios" ? '100px' : '60px'};
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top-color: lightgrey;
  elevation: 10;
  padding-bottom: ${Platform.OS === "ios" ? '30px' : '0'};
`;
export const TabItem = styled.TouchableOpacity``;
export const TabItemCenter = styled.View`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid #337984;
  margin-top: -20px;
`;
