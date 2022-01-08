import styled from "styled-components/native";
import global from "../../../../common/global";
import { StyleSheet, Dimensions, FlatList } from "react-native";


const screenHeight = Dimensions.get("screen").height;

export const EventsContainer = styled.View`
  background-color: ${global.colors.lightGreyColor};
  height: 100%;
  width: 100%;

`;


export const EventWrapper = styled.View`  
  width: 100%;
  height: 100%;
  padding: 15px 20px;`
;

export const EventContent = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${global.colors.purpleColor};
  padding: 10px 0;
  background-color: ${props => props.nextHour ? `${global.colors.purpleColor}` : "transparent"}
`;

export const LeftContent = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const HourText = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 16px;
  opacity: ${props => props.passedHour ? "0.6" : "1"};
  color: ${props => props.nextHour ? `${global.colors.lightGreyColor}` : ` ${global.colors.purpleColor}`}

`;

export const ClientText = styled.Text`
  font-family: ${global.fonts.mainFont};
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
  font-family: ${global.fonts.mainFont};
  font-size: 16px;
  opacity: ${props => props.passedHour ? "0.6" : "1"};
`;


export const EmptyList = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 16px;
  color:${global.colors.purpleColor}
`


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
  background-color: ${global.colors.purpleColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  elevation: 10;
`;
