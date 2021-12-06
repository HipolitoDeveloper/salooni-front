import styled from 'styled-components/native/dist/styled-components.native.esm';
import global from '../../../../common/global';

export const ModalContainer = styled.View``;

export const ModalContent = styled.View`
  display: flex;
  margin: auto auto;
  border-radius: 40px;
  background-color: white;
  width: 90%;
  height: 80%;
  elevation: 5;
  border: 2px ${global.colors.purpleColor} solid;
`;

export const CloseButtonContent = styled.View`
  height: 80px;
  position: absolute;
  top: -40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${global.colors.purpleColor};
  border-radius: 100px;
  height: 60px;
  width: 60px;
`;
