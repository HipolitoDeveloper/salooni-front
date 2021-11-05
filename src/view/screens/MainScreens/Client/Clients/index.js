import React, {useContext, useState} from 'react';
import * as S from './styled';

import global from '../../../../../common/global';
import {useNavigation} from '@react-navigation/native';
import {ClientContext} from '../../../../../contexts/Client/ClientContext';
import List from '../../../../components/ListComponent';

const Clients = () => {
  const {clients, deleteUniqueClient, deleteClientList} =
    useContext(ClientContext);

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

  return (
    <S.Container>
      <List
        isOwner={true}
        showHeader={true}
        headerText={'Clientes'}
        color={`${global.colors.blueColor}`}
        itemList={[{name: "name"}, {name: "name"}, {name: "name"}, {name: "name"}, {name: "name"}, {name: "name"}, {name: "name"}, {name: "name"}, {name: "name"}, {name: "name"},{name: "name"}, {name: "name"}, {name: "name"},  ]}
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
