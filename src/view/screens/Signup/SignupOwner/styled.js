import styled from 'styled-components/native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.LIGHT_GREY};
`;

export const Content = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100%;
`;

export const HeaderContainer = styled.View`
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  margin: 20px 0 30px 0;
  font-family: ${Fonts.AUXILIAR};
  font-size: 24px;
  color: ${Colors.PURPLE};
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-family: ${Fonts.AUXILIAR};
  text-align: center;
`;

export const BodyContent = styled.View`
  flex: 4;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const FooterContent = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-end;
  width: 100%;
`;
