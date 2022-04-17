import React, {useContext, useState} from 'react';
import * as S from './styled';
import {UserContext} from '../../../../../hooks';
import {useNavigation} from '@react-navigation/native';
import {ProcedureContext} from '../../../../../hooks';
import List from '../../../../components/huge/ListComponent';
import Colors from "../../../../../common/style/Colors";
import Loading from "../../../../components/small/Loading";

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

    const onRefresh = async () => {
        return new Promise(resolve => {

            setIsLoading(true);
            loadAllProcedures(currentUser.idSalon).then(
                (newProcedures) => {
                    setIsLoading(false);
                    resolve(newProcedures);
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
            {procedures.length === 0
                ? (
                    <Loading isLoading={isLoading} color={Colors.PURPLE}/>
                ) : (
                    <List
                        showMenu={true}
                        showAddButton={true}
                        onRefresh={onRefresh}
                        refreshing={isLoading}
                        showBackButton={true}
                        searchPlaceHolder={'Procure pelos seus procedimentos'}
                        isOwner={isOwner}
                        itemType={'procedure'}
                        showHeader={true}
                        headerText={'Procedimentos'}
                        color={Colors.PURPLE}
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
                    />)}
        </S.Container>
    );
};

export default Procedures;
