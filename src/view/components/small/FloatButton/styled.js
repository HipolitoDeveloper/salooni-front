import styled from 'styled-components/native';
import Colors from "../../../../common/style/Colors";

export const Button = styled.TouchableOpacity`
  elevation: 10;
  position: absolute;
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  background-color: ${Colors.LIGHT_GREY};
  z-index: 5;
  border: 1px solid ${props => props.buttonColor};
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;
