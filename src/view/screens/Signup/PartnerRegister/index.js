import React, {useState} from 'react';
import * as S from './styled';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';
import ErrorMessage from '../../../components/ErrorMessage';

const PartnerRegister = () => {
  const [procedure, setProcedure] = useState({});
  const [procedures, setProcedures] = useState([]);

  const handleChange = (value, name) => {
    setProcedure({
      ...procedure,
      [name]: value,
    });
  };

  const goNextPage = () => {
    // if (verifyInformation()) {
    //   setErrorMessage('');
    //   saveOwnerInformation(ownerData);
    //   navigate.push('ProceduresRegister');
    // }
  };

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContent>
          <S.HeaderTitle>Procedimentos</S.HeaderTitle>
          <S.HeaderText>
            Cadastre os procedimentos realizados em seu estabelecimento.
            {'\n'}
            Se precisar, você poderá mudar ou adicionar detalhes depois
          </S.HeaderText>
        </S.HeaderContent>
        <S.BodyContent>
          <Input
            handleChange={handleChange}
            name={'salon'}
            placeholder={'Salão'}
            value={procedure.name}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
          />

          <Input
            handleChange={handleChange}
            name={'time'}
            placeholder={'Hora: minutos'}
            value={procedure.time}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
          />

          <Input
            handleChange={handleChange}
            name={'preco'}
            placeholder={'Preço'}
            value={procedure.time}
            width={'80%'}
            keyboard={'numeric'}
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

          {/*{errorMessage !== '' && (*/}
          {/*  <ErrorMessage text={errorMessage} width={'70%'} />*/}
          {/*)}*/}
        </S.FooterContent>
      </S.Content>
    </S.Container>
  );
};

export default PartnerRegister;
