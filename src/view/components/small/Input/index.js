import React, {useState} from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import global from '../../../../common/global';
import {
  maskBRL,
  maskCNPJ,
  maskCPF,
  maskDate,
  maskHour,
  maskPhone,
} from '../../../../pipe/inputMasks';
import {
  CNPJVerifier,
  CPFVerifier,
  EMAILVerifier,
  PASSVerifier,
  TELVerifier,
} from './verifier';
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
  placeholderTextColor,
  selectTextOnFocus,
  editable,
  validateForm,
  validateInput,
}) => {
  const [isInputValid, setIsInputValid] = useState({
    state: true,
    message: '',
  });

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

  const verifyInput = text => {
    let validationReturn = {};
    if (
      value !== undefined &&
      value !== '' &&
      value !== null &&
      validateInput
    ) {
      switch (mask) {
        case 'cpf':
          validationReturn = CPFVerifier(text);
          break;
        case 'phone':
          validationReturn = TELVerifier(text);
          break;
        case 'cnpj':
          validationReturn = CNPJVerifier(text);
          break;
        case 'hour':
          return true;
        case 'date':
          return true;
        case 'brl':
          return true;
        case 'percentage':
          return true;
        case 'email':
          validationReturn = EMAILVerifier(text);
          break;
        case 'password':
          validationReturn = PASSVerifier(text);
          break;
        default:
          return text;
      }
      setIsInputValid(validationReturn);
      if (validateForm !== undefined) {
        validateForm(!validationReturn.state);
      }
    } else {
      setIsInputValid({state: true, message: ''});
      if (validateForm !== undefined) validateForm(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {width: width, borderBottomColor: isInputValid.state ? 'black' : 'red'},
      ]}>
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
        onChangeText={text => {
          handleChange(chooseMask(text), name);
        }}
        onEndEditing={() => verifyInput(value)}
        value={value}
        keyboardType={keyboard}
        placeholderTextColor={'grey'}
        placeholder={placeholder}
        disabled={disabled}
        secureTextEntry={isSecureTextEntry}
        clearButtonMode={'always'}
        maxLength={maxLength}
        selectTextOnFocus={selectTextOnFocus}
        editable={editable}
      />

      {!isInputValid.state && (
        <View>
          <Text style={styles.inputErrorMessage}>{isInputValid.message}</Text>
        </View>
      )}
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
    fontFamily: `${global.fonts.mainFont}`,
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
  inputErrorMessage: {
    fontFamily: `${global.fonts.mainFont}`,
    fontSize: 12,
    color: `red`,
    fontStyle: 'italic',
    fontWeight: 'bold',
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
