import React from 'react';
import * as S from './styled';
import {TextInputMask} from 'react-native-masked-text';
import {StyleSheet, TextInput} from 'react-native';
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
  options,
  type,
  borderBottomColor,
}) => {
  if (mask === 'none') {
    return (
      <TextInput
        style={[
          styles.input,
          {
            fontSize: fontSize,
            width: width,
            borderBottomColor: borderBottomColor
              ? borderBottomColor
              : `${global.colors.purpleColor}`,
          },
        ]}
        onChangeText={(text, rawText) => handleChange(text, rawText, name)}
        value={value}
        keyboardType={keyboard}
        placeholderTextColor={'grey'}
        placeholder={placeholder}
        disabled={disabled}
        secureTextEntry={isSecureTextEntry}
        clearButtonMode={'always'}
        type={type}
        options={options}
      />
    );
  } else {
    return (
      <>
        <MaskedTextInput
          mask={mask}
          style={[
            styles.input,
            {
              fontSize: fontSize,
              width: width,
              borderBottomColor: borderBottomColor
                ? borderBottomColor
                : `${global.colors.purpleColor}`,
            },
          ]}
          onChangeText={(text, rawText) => handleChange(text, rawText, name)}
          value={value}
          keyboardType={keyboard}
          placeholderTextColor={'grey'}
          placeholder={placeholder}
          disabled={disabled}
          secureTextEntry={isSecureTextEntry}
          clearButtonMode={'always'}
          type={type}
          options={options}
        />
      </>
    );
  }
};

export const styles = StyleSheet.create({
  input: {
    fontFamily: `${global.fonts.s}`,
    borderBottomWidth: 1,

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
  fontSize: '18px',
  type: 'custom',
  options: {},
  mask: 'none',
  borderBottomColor: `${global.colors.purpleColor}`,
};
