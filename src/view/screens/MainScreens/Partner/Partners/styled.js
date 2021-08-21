import styled from 'styled-components/native';
import global from '../../../../../common/global';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
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

export const BodyContent = styled.ScrollView`
  flex: 3;
  width: 100%;
  height: 50%;
`;

export const BoxContainer = styled.View`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  border-radius: 10px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${global.colors.lightBlueColor};
  width: 94%;
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
  color: ${global.colors.lightBlueColor};
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
  color: ${global.colors.lightBlueColor};
  font-family: ${global.fonts.s};
  font-weight: bold;
`;

export const FooterContent = styled.View`
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;

export const LoadingContent = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

export const ActionButtonContainer = styled.View`
  height: 100px;
  width: 100px;
`;
