import styled from 'styled-components/native/dist/styled-components.native.esm';
import Colors from "../../../../../common/style/Colors";
import Fonts from "../../../../../common/style/Fonts";


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

export const CloseButtonContent = styled.View`
  height: 80px;
  position: absolute;
  top: -40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const ItemInformation = styled.View`
  padding: 20px;
`;

export const CoverWindowChange = styled.View`
  width: 100%;
  background-color: white;
  position: absolute;
  top: 230px;
  height: 400px;
`;

export const VideoContent = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrittenTutorialText = styled.Text`
  font-family: ${Fonts.MAIN};
  text-align: justify;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


