import styled from 'styled-components/native';
import global from '../../../../common/global';

export const Wrapper = styled.View`
  align-items: flex-end;
  justify-content: flex-end;
`;

export const CloseButtonContent = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

export const CloseButton = styled.View`
  background-color: ${props => props.color};
  width: 60px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

export const Container = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 75%;
`;

export const Content = styled.View`
  padding-top: 20px;
  background-color: ${props => props.color};
  width: 100%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

export const ConfimationMessageContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfimationMessageText = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: ${props => props.screenHeight / 40}px;
  margin-top: 15px;
  text-align: center;
  color: ${global.colors.lightGreyColor};
`;

export const ItemInformation = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40%;
`;
export const ItemProperty = styled.Text`
  font-family: ${global.fonts.mainFont};
  margin: 10px 0 20px 0;
  font-size: ${props => props.screenHeight / 45}px;
  color: ${global.colors.lightGreyColor};
`;

export const ProcedureContainer = styled.View`
  height: 60%;
`;

export const ProcedureContent = styled.TouchableOpacity`
  background-color: ${global.colors.lightGreyColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 40px;
  margin-bottom: 10px;
  padding: ${props => props.screenHeight / 165}px;
  max-width: 300px;
`;

export const ProcedureDeleteIcon = styled.View`
  margin-left: 5px;
`;

export const ProcedureText = styled.Text`
  margin-left: 20px;
  font-family: ${global.fonts.mainFont};
  font-size: ${props => props.screenHeight / 60}px;
  padding: 10px;
`;

export const FooterButtons = styled.View`
  display: flex;
  flex-direction: ${props => (props.isSmallerScreen ? 'row' : 'column')};
  align-items: flex-end;
  justify-content: flex-end;
  height: 20%;
  margin-top: 20px;
`;
