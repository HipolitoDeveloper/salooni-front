import styled from 'styled-components/native';
import global from '../../../../common/global';

export const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BodyContent = styled.View`
  flex: 3;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const FooterContainer = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FooterContent = styled.View`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CancelButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin-top: 10px;
  height: 25px;
  width: 25px;
  border-radius: 30px;
`;
