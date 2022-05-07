import styled from "styled-components/native";
import { StyleSheet, Platform } from "react-native";
import Colors from "../../../../../common/style/Colors";
import Fonts from "../../../../../common/style/Fonts";

export const Container = styled.View`
  width: 100%;
  background-color: ${Colors.HEADER_COLOR};
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  elevation: ${props => (props.backButtonHeader ? 0 : 10)};
  //padding-top: ${Platform.OS === "ios" ? "40px" : "15px"};
`;

export const Content = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;

`;

export const HeaderInformation = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: ${props => props.centralize? 70 : 40}px;
`

export const SubHeader = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleContent = styled.View`
  height: 120%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const TitleName = styled.Text`
  font-family: ${Fonts.MAIN};
  font-size: ${props => props.screenHeight / 25}px;
  color: ${props => props.headerColor};
  letter-spacing: 2px;

`;

export const SubTitleName = styled.Text`
  position: absolute;
  font-family: ${Fonts.MAIN};
  font-size: ${props => props.screenHeight / 40}px;
  color: ${props => props.headerColor};
  right: 90px;
  top: 30px;

`;

export const DeleteContent = styled.View`
  padding: 0 20px 0 30px;
  background-color: ${props => props.headerColor};
  height: 200%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
`;

export const DeleteText = styled.Text`
  font-family: ${Fonts.MAIN};
  color: ${Colors.LIGHT_GREY};
  font-size: 18px;
`;

export const DeleteCancelIcon = styled.TouchableOpacity`
  border-radius: 20px;
  padding: 10px;
  border: 1px solid white;
`;

export const IconContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 40px;

`;

export const SearchIconContainer = styled.TouchableOpacity`
  margin-right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 30px;
`;

export const SearchContainer = styled.View`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: black;
`;

export const SearchIcon = styled.View``;
export const CancelInput = styled.TouchableOpacity``;
export const SearchInput = styled.TextInput`
  color: black;
  width: 70%;
  font-size: ${props => props.screenHeight / 55}px;
  opacity: 0.6;
  font-family: ${Fonts.MAIN};
`;

export const SwitchContent = styled.View``;

export const SwitchButton = styled.TouchableOpacity`
  position: absolute;
  left: 80px;
  top: -10px;
`;

export const CalendarIcon = styled.TouchableOpacity`
  background-color: ${props => props.backgroundColor};
  padding: 5px;
  border-radius: 5px;
  margin-left: 10px;
`;

export const ProfileIcon = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;
export const HeaderContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const HeaderText = styled.Text`
  width: 50%;
  font-family: ${Fonts.MAIN};
  color: ${Colors.PURPLE};
  font-size: 24px;
  text-align: center;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  padding: 5px 8px;
  border-radius: 100px;

`;
