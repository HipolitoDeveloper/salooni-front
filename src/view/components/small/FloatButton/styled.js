import styled from 'styled-components/native';
import global from '../../../../common/global';

export const Button = styled.TouchableOpacity`
  elevation: 10;
  position: absolute;
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  background-color: ${global.colors.lightGreyColor};
  z-index: 5;
  border: 1px solid ${props => props.buttonColor};
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`;
