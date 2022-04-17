import styled from 'styled-components/native';
import Fonts from "../../../../common/style/Fonts";

export const Container = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: ${props => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  font-family: ${Fonts.MAIN};
  color: ${props => props.textColor};
  font-weight: bold;
`;
