import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import global from '../../../../common/global';

export const Container = styled.SafeAreaView`
  height: 100%;
  display: flex;
  background-color: ${global.colors.purpleColor};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const Header = styled.View`
  flex: 3;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SalooniLogo = styled.Image`
  width: 100px;
  height: 100px;
  border-width: 1px;
  border-color: ${global.colors.purpleColor};
  border-radius: 100px;
`;

export const HeaderText = styled.Text`
  margin-top: 10px;
  font-family: ${global.fonts.s};
  font-size: 20px;
  text-align: center;
  color: white;
`;

export const OwnerContent = styled.TouchableOpacity`
  flex: 3;
  align-items: center;
  justify-content: center;
`;

export const OwnerImage = styled.Image`
  height: 150px;
  width: 150px;
`;

export const OwnerText = styled.Text`
  font-family: ${global.fonts.s};
  color: black;
  font-size: 20px;
`;

export const PartnerContent = styled.TouchableOpacity`
  flex: 3;
  align-items: center;
  justify-content: center;
`;

export const PartnerImage = styled.Image`
  height: 140px;
  width: 140px;
`;

export const PartnerText = styled.Text`
  font-family: ${global.fonts.s};
  color: black;
  font-size: 20px;
`;
