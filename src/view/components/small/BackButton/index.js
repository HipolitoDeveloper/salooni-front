import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as S from './styled';
import Input from '../Input';

const BackButton = ({onPress, positionTop, buttonColor, positionLeft}) => {
  return (
    <>
      <S.ContentButton
        onPress={onPress}
        positionTop={positionTop}
        positionLeft={positionLeft}>
        <Icon size={30} name="arrow-left" color={buttonColor} />
      </S.ContentButton>
    </>
  );
};

export default BackButton;

Input.defaultProps = {
  onPress: () => {},
  positionTop: '0px',
  buttonColor: '',
  positionLeft: '0px',
};
