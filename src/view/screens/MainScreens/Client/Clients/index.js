import React, {useContext, useState} from 'react';
import * as S from './styled';

import global from '../../../../../common/global';
import {useNavigation} from '@react-navigation/native';
import {ClientContext} from '../../../../../contexts/Client/ClientContext';
import List from '../../../../components/ListComponent';
import {UserContext} from '../../../../../contexts/User/UserContext';
import Notification from '../../../../components/small/Notification';

const Clients = () => {
  const {clients, deleteUniqueClient, deleteClientList, loadAllClients} =
    useContext(ClientContext);

  const {currentUser} = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigation();

  const deleteClient = clientToDelete => {
    setIsLoading(true);
    deleteUniqueClient(clientToDelete).then(
      () => {
        setIsLoading(false);
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const deleteClients = clientsToDelete => {
    setIsLoading(true);
    deleteClientList(clientsToDelete).then(
      () => {
        setIsLoading(false);
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const onRefresh = () => {
    setIsLoading(true);
    loadAllClients(currentUser.idSalon).then(
      () => {
        setIsLoading(false);
      },
      error => {
        console.log(error);
        setIsLoading(false);
      },
    );
  };

  return (
    <S.Container>
      <Notification />
      <List
        showAddButton={true}
        onRefresh={onRefresh}
        refreshing={isLoading}
        isOwner={true}
        showHeader={true}
        headerText={'Clientes'}
        color={`${global.colors.blueColor}`}
        itemList={clients}
        searchPlaceHolder={'Procure pelos seus clientes'}
        menuItems={['name', 'tel', 'email']}
        deleteUniqueItem={deleteClient}
        deleteItemList={deleteClients}
        isLoading={isLoading}
        onAddNavigateTo={() =>
          navigate.push('ApplicationStack', {
            screen: 'ClientRegister',
            params: {client: []},
          })
        }
        onEditNavigateTo={client =>
          navigate.push('ApplicationStack', {
            screen: 'ClientRegister',
            params: {client: client},
          })
        }
      />
    </S.Container>
  );
};

export default Clients;
