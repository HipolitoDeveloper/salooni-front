import styled from 'styled-components/native';
import global from '../../../common/global';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${global.colors.lightGreyColor};
`;

export const Content = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100%;
`;

export const HeaderContent = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  margin: 60px 0 30px 0;
  font-family: ${global.fonts.g};
  font-size: 24px;
  color: ${global.colors.blueColor};
`;

export const BodyContent = styled.View`
  flex: 2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const BoxContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  border-radius: 10px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${global.colors.blueColor};
  width: 90%;
  height: 120px;
`;

export const BoxContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const BoxLabel = styled.Text`
  margin: 0 60px 0 20px;
  color: ${global.colors.blueColor};
  font-family: ${global.fonts.s};
`;

export const BoxText = styled.Text`
  font-family: ${global.fonts.s};
`;

export const DetailsContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
export const DetailsButton = styled.TouchableOpacity`
  margin: 0 30px 0 0;
`;

export const DetailsButtonText = styled.Text`
  color: ${global.colors.blueColor};
  font-family: ${global.fonts.s};
  font-weight: bold;
`;

export const FooterContent = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-end;
  width: 100%;
`;
