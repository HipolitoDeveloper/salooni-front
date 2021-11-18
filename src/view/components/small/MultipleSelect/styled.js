import styled from 'styled-components/native';
import global from '../../../../common/global';
import {StyleSheet, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const IconContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

export const SelectedContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContent = styled.View`
  display: flex;
`;

export const EmptyItem = styled.View`
  background-color: transparent;
`;

export const ItemsContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

export const BrushIcon = styled.TouchableOpacity`
  margin-left: 10px;
  border: 3px solid ${props => props.selectedItemBorderColor};
  border-radius: 50px;
  width: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputText = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 12px;
  position: absolute;
  left: 5px;
  top: -10px;
  color: ${props => props.color};
`;

export const SelectedContent = styled.View`
  border: 1px solid ${props => props.selectedItemBorderColor};
  border-radius: 30px;
  height: 35px;
  margin: 4px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  flex-grow: 1;
`;

export const SelectedContentText = styled.Text`
  margin-left: 10px;
`;

export const SelectedContentIcon = styled.TouchableOpacity`
  margin-left: 10px;
  border: 3px solid ${props => props.selectedItemBorderColor};
  border-radius: 50px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View``;

export const SuggestionContainer = styled.View`
  border-radius: 10px;
  background-color: white;
  elevation: 30;
`;

export const SuggestionContent = styled.View``;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const SuggestionHeader = styled.View`
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const SuggestionHeaderText = styled.Text`
  font-size: 20px;
  margin: 20px;
`;

export const SuggestionBody = styled.View`
  height: ${windowHeight * 0.45}px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const SuggestionItemIcon = styled.View`
  margin: 20px;
`;

export const SuggestionItemContent = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: grey;
`;

export const SuggestionItemText = styled.Text`
  font-size: 16px;
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
