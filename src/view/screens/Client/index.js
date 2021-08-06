import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';

import global from '../../../common/global';
import {useNavigation} from '@react-navigation/native';
import {ClientContext} from '../../../contexts/Client/ClientContext';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {UserContext} from '../../../contexts/User/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-circular-action-menu';

const Client = () => {
  const actions = [
    {
      text: 'Adicionar novo cliente',

      name: 'new_client',
      position: 2,
    },
    {
      text: 'Sair',

      name: 'logout',
      position: 1,
    },
  ];

  const {clients, loadAllClients, setClientInView, cleanClientInView} =
    useContext(ClientContext);

  const {doLogout, currentUser} = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigation();

  useEffect(() => {
    setLoading(true);
    const getAllClients = async () => {
      await loadAllClients(currentUser.idSalon).then(
        () => setLoading(false),
        error => {
          console.log(error);
          setLoading(false);
        },
      );
      setLoading(false);
    };

    getAllClients();
  }, []);

  const loadClients = clients.map((client, index) => (
    <S.BoxContainer key={index}>
      <S.BoxContent>
        <S.BoxLabel>Nome</S.BoxLabel>
        <S.BoxText>{client.Nome}</S.BoxText>
      </S.BoxContent>
      <S.BoxContent>
        <S.BoxLabel>Telefone</S.BoxLabel>
        <S.BoxText>{client.Telefone}</S.BoxText>
      </S.BoxContent>
      <S.DetailsContent>
        <S.DetailsButton
          onPress={() => {
            setClientInView(client);
            navigate.push('ClientRegister');
          }}>
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
        {loading && (
          <S.LoadingContent>
            <ActivityIndicator size="large" color={global.colors.blueColor} />
          </S.LoadingContent>
        )}
        <S.BodyContent
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={['transparent']}
              style={{backgroundColor: 'transparent'}}
              refreshing={isRefreshing}
              onRefresh={() => loadAllClients(currentUser.idSalon)}
            />
          }>
          {loadClients}
        </S.BodyContent>
        <S.FooterContent>
          <ActionButton buttonColor={global.colors.blueColor}>
            <ActionButton.Item
              buttonColor={global.colors.blueColor}
              title="Registrar Cliente"
              onPress={() => {
                navigate.push('ClientRegister');
                cleanClientInView();
              }}>
              <Icon name="add" />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor={global.colors.purpleColor}
              title="Sair"
              onPress={() => {
                doLogout();
                navigate.push('EntranceStack');
              }}>
              <Icon name="close" />
            </ActionButton.Item>
          </ActionButton>
        </S.FooterContent>
      </S.Content>
    </S.Container>
  );
};

export default Client;
