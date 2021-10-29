import styled from 'styled-components/native';
import global from '../../../../../common/global';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${global.colors.backgroundColor};
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

export const BoxContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${global.colors.purpleColor};
  width: 100%;
  height: 60px;
`;

export const BoxContent = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const BoxText = styled.View`
  margin-left: -40px;
  width: 30%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const BoxName = styled.Text`
  font-size: 20px;
  font-family: ${global.fonts.auxiliarFont};
  color: ${global.colors.purpleColor};
`;

export const BoxMainInformation = styled.View`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
export const PrefixBold = styled.Text`
  font-weight: bold;
  color: ${global.colors.purpleColor};
`;

export const BoxTime = styled.Text`
  margin-left: 20px;
  font-size: 14px;
  font-family: ${global.fonts.auxiliarFont};
  color: black;
`;

export const BoxPrice = styled.Text`
  margin-left: 20px;
  font-size: 14px;
  font-family: ${global.fonts.auxiliarFont};
  color: black;
`;

export const BoxEmployeeInformation = styled.View`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const BoxEmployee = styled.Text`
  font-size: 10px;
  font-family: ${global.fonts.auxiliarFont};
  color: black;
  font-style: italic;
`;

export const BoxEmployeeName = styled.Text`
  font-size: 14px;
  font-family: ${global.fonts.auxiliarFont};
  color: ${global.colors.purpleColor};
`;

export const BoxComission = styled.View`
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 20px;
`;
export const BoxComissionLabel = styled.Text`
  font-size: 12px;
  font-family: ${global.fonts.auxiliarFont};
`;
export const BoxComissionText = styled.Text`
  font-size: 12px;
  font-family: ${global.fonts.auxiliarFont};
  color: ${global.colors.purpleColor};
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
