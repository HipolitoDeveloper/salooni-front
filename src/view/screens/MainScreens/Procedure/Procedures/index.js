import React, {useContext, useState} from 'react';
import * as S from './styled';
import {UserContext} from '../../../../../hooks';
import {useNavigation} from '@react-navigation/native';
import {ProcedureContext} from '../../../../../hooks';
import List from '../../../../components/huge/ListComponent';
import Colors from "../../../../../common/style/Colors";
import Loading from "../../../../components/small/Loading";
import Errors from "../../../../../common/Errors";
import {useLayout} from "../../../../../hooks/Layout";

const Procedures = () => {
    const {
        loadAllProcedures,
        procedures,
        deleteProcedure,
        updateProcedure,
    } = useContext(ProcedureContext);

    const {currentUser, isOwner} = useContext(UserContext);
    const {handleModal, modal, handleLoading, loading} = useLayout();

    const [refreshing, setRefresing] = useState(false)

    const navigate = useNavigation();

    const onDeleteProcedure = async procedureToDelete => {
        handleLoading(true);
        try {
            await deleteProcedure(procedureToDelete)
            handleLoading(false);
        } catch (error) {
            handleLoading(false);
            console.error(JSON.stringify(error));
        }
    };

    const onUpdateProcedure = async (data) => {
        handleLoading(true);
        try {
            await updateProcedure(data)
            handleLoading(false);

        } catch (error) {
            console.error(error)
            handleLoading(false);
        }
    };


    const fetchData = async (skip, limit) => {
        setRefresing(true);
        try {
            const procedures = await loadAllProcedures(currentUser.idSalon)
            setRefresing(false);

            return procedures
        } catch (e) {
            console.error(e)
            setRefresing(false);
            handleModal({
                ...modal,
                visible: true,
                variant: "alert",
                errors: Errors.LOAD_MORE_ERROR,
            });
        }
    };

    return (
        <S.Container>
                    <List
                        showMenu={true}
                        showAddButton={true}
                        fetchData={fetchData}
                        refreshing={refreshing}
                        showBackButton={true}
                        searchPlaceHolder={'Procure pelos seus procedimentos'}
                        isOwner={isOwner}
                        itemType={'procedure'}
                        showHeader={true}
                        headerText={'Procedimentos'}
                        color={Colors.PURPLE}
                        items={procedures}
                        menuItems={['name', 'cost', 'duration']}
                        onDeleteItem={onDeleteProcedure}
                        onUpdateItem={onUpdateProcedure}
                        isLoading={loading}
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
