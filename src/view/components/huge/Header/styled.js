import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Container = styled.View`
  width: 100%;
  height: 17%;
  background-color: ${Colors.BACKGROUND_COLOR};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

export const Content = styled.View`
  width: 100%;
  height: ${props => (props.searchMode ? '100%  ' : '62%')};
  display: flex;
  flex-direction: ${props => (props.searchMode ? 'column  ' : 'row')};
  justify-content: ${props =>
    props.searchMode ? 'space-around  ' : 'space-between'};
  align-items: center;
`;

export const TitleName = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: 24px;
  color: ${props => props.headerColor};
  letter-spacing: 2px;
`;

export const IconContent = styled.View`
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.headerColor};
  height: 50px;
  width: 50px;
  border-radius: 40px;
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
  padding-bottom: 15px;
`;

export const SearchIcon = styled.View``;
export const CancelIcon = styled.TouchableOpacity``;
export const SearchInput = styled.TextInput`
  color: black;
  width: 70%;
  position: absolute;
  left: 30px;
  bottom: 0;
  font-size: 16px;
  opacity: 0.6;
  font-family: ${Fonts.MAIN};
`;

export const SwitchContent = styled.View``;

export const SwitchButton = styled.TouchableOpacity`
  position: absolute;
  left: 80px;
  top: -10px;
`;
