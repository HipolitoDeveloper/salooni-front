import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import Fonts from "../../../../common/style/Fonts";

export const Button = styled.TouchableOpacity`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 20px;
  background-color: ${props => props.backgroundColor};
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.existsLeftContent ? 'flex-start' : 'center'};
  align-items: center;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const ButtonContent = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  margin-left: ${props => (props.existsLeftContent ? '10px' : 0)};
  font-family: ${Fonts.MAIN};
  color: ${props => props.textColor};
  font-size: ${props => props.fontSize}; ;
`;

export const LeftContainer = styled.View`
  width: 24%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : 0)};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'white'};
  height: ${props => props.height};
  width: ${props => props.width};
`;
