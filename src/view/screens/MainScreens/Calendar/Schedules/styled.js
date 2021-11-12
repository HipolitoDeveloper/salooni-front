import styled from 'styled-components/native';
import global from '../../../../../common/global';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const ActionButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 100px;
  right: 70px;
  border: 1px solid red;
  z-index: 5;
`;

export const List = styled.View`
  background-color: ${global.colors.backgroundColor};
  height: 100%;
`;

export const ItemContainer = styled.TouchableOpacity`
  background-color: ${global.colors.backgroundColor};
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
