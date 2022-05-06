import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import Colors from "../../../../../common/style/Colors";
import Fonts from "../../../../../common/style/Fonts";

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
  width: 100%;
  height: 100%;
`;

export const HeaderContent = styled.View`
  margin-top: 20px;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

export const HeaderTitle = styled.Text`
  text-align: center;

  font-family: ${Fonts.MAIN};
  font-size: 24px;
  color: ${Colors.BLUE};
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-family: ${Fonts.AUXILIAR};
  text-align: center;
`;

export const BodyContent = styled.View`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const ClientInformationContent = styled.View`
  height: 37%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

export const RegisteredProceduresBox = styled.View`
  margin-top: 10px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${Colors.PURPLE};
  height: 120px;
  width: 180px;
  border-radius: 10px;
`;

export const BoxContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

export const DateTextContent = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.borderBottomColor};
  height: 60px;
  margin-top: 20px;
`;

export const DateText = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  font-size: 18px;
  color: ${props => (props.isInView ? 'red' : 'black')};
`;

export const FooterContent = styled.View`
  height: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
`;

export const ButtonsContent = styled.View`
  margin: 10px 10px 20px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AddButtonContent = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SubmitButtonContent = styled.View`
  margin: 10px 10px 20px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const DeleteButton = styled.TouchableOpacity`
  margin-left: 20px;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  background-color: ${Colors.BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingContent = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
