import React, {useContext, useEffect} from 'react';
import * as S from './styled';
import ActionButton from 'react-native-action-button';
import global from '../../../common/global';
import {useNavigation} from '@react-navigation/native';
import {ClientContext} from '../../../contexts/Client/ClientContext';

const Client = () => {
  const {clients, loadAllClients} = useContext(ClientContext);
  const navigate = useNavigation();
  //
  // useEffect(() => {
  //   loadAllClients();
  // }, []);

  const loadClients = clients.map((client, index) => (
    <S.BoxContainer>
      <S.BoxContent>
        <S.BoxLabel>Nome</S.BoxLabel>
        <S.BoxText>{client.Nome}</S.BoxText>
      </S.BoxContent>
      <S.BoxContent>
        <S.BoxLabel>Telefone</S.BoxLabel>
        <S.BoxText>{client.Telefone}</S.BoxText>
      </S.BoxContent>
      <S.DetailsContent>
        <S.DetailsButton>
          <S.DetailsButtonText>Detalhes</S.DetailsButtonText>
        </S.DetailsButton>
      </S.DetailsContent>
    </S.BoxContainer>
  ));

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContent>
          <S.HeaderTitle>Clientes</S.HeaderTitle>
        </S.HeaderContent>
        <S.BodyContent>{loadClients}</S.BodyContent>
        <S.FooterContent>
          <ActionButton
            buttonColor={`${global.colors.blueColor}`}
            onPress={() => {
              loadAllClients();
            }}
          />
        </S.FooterContent>
      </S.Content>
    </S.Container>
  );
};

export default Client;
