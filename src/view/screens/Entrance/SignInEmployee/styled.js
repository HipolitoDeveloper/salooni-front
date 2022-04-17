import styled from 'styled-components/native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.LIGHT_GREY};
`;

export const Content = styled.View`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const EmailMessage = styled.Text`
  width: 70%;
  margin-top: 10px;
  font-family: ${Fonts.AUXILIAR};
  font-size: 14px;
  text-align: center;
  color: ${Colors.PURPLE};
`;

export const Input = styled.TextInput`
  font-family: ${Fonts.AUXILIAR};
  width: 70%;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${Colors.PURPLE};
  color: black;
`;

export const SalooniLogo = styled.Image`
  width: 180px;
  height: 180px;
  border-width: 1px;
  border-color: ${Colors.PURPLE};
  border-radius: 100px;
`;
