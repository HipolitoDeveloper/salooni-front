import styled from 'styled-components/native';
import global from '../../../../common/global';

export const Container = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${global.colors.lightGreyColor};
`;

export const Content = styled.View`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const EmailMessage = styled.Text`
  width: 70%;
  margin-top: 10px;
  font-family: ${global.fonts.s};
  font-size: 14px;
  text-align: center;
  color: ${global.colors.purpleColor};
`;

export const Input = styled.TextInput`
  font-family: ${global.fonts.s};
  width: 70%;
  border-bottom-width: 1px;
  border-bottom-color: ${global.colors.purpleColor};
  color: black;
`;

export const SalooniLogo = styled.Image`
  width: 180px;
  height: 180px;
  border-width: 1px;
  border-color: ${global.colors.purpleColor};
  border-radius: 100px;
`;
