import styled from 'styled-components/native';
import global from '../../../common/global';

export const Container = styled.View`
  width: 100%;
  height: 10%;
  background-color: ${global.colors.lightGreyColor};
`;

export const Content = styled.View`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleName = styled.Text`
  font-family: ${global.fonts.g};
  font-size: 24px;
  color: ${props => props.headerColor};
`;

export const MenuButtonContent = styled.TouchableOpacity`
  position: absolute;
  left: 30px;
`;
