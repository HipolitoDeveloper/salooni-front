import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import Input from '../../../components/small/Input';
import SubmitButton from '../../../components/small/SubmitButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ErrorMessage from '../../../components/small/ErrorMessage';
import {UserContext} from '../../../../contexts/User/UserContext';
import errorMessages from '../../../../common/errorMessages';
import global from '../../../../common/global';
import BackButton from '../../../components/small/BackButton';

const SignupOwners = () => {
  const {saveOwnerInformation, owner, handleOwner} = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigation();
  const isFocused = useIsFocused();
  const handleChange = (text, name) => {
    handleOwner({text: text, inputName: name});
  };

  // const verifyInformation = () => {
  //   let ableToGo = true;
  //   let errorMessage = '';
  //
  //   if (
  //     user.salon === undefined ||
  //     user.salon === '' ||
  //     user.cnpj === undefined ||
  //     user.cnpj === ''
  //   ) {
  //     ableToGo = false;
  //     errorMessage = errorMessages.salonMessage;
  //   } else if (
  //     user.name === undefined ||
  //     user.name === '' ||
  //     user.tel === undefined ||
  //     user.tel === '' ||
  //     user.email === undefined ||
  //     user.email === ''
  //   ) {
  //     ableToGo = false;
  //     errorMessage = errorMessages.ownerMessage;
  //   }
  //
  //   setErrorMessage(errorMessage);
  //   return ableToGo;
  // };

  return (
    <S.Container>
      <S.Content>
        <S.BodyContent>
          <Input
            handleChange={handleChange}
            name={'salonName'}
            placeholder={'Salão'}
            value={owner?.salonName}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            color={global.colors.purpleColor}
            label={'Nome do Salão*'}
            isToValidate={true}
            noEmpty={true}
          />
          <Input
            handleChange={handleChange}
            name={'cnpj'}
            placeholder={'CNPJ'}
            value={owner?.cnpj}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'cnpj'}
            color={global.colors.purpleColor}
            label={'CNPJ*'}
            isToValidate={true}
            noEmpty={true}
          />
          <Input
            handleChange={handleChange}
            name={'userName'}
            placeholder={'Nome do Proprietário'}
            value={owner?.userName}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            color={global.colors.purpleColor}
            label={'Nome do Proprietário*'}
            isToValidate={true}
            noEmpty={true}
          />
          <Input
            handleChange={handleChange}
            name={'tel'}
            placeholder={'Telefone'}
            value={owner?.tel}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'phone'}
            color={global.colors.purpleColor}
            label={'Telefone*'}
            isToValidate={true}
            noEmpty={true}
          />
          <Input
            handleChange={handleChange}
            name={'email'}
            placeholder={'E-mail'}
            value={owner?.email}
            width={'80%'}
            keyboard={'email-address'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask="email"
            color={global.colors.purpleColor}
            label={'E-mail*'}
            isToValidate={true}
            noEmpty={true}
          />

          <Input
            handleChange={handleChange}
            name={'password'}
            placeholder={'Senha'}
            value={owner?.password}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={true}
            fontSize={18}
            disabled={false}
            mask="password"
            color={global.colors.purpleColor}
            label={'Senha*'}
            isToValidate={true}
            noEmpty={true}
          />
        </S.BodyContent>
        <S.FooterContent>
          {errorMessage !== '' && (
            <ErrorMessage
              text={errorMessage}
              width={'70%'}
              textColor={`${global.colors.purpleColor}`}
            />
          )}
        </S.FooterContent>
      </S.Content>
    </S.Container>
  );
};

export default SignupOwners;
