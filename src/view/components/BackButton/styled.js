import styled from 'styled-components/native';
import global from '../../../common/global';

export const ContentButton = styled.TouchableOpacity`
  position: absolute;
  top: ${props => props.positionTop};
  left: ${props => (props.positionLeft ? props.positionLeft : 0)};
  font-size: 100px;
`;
