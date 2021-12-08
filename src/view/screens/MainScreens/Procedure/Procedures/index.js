import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, Text} from 'react-native';
import global from '../../../../../common/global';
import Header from '../../../../components/huge/Header';
import * as S from './styled';
import ActionButton from 'react-native-circular-action-menu';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import {ProcedureContext} from '../../../../../contexts/Procedure/ProcedureContext';
import List from '../../../../components/ListComponent';

const Procedures = () => {
  const {
    loadAllProcedures,
    procedures,
    deleteUniqueProcedure,
    deleteProcedureList,
  } = useContext(ProcedureContext);

  const {currentUser, isOwner} = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigation();

  const deleteProcedure = procedureToDelete => {
    setIsLoading(true);
    deleteUniqueProcedure(procedureToDelete).then(
      () => {
        setIsLoading(false);
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const deleteProcedures = proceduresToDelete => {
    setIsLoading(true);
    deleteProcedureList(proceduresToDelete).then(
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
    return new Promise(resolve => {
      setIsLoading(true);
      loadAllProcedures(currentUser.idSalon).then(
        (newProcedureList) => {
          resolve(
            newProcedureList,
          );
          setIsLoading(false);
        },
        error => {
          console.log(error);
          setIsLoading(false);
        },
      );
    })   
  };

  return (
    <S.Container>
      <List
        showAddButton={true}
        onRefresh={onRefresh}
        refreshing={isLoading}
        showBackButton={true}
        searchPlaceHolder={'Procure pelos seus procedimentos'}
        isOwner={isOwner}
        itemType={'procedure'}
        showHeader={true}
        headerText={'Procedimentos'}
        color={`${global.colors.purpleColor}`}
        itemList={procedures}
        menuItems={['name', 'value', 'time']}
        deleteUniqueItem={deleteProcedure}
        deleteItemList={deleteProcedures}
        isLoading={isLoading}
        onAddNavigateTo={() =>
          navigate.push('ApplicationStack', {
            screen: 'ProcedureRegister',
            params: {procedure: []},
          })
        }
        onEditNavigateTo={procedure =>
          navigate.push('ApplicationStack', {
            screen: 'ProcedureRegister',
            params: {procedure: procedure},
          })
        }
      />
    </S.Container>
  );
};

export default Procedures;
