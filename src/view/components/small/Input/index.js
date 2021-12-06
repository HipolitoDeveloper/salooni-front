import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import global from '../../../../common/global';
import * as S from './styled';
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
import {InputContent, InputTitle, ShowPasswordButton} from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Warning from '../Warning';
const Input = ({
  invalidValue,
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
  leftPlaceholder,
  rightPlaceholder,
  maxLength,
  placeholderTextColor,
  selectTextOnFocus,
  editable,
  isToValidate,
  color,
  label,
  noEmpty,
  ref,
  originalPassword,
  onFocus,
  onKeyPress,
}) => {
  const [isInputValid, setIsInputValid] = useState({
    state: true,
    message: '',
  });

  const [isShowingPassword, setIsShowingPassword] = useState(true);
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const isSmallerScreen = screenHeight < 650;

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
    if (value !== undefined && value !== '' && value !== null && isToValidate) {
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
          validationReturn = {state: true, message: ''};
          break;

        case 'date':
          validationReturn = {state: true, message: ''};
          break;
        case 'brl':
          validationReturn = {state: true, message: ''};
          break;
        case 'percentage':
          validationReturn = {state: true, message: ''};
          break;
        case 'email':
          validationReturn = EMAILVerifier(text);
          break;
        case 'password':
          validationReturn = PASSVerifier(text);
          break;
        case 'confirmPassword':
          if (PASSVerifier(text).state && originalPassword === value) {
            validationReturn = {state: true, message: ''};
          } else if (originalPassword !== value) {
            validationReturn = {
              state: false,
              message: 'As senhas precisam ser iguais!',
            };
          } else {
            validationReturn = PASSVerifier(text);
          }

          break;
        case 'text':
          break;
        default:
          validationReturn = {state: true, message: ''};
          break;
      }

      setIsInputValid(validationReturn);
    } else {
      setIsInputValid({
        state: !noEmpty,
        message: noEmpty ? 'Campo não pode ser vazio!' : '',
      });
    }
  };

  const cleanValidation = () => {
    setIsInputValid({
      state: true,
      message: '',
    });
  };

  const showPassword = () => {
    setIsShowingPassword(!isShowingPassword);
  };

  return (
    <View style={[styles.container, {width: width}]}>
      {leftPlaceholder && value.length > 0 && (
        <Text style={[styles.leftPlaceholder]}>{leftPlaceholder}</Text>
      )}

      <S.InputContent>
        {invalidValue && (
          <Warning
            right={`${screenWidth / 1.35}px`}
            bottom={'20px'}
            color={color}
            size={15}
          />
        )}
        <S.InputTitle screenHeight={screenHeight} color={color}>
          {label}
        </S.InputTitle>
        <S.Input
          style={[
            {
              paddingLeft: leftPlaceholder && value.length ? 30 : 0,
              fontSize: screenHeight / fontSize,
              borderBottomColor: isInputValid.state ? color : 'red',
            },
          ]}
          onChangeText={text => {
            handleChange(chooseMask(text), name);
          }}
          onEndEditing={() =>
            isToValidate ? verifyInput(value) : cleanValidation()
          }
          value={value}
          keyboardType={keyboard}
          placeholderTextColor={'grey'}
          placeholder={placeholder}
          disabled={disabled}
          secureTextEntry={isSecureTextEntry && isShowingPassword}
          clearButtonMode={'always'}
          maxLength={maxLength}
          selectTextOnFocus={selectTextOnFocus}
          editable={editable}
          onFocus={() => (onFocus !== undefined ? onFocus() : () => {})}
          onKeyPress={onKeyPress}
        />

        {(mask === 'password' || mask === 'confirmPassword') && (
          <S.ShowPasswordButton onPress={showPassword}>
            <Icon
              name={'eye'}
              size={24}
              color={`${global.colors.purpleColor}`}
              style={{marginLeft: 10}}
            />
          </S.ShowPasswordButton>
        )}
      </S.InputContent>
      {!isInputValid.state && (
        <S.MessageBox>
          {Array.isArray(isInputValid.message) ? (
            isInputValid.message.map(message => (
              <Text key={message} style={styles.inputErrorMessage}>
                {message}
              </Text>
            ))
          ) : (
            <Text style={styles.inputErrorMessage}>{isInputValid.message}</Text>
          )}
        </S.MessageBox>
      )}
      {rightPlaceholder && value.length > 0 && (
        <Text style={[styles.rightPlaceholder]}>{rightPlaceholder}</Text>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
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
    padding: 5,
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
