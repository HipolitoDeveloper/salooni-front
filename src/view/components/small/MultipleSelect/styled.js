import styled from 'styled-components/native';
import global from '../../../../common/global';
import {StyleSheet, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 20px 0;
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
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SelectedContainerText = styled.Text`
  font-size: 16px;
  color: ${props =>
    props.selectTextColor ? `${props.selectTextColor}` : 'black'};
`;

export const EmptyItem = styled.View`
  background-color: transparent;
`;

export const ItemsContainer = styled.View`
  width: 100%;
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
  border-radius: 20px;
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
  elevation: 5;
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

export const SuggestionItemIcon = styled.TouchableOpacity`
  margin: 20px;
`;

export const SuggestionItemContent = styled.View`
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
