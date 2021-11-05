import styled from 'styled-components/native';
import global from '../../../../common/global';
import {StyleSheet, Platform} from 'react-native';

export const Container = styled.View`
  width: 100%;
  background-color: ${global.colors.headerColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  elevation: 10;
  padding-top: ${Platform.OS === 'ios' ? '40px' : '0'};
`;

export const Content = styled.View`
  padding-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const SubHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleName = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 24px;
  color: ${props => props.headerColor};
  letter-spacing: 2px;
  margin: 0 auto;
`;

export const DeleteContent = styled.View`
  padding: 0 20px 0 30px;
  background-color: ${props => props.headerColor};
  height: 200%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
`;

export const DeleteText = styled.Text`
  font-family: ${global.fonts.mainFont};
  color: ${global.colors.lightGreyColor};
  font-size: 18px;
`;

export const DeleteCancelIcon = styled.TouchableOpacity`
  border-radius: 20px;
  padding: 10px;
  border: 1px solid white;
`;

export const IconContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 40px;
  position: absolute;
  left: 15px;
`;

export const SearchIconContainer = styled.TouchableOpacity`
  margin-right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 30px;
`;

export const SearchContainer = styled.View`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: black;
`;

export const SearchIcon = styled.View``;
export const CancelInput = styled.TouchableOpacity``;
export const SearchInput = styled.TextInput`
  color: black;
  width: 70%;
  font-size: 16px;
  opacity: 0.6;
  font-family: ${global.fonts.mainFont};
  height: 40px;
`;

export const SwitchContent = styled.View``;

export const SwitchButton = styled.TouchableOpacity`
  position: absolute;
  left: 80px;
  top: -10px;
`;

export const ChangeIconContent = styled.TouchableOpacity`
  height: 100%;
  position: absolute;
  right: 50px;
  transform: scaleX(-1);
`;
