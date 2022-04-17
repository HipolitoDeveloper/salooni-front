import styled from 'styled-components/native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";
import {StyleSheet} from 'react-native';

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
  justify-content: center;
  align-items: center;
  width: 100%;
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
  font-family: ${Fonts.MAIN};
  text-align: center;
`;

export const BodyContent = styled.View`
  flex: 2;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const ProcedureInformationContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

export const PriceContent = styled.View`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CheckboxContent = styled.View`
  margin-top: 30px;
  width: 73%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const RegisteredProceduresContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const RegisteredProceduresBox = styled.ScrollView`
  margin-top: 10px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${Colors.PURPLE};
  height: 180px;
  width: 180px;
  border-radius: 10px;
`;

export const BoxContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

export const BoxText = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  font-size: 16px;
  color: ${props => (props.isInView ? 'red' : 'black')};
`;

export const RegisteredProceduresBoxTitle = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  font-size: 16px;
`;

export const FooterContent = styled.View`
  flex: 1;
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
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const DeleteButton = styled.TouchableOpacity`
  margin-left: 20px;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  background-color: ${Colors.PURPLE};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonContent = styled.View`
  margin: 0 10px 20px 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
