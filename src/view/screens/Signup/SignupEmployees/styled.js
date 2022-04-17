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
  flex: 1;
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
  margin: 60px 0 30px 0;
  font-family: ${Fonts.MAIN};
  font-size: 24px;
  color: ${Colors.PURPLE};
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-family: ${Fonts.AUXILIAR};
  text-align: center;
`;
export const BodyContent = styled.View`
  flex: 3;
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

export const AddButtonContent = styled.View`
  margin-top: 5px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SubmitButtonContent = styled.View`
  margin: 20px 10px 20px 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const LoadingContent = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
