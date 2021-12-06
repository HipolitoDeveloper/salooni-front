import styled from 'styled-components/native';
import global from '../../../../common/global';

export const Content = styled.View`
  font-family: ${global.fonts.auxiliarFont};
  color: white;
  background-color: ${global.colors.purpleColor};
  height: 100%;
`;

export const ContentButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${global.colors.lightGreyColor};
  border-radius: 30px;
  background-color: ${props => props.buttonColor};
`;

export const ContentButtonText = styled.Text`
  font-family: ${global.fonts.auxiliarFont};
  color: ${global.colors.lightGreyColor};
  font-size: ${props => props.fontSize}; ;
`;