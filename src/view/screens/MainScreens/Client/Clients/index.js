import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';

import global from '../../../../../common/global';
import {useNavigation} from '@react-navigation/native';
import {ClientContext} from '../../../../../contexts/Client/ClientContext';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {UserContext} from '../../../../../contexts/User/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-circular-action-menu';
import Header from '../../../../components/Header';

const Clients = () => {
  const {clients, loadAllClients} = useContext(ClientContext);

  const {currentUser} = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigation();

  const loadClients = clients.map((client, index) => (
    <S.BoxContainer key={index}>
      <S.BoxContent>
        <S.BoxLabel>Nome</S.BoxLabel>
        <S.BoxText>{client?.name}</S.BoxText>
      </S.BoxContent>
      <S.BoxContent>
        <S.BoxLabel>Telefone</S.BoxLabel>
        <S.BoxText>{client?.tel}</S.BoxText>
      </S.BoxContent>
      <S.DetailsContent>
        <S.DetailsButton
          onPress={() => {
            navigate.push('ApplicationStack', {
              screen: 'ClientRegister',
              params: {client: client},
            });
          }}>
          <S.DetailsButtonText>Detalhes</S.DetailsButtonText>
        </S.DetailsButton>
      </S.DetailsContent>
    </S.BoxContainer>
  ));

  return (
    <S.Container>
      <S.Content>
        <Header
          headerTitle={'Clientes'}
          headerColor={`${global.colors.blueColor}`}
        />

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
          <S.ActionButtonContainer>
            <ActionButton
              buttonColor={`${global.colors.blueColor}`}
              onPress={() => {
                navigate.push('ApplicationStack', {
                  screen: 'ClientRegister',
                  params: {client: {}},
                });
              }}
            />
          </S.ActionButtonContainer>
        </S.FooterContent>
      </S.Content>
    </S.Container>
  );
};

export default Clients;
