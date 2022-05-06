import styled from 'styled-components/native/dist/styled-components.native.esm';
import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const WarningContent = styled.TouchableOpacity`
  position: absolute;
  bottom: ${props => (props.bottom ? props.bottom : 0)};
  right: ${props => (props.right ? props.right : 0)};
  width: 27px;
  height: 27px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 150px;
  background-color: black;
`;
