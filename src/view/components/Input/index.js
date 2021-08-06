import React from 'react';
import * as S from './styled';
import {TextInputMask} from 'react-native-masked-text';
import {StyleSheet} from 'react-native';
import global from '../../../common/global';
import {MaskedTextInput} from 'react-native-mask-text';
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
  mask,
}) => {
  return (
    <>
      <MaskedTextInput
        mask={mask}
        style={[styles.input, {fontSize: fontSize, width: width}]}
        onChangeText={(text, rawText) => handleChange(text, rawText, name)}
        value={value}
        keyboardType={keyboard}
        placeholderTextColor={'grey'}
        placeholder={placeholder}
        disabled={disabled}
        secureTextEntry={isSecureTextEntry}
        clearButtonMode={'always'}
      />
      {/*<TextInputMask*/}
      {/*  type={type}*/}
      {/*  style={[styles.input, {fontSize: fontSize, width: width}]}*/}
      {/*  options={{*/}
      {/*    mask: '999 AAA SSS ***',*/}
      {/*  }}*/}
      {/*  value={value}*/}
      {/*  onChangeText={(text, rawText) => handleChange(text, rawText, name)}*/}
      {/*/>*/}
    </>
  );
};

export const styles = StyleSheet.create({
  input: {
    fontFamily: `${global.fonts.s}`,
    borderBottomWidth: 1,
    borderBottomColor: `${global.colors.purpleColor}`,
    color: 'black',
  },
});

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
  fontSize: 18,
  type: 'custom',
  options: {},
};
