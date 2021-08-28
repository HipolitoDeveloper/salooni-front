import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';
import {useNavigation} from '@react-navigation/native';
import ErrorMessage from '../../../components/ErrorMessage';
import {UserContext} from '../../../../contexts/User/UserContext';
import errorMessages from '../../../../common/errorMessages';
import global from '../../../../common/global';
import BackButton from '../../../components/BackButton';

const OwnerRegister = () => {
  const {saveOwnerInformation, salon, owner, user} = useContext(UserContext);
  const [ownerData, setOwnerData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigation();

  useEffect(() => {
    if (owner !== undefined && salon !== undefined && user !== undefined) {
      if (
        Object.keys(salon).length !== 0 &&
        Object.keys(owner).length !== 0 &&
        Object.keys(user).length !== 0
      ) {
        const storagedOwnerData = {
          salon: salon.name,
          cnpj: salon.cnpj,
          name: owner.name,
          tel: owner.tel,
          email: user.username,
          password: user.password,
        };

        setOwnerData(storagedOwnerData);
      }
    }
  }, []);

  const handleChange = (text, rawText, name) => {
    setOwnerData({
      ...ownerData,
      [name]: text,
    });
  };

  const goNextPage = () => {
    if (verifyInformation()) {
      setErrorMessage('');
      saveOwnerInformation(ownerData);
      navigate.navigate('SignupProcedures');
    }
  };

  const verifyInformation = () => {
    let ableToGo = true;
    let errorMessage = '';

    if (
      ownerData.salon === undefined ||
      ownerData.salon === '' ||
      ownerData.cnpj === undefined ||
      ownerData.cnpj === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessages.salonMessage;
    } else if (
      ownerData.name === undefined ||
      ownerData.name === '' ||
      ownerData.tel === undefined ||
      ownerData.tel === '' ||
      ownerData.email === undefined ||
      ownerData.email === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessages.ownerMessage;
    }

    setErrorMessage(errorMessage);
    return ableToGo;
  };

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContainer>
          <BackButton
            positionTop={'20px'}
            buttonColor={`${global.colors.purpleColor}`}
            onPress={navigate.goBack}
          />
          <S.HeaderContent>
            <S.HeaderTitle>Proprietário</S.HeaderTitle>
            <S.HeaderText>
              Nos informe alguns dados para podermos ir em frente.
              {'\n'}
              Não demorará muito
            </S.HeaderText>
          </S.HeaderContent>
        </S.HeaderContainer>
        <S.BodyContent>
          <Input
            handleChange={handleChange}
            name={'salon'}
            placeholder={'Salão'}
            value={ownerData.salon}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask="none"
          />
          <Input
            handleChange={handleChange}
            name={'cnpj'}
            placeholder={'CNPJ'}
            value={ownerData.cnpj}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'99.999.999/9999-99'}
          />
          <Input
            handleChange={handleChange}
            name={'name'}
            placeholder={'Nome do Proprietário'}
            value={ownerData.name}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask="none"
          />
          <Input
            handleChange={handleChange}
            name={'tel'}
            placeholder={'Telefone'}
            value={ownerData.tel}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'(99) 99999-9999'}
          />
          <Input
            handleChange={handleChange}
            name={'email'}
            placeholder={'E-mail'}
            value={ownerData.email}
            width={'80%'}
            keyboard={'email-address'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask="none"
          />

          <Input
            handleChange={handleChange}
            name={'password'}
            placeholder={'Senha'}
            value={ownerData.password}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={true}
            fontSize={18}
            disabled={false}
            mask="none"
          />
        </S.BodyContent>
        <S.FooterContent>
          <SubmitButton
            text={'Avançar'}
            onPress={() => goNextPage()}
            width={'40%'}
            height={'50px'}
            fontSize={18}
            buttonColor={`${global.colors.purpleColor}`}
          />

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

export default OwnerRegister;
