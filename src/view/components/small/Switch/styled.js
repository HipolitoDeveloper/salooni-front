import styled from 'styled-components/native/dist/styled-components.native.esm';
import global from '../../../../common/global';

export const Container = styled.View`
  margin-top: ${props => (props.marginTop ? props.marginTop : '10px')};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  margin-right: 10px;
`;
