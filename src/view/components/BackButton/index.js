import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import * as S from './styled';
import Input from '../Input';

const BackButton = ({onPress, positionTop, buttonColor, positionLeft}) => {
  return (
    <S.Content>
      <S.ContentButton
        onPress={onPress}
        positionTop={positionTop}
        positionLeft={positionLeft}>
        <Icon size={30} name="arrow-back" color={buttonColor} />
      </S.ContentButton>
    </S.Content>
  );
};

export default BackButton;

Input.defaultProps = {
  onPress: () => {},
  positionTop: '0px',
  buttonColor: '',
  positionLeft: '0px',
};
