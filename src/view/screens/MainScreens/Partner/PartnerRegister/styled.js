import styled from 'styled-components/native';
import global from '../../../../../common/global';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${global.colors.lightGreyColor};
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

  font-family: ${global.fonts.g};
  font-size: 24px;
  color: ${global.colors.lightBlueColor};
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-family: ${global.fonts.s};
  text-align: center;
`;

export const BodyContent = styled.View`
  height: 68%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RegisteredProceduresContent = styled.View`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 100px;
`;

export const RegisteredProceduresBox = styled.ScrollView`
  margin-top: 10px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${global.colors.lightBlueColor};
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
  font-family: ${global.fonts.s};
  font-size: 18px;
  color: ${props => (props.isInView ? 'red' : 'black')};
`;

export const RegisteredProceduresBoxTitle = styled.Text`
  font-family: ${global.fonts.s};
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
  background-color: ${global.colors.lightBlueColor};
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
