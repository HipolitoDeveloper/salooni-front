import React from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import global from '../../../common/global';
import {
  maskBRL,
  maskCNPJ,
  maskCPF,
  maskDate,
  maskHour,
  maskPhone,
} from '../../../pipe/inputMasks';
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
  borderBottomColor,
  leftPlaceholder,
  rightPlaceholder,
  maxLength,
}) => {
  const chooseMask = text => {
    switch (mask) {
      case 'cpf':
        return maskCPF(text);
      case 'phone':
        return maskPhone(text);
      case 'cnpj':
        return maskCNPJ(text);
      case 'hour':
        return text;
      case 'date':
        return maskDate(text);
      case 'brl':
        return maskBRL(text);
      case 'percentage':
        return text;
      case 'email':
        return text;
      case 'password':
        return text;
      default:
        return text;
    }
  };

  return (
    <View style={[styles.container, {width: width}]}>
      {leftPlaceholder && value.length > 0 && (
        <Text style={[styles.leftPlaceholder]}>{leftPlaceholder}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            paddingLeft: leftPlaceholder && value.length ? 30 : 0,
            fontSize: fontSize,
            borderBottomColor: borderBottomColor
              ? borderBottomColor
              : `${global.colors.purpleColor}`,
          },
        ]}
        onChangeText={text => handleChange(chooseMask(text), name)}
        value={value}
        keyboardType={keyboard}
        placeholderTextColor={'grey'}
        placeholder={placeholder}
        disabled={disabled}
        secureTextEntry={isSecureTextEntry}
        clearButtonMode={'always'}
        maxLength={maxLength}
      />
      {rightPlaceholder && value.length > 0 && (
        <Text style={[styles.rightPlaceholder]}>{rightPlaceholder}</Text>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomWidth: 1,
  },
  input: {
    fontFamily: `${global.fonts.s}`,
    color: 'black',
  },
  leftPlaceholder: {
    color: 'grey',
    fontSize: 20,
    position: 'absolute',
    top: 10,
    left: 0,
  },
  rightPlaceholder: {
    color: 'grey',
    fontSize: 20,
    position: 'absolute',
    top: 10,
    right: 0,
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
  borderBottomColor: `${global.colors.purpleColor}`,
};
