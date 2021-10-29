import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

export const TabArea = styled.View`
  border-top-width: ${StyleSheet.hairlineWidth}px;
  height: 60px;
  background-color: white;
  flex-direction: row;
  border-top-color: lightgrey;
  elevation: 10;
`;
export const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
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
