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
  disabled,
  fontSize,
}) => {
  return (
    <>
      <S.Input
        fontSize={fontSize}
        disabled={disabled}
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

Input.defaultProps = {
  handleChange: () => {},
  placeholder: '',
  value: '',
  width: '80%',
  name: '',
  keyboard: 'numeric',
  isSecureTextEntry: false,
  disabled: false,
  fontSize: '18px',
};
