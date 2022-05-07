import styled from 'styled-components/native/dist/styled-components.native.esm';
import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const WarningContent = styled.TouchableOpacity`
  width: 27px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 150px;
  background-color: black;
  position: absolute;
  right: 0;
`;
