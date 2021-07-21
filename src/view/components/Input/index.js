import React from 'react';
import * as S from './styled';

const Input = ({
  handleChange,
  placeholder,
  value,
  width,
  name,
  keyboard,
  isSecureTextEntry,
}) => {
  return (
    <>
      <S.Input
        width={width}
        onChangeText={value => handleChange(value, name)}
        placeholderTextColor={'grey'}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboard}
        clearButtonMode={'always'}
        secureTextEntry={isSecureTextEntry}
      />
    </>
  );
};

export default Input;
