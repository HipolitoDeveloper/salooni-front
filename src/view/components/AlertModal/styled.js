import styled from 'styled-components/native';
import global from '../../../common/global';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;
export const Content = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: auto auto;
  padding: 20px;
  border-radius: 20px;
  border-color: ${global.colors.purpleColor};
  border-width: ${StyleSheet.hairlineWidth}px;
  width: 80%;
  height: 150px;
  background-color: white;
  elevation: 10;
`;

export const HeaderContent = styled.View``;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  font-family: ${global.fonts.s};
`;

export const BodyContent = styled.View``;

export const BodyText = styled.Text`
  font-family: ${global.fonts.s};
`;

export const FooterContent = styled.View`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
  color: lightgrey;
  padding: 5px;
  font-weight: bold;
`;

export const CloseButtonText = styled.Text`
  font-family: ${global.fonts.s};
`;

export const ContentButtonText = styled.Text`
  font-family: ${global.fonts.s};
  color: ${global.colors.lightGreyColor};
  font-size: ${props => props.fontSize}; ;
`;
