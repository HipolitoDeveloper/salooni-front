import styled from 'styled-components/native';
import global from '../../../../common/global';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  margin: 60px 0 30px 0;
  font-family: ${global.fonts.g};
  font-size: 26px;
  color: ${global.colors.purpleColor};
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-family: ${global.fonts.s};
  text-align: center;
`;

export const BodyContent = styled.View`
  flex: 4;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const FooterContent = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-end;
  width: 100%;
`;
