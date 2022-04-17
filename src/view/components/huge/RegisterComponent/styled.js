import styled from 'styled-components/native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Content = styled.View`
  background-color: ${Colors.LIGHT_GREY};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ButtonsContent = styled.View``;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${props => props.color};
  position: absolute;
  bottom: ${props => props.bottom};
  right: 120px;
  padding: 10px;
  border-radius: 30px;
`;

export const AddMessage = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: 12px;
  opacity: 0.4;
`;
