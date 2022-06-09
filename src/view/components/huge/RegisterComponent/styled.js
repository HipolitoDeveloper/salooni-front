import styled from 'styled-components/native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Content = styled.View`
  background-color: ${Colors.LIGHT_GREY};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  flex: 5;
  
`;

export const Footer = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1
`

export const ButtonsContent = styled.View``;

export const CancelButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.color};
  padding: 10px;
`;


export const AddMessage = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: 12px;
  opacity: 0.4;
`;
