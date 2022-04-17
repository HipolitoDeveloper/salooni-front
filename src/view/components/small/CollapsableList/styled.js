import styled from 'styled-components/native';
import {StyleSheet, Dimensions} from 'react-native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  elevation: 10;
  background-color: white;
`;
export const HeaderContent = styled.View`
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: ${StyleSheet.hairlineWidth}px solid ${Colors.DARK_GREY};
`;

export const HeaderText = styled.Text`
  width: 70%;
  font-family: ${Fonts.MAIN};
  font-size: 20px;
  font-weight: bold;
`;

export const CollapsableButtonContent = styled.View`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CollapsableButton = styled.TouchableOpacity``;

export const ItemContent = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${Colors.BACKGROUND_COLOR};
`;

export const ItemContentText = styled.Text`
  margin-left: 20px;
  font-family: ${Fonts.MAIN};
`;

export const ModalContainer = styled.View``;

export const ModalContent = styled.View`
  display: flex;
  margin: auto auto;
  border-radius: 40px;
  background-color: white;
  width: 90%;
  height: 80%;
  elevation: 5;
  border: 2px ${Colors.PURPLE} solid;
`;

export const ItemInformation = styled.ScrollView`
  padding: 20px;
`;

export const VideoContent = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;

export const VideoTitle = styled.Text`
  margin: 10px;
  font-family: ${Fonts.MAIN};
  font-size: 20px;
  font-weight: bold;
`;

export const WrittenTutorialContent = styled.View`
  margin: 20px;
`;

export const WrittenTutorialText = styled.Text`
  font-family: ${Fonts.MAIN};
  text-align: justify;
  font-size: 18px;
`;

export const CloseButtonContent = styled.View`
  height: 80px;
  position: absolute;
  top: -40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

export const CloseButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.PURPLE};
  border-radius: 100px;
  height: 60px;
  width: 60px;
`;
