import styled from 'styled-components/native';
import global from '../../../../common/global';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  width: 100%;
  height: 17%;
  background-color: ${global.colors.headerColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  border-bottom-color: lightgrey;

  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`;

export const Content = styled.View`
  width: 100%;
  height: ${props => (props.isSearching ? '100%  ' : '62%')};
  display: flex;
  flex-direction: ${props => (props.isSearching ? 'column  ' : 'row')};
  justify-content: ${props =>
    props.isSearching ? 'flex-start  ' : 'space-between'};
  align-items: center;
`;

export const TitleName = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 24px;
  color: ${props => props.headerColor};
  letter-spacing: 2px;
  margin-top: 10px;
`;

export const DeleteContent = styled.View`
  padding: 0 20px 0 30px;
  background-color: ${props => props.headerColor};
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: absolute;
  left: 30px;
  bottom: 10px;
`;

export const SearchIcon = styled.View``;
export const CancelInput = styled.TouchableOpacity``;
export const SearchInput = styled.TextInput`
  color: black;
  width: 70%;
  font-size: 16px;
  opacity: 0.6;
  font-family: ${global.fonts.mainFont};
`;

export const SwitchContent = styled.View``;

export const SwitchButton = styled.TouchableOpacity`
  position: absolute;
  left: 80px;
  top: -10px;
`;

export const ChangeIconContent = styled.TouchableOpacity`
  margin: 10px 0 0 10px;
  transform: scaleX(-1);
`;
