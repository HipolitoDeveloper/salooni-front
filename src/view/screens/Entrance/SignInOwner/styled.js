import styled from 'styled-components/native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

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

export const Input = styled.TextInput`
  font-family: ${Fonts.AUXILIAR};
  width: 70%;
  border-bottom-width: 1px;
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

export const PasswordResetButton = styled.TouchableOpacity`
  width: 70%;
  display: flex;
  align-items: flex-end;
`;

export const PasswordResetText = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  font-size: ${props => props.screenHeight / 40}px;
  color: ${Colors.PURPLE};
`;

export const RegisterContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const RegisterText = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  font-size: ${props => props.screenHeight / 40}px;
`;

export const RegisterButton = styled.TouchableOpacity``;

export const RegisterButtonText = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  font-size: 16px;
  color: ${Colors.PURPLE};
`;

export const LoadingContent = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
