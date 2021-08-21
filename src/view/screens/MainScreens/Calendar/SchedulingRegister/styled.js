import styled from 'styled-components/native';
import global from '../../../../../common/global';
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
  width: 100%;
  height: 100%;
`;

export const HeaderContent = styled.View`
  margin-top: 20px;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

export const HeaderTitle = styled.Text`
  text-align: center;

  font-family: ${global.fonts.g};
  font-size: 24px;
  color: ${global.colors.blueColor};
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-family: ${global.fonts.s};
  text-align: center;
`;

export const BodyContent = styled.View`
  height: 68%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const FooterContent = styled.View`
  height: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
`;
