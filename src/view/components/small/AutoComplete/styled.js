import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import global from '../../../../common/global';

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0 20px 0;
`;

export const InputContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const InputContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SuggestionContent = styled.View`
  width: 90%;
  max-height: 110px;
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 5;
  background-color: white;
  elevation: 20;
`;

export const IconContainer = styled.View`
  display: flex;
  justify-content: center;
`;

export const Input = styled.TextInput`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  width: 90%;
  font-size: 16px;
  color: black;
`;

export const InputItem = styled.TouchableOpacity`
  border: ${StyleSheet.hairlineWidth}px solid lightgrey;
`;

export const InputText = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 12px;
  margin: 5px;
`;

export const InputTitle = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 12px;
  position: absolute;
  left: 35px;
  top: 0;
  color: ${props => props.color};
`;

export const ClearButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`;
