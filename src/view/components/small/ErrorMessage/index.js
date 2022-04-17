import React from 'react';
import * as S from './styled';

const ErrorMessage = ({text, width, textColor}) => {
  return (
    <S.Container>
      <S.Content width={width}>
        <S.Message textColor={textColor}>{text}</S.Message>
      </S.Content>
    </S.Container>
  );
};

export default ErrorMessage;
