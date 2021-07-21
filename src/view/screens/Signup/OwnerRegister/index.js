import React, {useContext, useState} from 'react';
import * as S from './styled';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';
import {useNavigation} from '@react-navigation/native';
import {SignupContext} from '../../../../contexts/User/Signup/SignupContext';
import ErrorMessage from '../../../components/ErrorMessage';

const OwnerRegister = () => {
  const {saveOwnerInformation} = useContext(SignupContext);
  const [ownerData, setOwnerData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigation();

  const handleChange = (value, name) => {
    setOwnerData({
      ...ownerData,
      [name]: value,
    });
  };

  const goNextPage = () => {
    // if (verifyInformation()) {
    // setErrorMessage('');
    // saveOwnerInformation(ownerData);
    navigate.push('ProceduresRegister');
    // }
  };

  const verifyInformation = () => {
    let ableToGo = true;
    let errorMessage = {
      salonMessage: 'Nome do Salão ou CNPJ não foram preenchidos',
      ownerMessage: 'Preencha todas as informações do proprietário',
    };

    if (
      ownerData.salon === undefined ||
      ownerData.salon === '' ||
      ownerData.cnpj === undefined ||
      ownerData.cnpj === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessage.salonMessage;
    } else if (
      ownerData.name === undefined ||
      ownerData.name === '' ||
      ownerData.tel === undefined ||
      ownerData.tel === '' ||
      ownerData.email === undefined ||
      ownerData.email === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessage.ownerMessage;
    }

    setErrorMessage(errorMessage);
    return ableToGo;
  };

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContent>
          <S.HeaderTitle>Proprietário</S.HeaderTitle>
          <S.HeaderText>
            Nos informe alguns dados para podermos ir em frente.
            {'\n'}
            Não demorará muito
          </S.HeaderText>
        </S.HeaderContent>
        <S.BodyContent>
          <Input
            handleChange={handleChange}
            name={'salon'}
            placeholder={'Salão'}
            value={ownerData.salon}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
          />
          <Input
            handleChange={handleChange}
            name={'cnpj'}
            placeholder={'CNPJ'}
            value={ownerData.cnpj}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
          />
          <Input
            handleChange={handleChange}
            name={'name'}
            placeholder={'Nome do Proprietário'}
            value={ownerData.name}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
          />
          <Input
            handleChange={handleChange}
            name={'tel'}
            placeholder={'Telefone'}
            value={ownerData.tel}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
          />
          <Input
            handleChange={handleChange}
            name={'email'}
            placeholder={'E-mail'}
            value={ownerData.email}
            width={'80%'}
            keyboard={'email-address'}
            isSecureTextEntry={false}
          />
        </S.BodyContent>
        <S.FooterContent>
          <SubmitButton
            text={'Avançar'}
            onPress={() => goNextPage()}
            width={'40%'}
            height={'50px'}
            fontSize={'18px'}
          />

          {errorMessage !== '' && (
            <ErrorMessage text={errorMessage} width={'70%'} />
          )}
        </S.FooterContent>
      </S.Content>
    </S.Container>
  );
};

export default OwnerRegister;
