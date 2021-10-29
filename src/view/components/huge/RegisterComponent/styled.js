import styled from 'styled-components/native';
import global from '../../../../common/global';

export const Content = styled.View`
  background-color: ${global.colors.lightGreyColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ButtonsContent = styled.View`
  border: 1px solid red;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${props => props.color};
  position: absolute;
  bottom: 165px;
  right: 120px;
  padding: 10px;
  border-radius: 30px;
`;
