import styled from 'styled-components/native';
import global from '../../../common/global';
import {StyleSheet, Dimensions} from 'react-native';

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
  font-family: ${global.fonts.mainFont};
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
  font-family: ${global.fonts.mainFont};
  text-align: justify;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
