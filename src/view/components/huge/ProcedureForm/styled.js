import styled from 'styled-components/native';
import global from '../../../../common/global';
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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const HeaderContent = styled.View`
  height: ${props => (props.isSigningUp ? '25%' : '15%')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  text-align: center;
  font-family: ${global.fonts.mainFont};
  font-size: 24px;
  color: ${global.colors.purpleColor};
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-family: ${global.fonts.auxiliarFont};
  text-align: center;
  margin-top: 10px;
`;

export const BodyContent = styled.View`
  height: 68%;
  display: flex;
  justify-content: space-evenly;
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

export const InformationContent = styled.View`
  width: ${props => (!props.isEditing ? '34%' : '95%')};
  height: 64%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const CheckboxContainer = styled.View`
  width: 73%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const CheckboxContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
  font-family: ${global.fonts.auxiliarFont};
  font-size: 16px;
  color: ${props => (props.isInView ? 'red' : 'black')};
`;

export const RegisteredProceduresBoxTitle = styled.Text`
  font-family: ${global.fonts.auxiliarFont};
  font-size: 16px;
`;

export const FooterContent = styled.View`
  height: 23%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`;

export const ButtonsContent = styled.View`
  margin: 10px 0 20px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AddButtonContent = styled.View`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

export const SubmitButtonContent = styled.View`
  margin: 0 10px 0 0;
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
  background-color: ${global.colors.purpleColor};
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



export const CloseButtonContent = styled.View``;

export const CloseButton = styled.View`
  background-color: ${global.colors.purpleColor};
  height: 50px;
  width: 60px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 50px;
  position: absolute;
  top: -70px;
  left: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
