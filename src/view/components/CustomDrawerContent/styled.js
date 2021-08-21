import styled from 'styled-components/native';
import global from '../../../common/global';
import {StyleSheet} from 'react-native';

export const Container = styled.ScrollView`
  height: 100%;
  padding-top: 10px;
`;

export const DrawerContent = styled.TouchableOpacity`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  border-bottom-color: ${global.colors.purpleColor};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`;

export const DrawerContentText = styled.Text`
  font-family: ${global.fonts.s};
  font-size: 18px;
  margin-left: 30px;
  color: ${props => (props.color ? global.colors.purpleColor : 'black')};
  font-weight: ${props => (props.color ? 'bold' : 'normal')};
`;

export const SalooniLogo = styled.Image`
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-width: 1px;
  border-color: ${global.colors.purpleColor};
  border-radius: 100px;
`;

export const ExitButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
`;
