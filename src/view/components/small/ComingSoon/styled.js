import styled from "styled-components/native";
import Fonts from "../../../../common/style/Fonts";

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Description = styled.Text`  
  width:70%;
  font-size: 20px;
  text-align: center;
  font-family: ${Fonts.MAIN};
`;
