import styled from 'styled-components/native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Content = styled.View`
  font-family: ${Fonts.AUXILIAR};
  color: white;
  background-color: ${Colors.PURPLE};
  height: 100%;
`;

export const ContentButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${Colors.LIGHT_GREY};
  border-radius: 30px;
  background-color: ${props => props.buttonColor};
`;

export const ContentButtonText = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  color: ${Colors.LIGHT_GREY};
  font-size: ${props => props.fontSize}; ;
`;
