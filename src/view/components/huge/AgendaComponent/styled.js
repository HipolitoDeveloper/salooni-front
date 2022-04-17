import styled from "styled-components/native";
import { StyleSheet, Dimensions, FlatList } from "react-native";
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";


const screenHeight = Dimensions.get("screen").height;

export const DayWrapper = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${props => props.selected? `1px solid ${Colors.PURPLE}  `: 'none'};
  padding: 5px;
  border-radius: 2px;
`;

export const DayText = styled.Text`
  font-family: ${Fonts.MAIN};
  opacity: ${props => props.state === 'disabled'? '0.3' : '1'};
  color: ${props => props.state === 'today'? `${Colors.PURPLE}`: 'black'};
`;

export const DayEvent = styled.View`
  border-radius: 5px;
  height: 5px;
  width: 80%;
  background-color: ${Colors.PURPLE};;

`;
export const EmptyMessageWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const EmptyMessageText = styled.Text`
  font-family: ${Fonts.MAIN};
`


export const EventsContainer = styled.View`
  background-color: ${Colors.LIGHT_GREY};
  width: 100%;
  flex:1;

`;
export const EventWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  padding: 15px 20px;
  
  `


;

export const EventContent = styled.View`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${Colors.PURPLE};
  padding: 10px 10px;
  background-color: ${props => props.nextHour ? `${Colors.PURPLE}` : "transparent"}

`

export const LeftContent = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const HourText = styled.Text`
  font-family: ${Fonts.AUXILIAR};
  font-size: 16px;
  opacity: ${props => props.passedHour ? "0.6" : "1"};
  color: ${props => props.nextHour ? `${Colors.LIGHT_GREY}` : ` ${Colors.PURPLE}`}

`;

export const ClientText = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: 18px;
  opacity: ${props => props.passedHour ? "0.6" : "1"};

`;

export const RightContent = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const TelText = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: 16px;
  opacity: ${props => props.passedHour ? "0.6" : "1"};
  height: 30px;

`;


export const EmptyList = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: 16px;
  color: ${Colors.PURPLE}
`;


export const ModalContent = styled.View`
  display: flex;
  margin: auto auto;
  border-radius: 40px;
  background-color: transparent;
  width: 100%;
  height: 100%;
`;

export const CloseButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseButtonContent = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 100px;
  background-color: ${Colors.PURPLE};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  elevation: 10;
`;
