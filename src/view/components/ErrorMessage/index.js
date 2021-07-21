import React from 'react';
import * as S from './styled';

const ErrorMessage = ({text, width}) => {
  return (
    <S.Container>
      <S.Content width={width}>
        <S.Message>{text}</S.Message>
      </S.Content>
    </S.Container>
  );
};

export default ErrorMessage;
