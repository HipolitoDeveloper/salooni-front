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
  font-size: 16px;
  text-align: center;
  color: ${global.colors.lightGreyColor};
`;

export const ItemInformation = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: ${props => (props.hasProcedure ? 3 : 1)};
`;
export const ItemProperty = styled.Text`
  font-family: ${global.fonts.mainFont};
  margin: 20px 0 20px 0;
  font-size: 20px;
  color: ${global.colors.lightGreyColor};
`;

export const ProcedureContainer = styled.View`
  height: 75%;
`;

export const ProcedureContent = styled.TouchableOpacity`
  background-color: ${global.colors.lightGreyColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 40px;
  margin-bottom: 10px;
  padding: 10px;
  max-width: 300px;
`;

export const ProcedureDeleteIcon = styled.View`
  margin-left: 5px;
`;

export const ProcedureText = styled.Text`
  margin-left: 20px;
  font-family: ${global.fonts.mainFont};
  font-size: 16px;
  padding: 10px;
`;

export const FooterButtons = styled.View`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex: 1;
`;
