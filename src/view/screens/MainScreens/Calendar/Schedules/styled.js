import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import Colors from "../../../../../common/style/Colors";

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
  background-color: ${Colors.BACKGROUND_COLOR};
  height: 100%;
`;

export const ItemContainer = styled.TouchableOpacity`
  background-color: ${Colors.BACKGROUND_COLOR};
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
