import styled from 'styled-components/native';
import Fonts from "../../../../../common/style/Fonts";
import Colors from "../../../../../common/style/Colors";

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
  font-family: ${Fonts.MAIN};
  font-size: ${props => props.screenHeight / 40}px;
  margin-top: 15px;
  text-align: center;
  color: ${Colors.LIGHT_GREY};
`;

export const ScheduleButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;  
`

export const ScheduleContent = styled.View`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 5px;
  margin-right: -10px;
  border: 1px solid ${Colors.LIGHT_GREY};
`

export const ScheduleText = styled.Text`
  font-family: ${Fonts.MAIN};
  color: ${Colors.LIGHT_GREY};
  margin: 0 20px 0 10px;
`

export const ItemInformationWrapper = styled.View`
  flex: 5;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const ItemProperty = styled.Text`
  font-family: ${Fonts.MAIN};
  margin: 10px 0 20px 0;
  font-size: ${props => props.screenHeight / 45}px;
  color: ${Colors.LIGHT_GREY};
`;

export const ProcedureContainer = styled.View`
  height: 60%;
`;

export const ProcedureContent = styled.TouchableOpacity`
  background-color: ${Colors.LIGHT_GREY};
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
  font-family: ${Fonts.MAIN};
  font-size: ${props => props.screenHeight / 60}px;
  padding: 10px;
`;

export const FooterButtons = styled.View`
  flex: 2;
  display: flex;
  flex-direction: ${props => (props.isSmallerScreen ? 'row' : 'column')};
  align-items: flex-end;
  justify-content: flex-end;
  height: 20%;
  margin-top: 20px;
  
`;
