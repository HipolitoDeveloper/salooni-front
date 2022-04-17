import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
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
  color: ${Colors.DARK_GREY};
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-family: ${Fonts.AUXILIAR};
  text-align: center;
`;

export const BodyContent = styled.View`
  height: 68%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const noProceduresText = styled.Text`
  font-size: 12px;
  font-family: ${Fonts.AUXILIAR};
  font-weight: bold;
  font-style: italic;
`;

export const RegisteredProceduresBox = styled.ScrollView`
  margin-top: 10px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${Colors.DARK_GREY};
  width: 90%;
  border-radius: 10px;
`;

export const BoxContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  width: 100%;
`;

export const BoxText = styled.Text`
  margin: 5px;
  font-family: ${Fonts.AUXILIAR};
  font-size: 18px;
  color: ${props => (props.isInView ? 'red' : 'black')};
`;

export const RegisteredProceduresBoxTitle = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  font-size: 16px;
`;

export const FooterContent = styled.View`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ButtonsContent = styled.View`
  margin: 20px 10px 0 0;
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
  margin-bottom: 30px;
  width: 90%;
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
  background-color: ${Colors.LIGHT_BLUE};
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
