import styled from 'styled-components/native/dist/styled-components.native.esm';
import global from '../../../../common/global';

export const InputContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${props => (props.width ? props.width : '100%')};
`;

export const Input = styled.TextInput`
  font-family: ${global.fonts.mainFont};
  color: black;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${props =>
    props.borderBottomColor ? props.borderBottomColor : 'black'};
`;

export const InputTitle = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: ${props => `${props.screenHeight / 50}px`};
  position: absolute;
  left: 0;
  top: 0;
  color: ${props => props.color};
`;

export const ShowPasswordButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 10px;
`;

export const MessageBox = styled.View`
  width: 100%;
  margin-top: 3px;
  z-index: 5;
  background-color: white;
  border-radius: 5px;
  elevation: 2;
`;

export const InputPlaceholder = styled.Text`
  font-family: ${global.fonts.mainFont};
  color: grey
`
