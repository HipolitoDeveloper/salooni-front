import styled from 'styled-components/native/dist/styled-components.native.esm';
import {StyleSheet} from 'react-native';
import global from '../../../common/global';

export const Input = styled.TextInput`
  font-family: ${global.fonts.s};
  width: ${props => props.width};
  border-bottom-width: 1px;
  border-bottom-color: ${global.colors.purpleColor};
  color: black;
  font-size: ${props => props.fontSize};
`;
