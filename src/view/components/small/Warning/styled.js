import styled from 'styled-components/native/dist/styled-components.native.esm';
import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const WarningContent = styled.View`
  position: absolute;
  bottom: ${props => (props.bottom ? props.bottom : 0)};
  right: ${props => (props.right ? props.right : 0)};

  z-index: 5;
  padding: 5px;
  border-radius: 100px;
  background-color: black;
`;
