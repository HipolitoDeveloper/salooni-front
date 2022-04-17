import styled from 'styled-components/native';
import {StyleSheet, Dimensions} from 'react-native';
import Fonts from "../../../common/style/Fonts";

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
