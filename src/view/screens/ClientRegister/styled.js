import styled from 'styled-components/native';
import global from '../../../common/global';
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const HeaderContent = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 10px;
`;

export const HeaderTitle = styled.Text`
  margin: 60px 0 30px 0;
  font-family: ${global.fonts.g};
  font-size: 26px;
  color: ${global.colors.blueColor};
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-family: ${global.fonts.s};
  text-align: center;
`;

export const BodyContent = styled.View`
  flex: 2;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const ClientInformationContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

export const InformationContent = styled.View`
  width: 34%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const RegisteredProceduresContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const RegisteredProceduresBox = styled.View`
  margin-top: 10px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${global.colors.purpleColor};
  height: 120px;
  width: 180px;
  border-radius: 10px;
`;

export const BoxContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

export const BoxText = styled.Text`
  font-family: ${global.fonts.s};
  font-size: 18px;
`;

export const RegisteredProceduresBoxTitle = styled.Text`
  font-family: ${global.fonts.s};
  font-size: 16px;
`;

export const FooterContent = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
`;

export const AddButtonContent = styled.View`
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SubmitButtonContent = styled.View`
  margin: 30px 10px 20px 0;
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
