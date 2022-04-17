import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import Colors from "../../../../../common/style/Colors";
import Fonts from "../../../../../common/style/Fonts";


export const Content = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: auto auto;
  padding: 20px;
  border-radius: 20px;
  border-color: ${Colors.PURPLE};
  border-width: ${StyleSheet.hairlineWidth}px;
  width: 80%;
  min-height: 150px;
  background-color: white;
  elevation: 10;
`;

export const HeaderContent = styled.View``;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  font-family: ${Fonts.AUXILIAR};
`;

export const BodyContent = styled.View``;

export const BodyText = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  color: ${Colors.RED};
  margin: 10px 0;
`;

export const FooterContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const Button = styled.TouchableOpacity`
  color: lightgrey;
  padding: 5px;
  font-weight: bold;
`;


export const ButtonText = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  color: ${Colors.PURPLE};
  font-weight: bold;
`;
