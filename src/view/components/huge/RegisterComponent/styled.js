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

export const ButtonsContent = styled.View``;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${props => props.color};
  position: absolute;
  bottom: ${props => props.bottom};
  right: 120px;
  padding: 10px;
  border-radius: 30px;
`;

export const AddMessage = styled.Text`
  font-family: ${global.fonts.mainFont};
  font-size: 12px;
  opacity: 0.4;
`;
