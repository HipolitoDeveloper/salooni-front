import React, {useContext, useState} from "react";
import * as S from "./styled";

import {useNavigation} from "@react-navigation/native";
import List from "../../../../components/huge/ListComponent";
import Notification from "../../../../components/small/Notification";
import {getScheduleProceduresByClientId} from "../../../../../services/ScheduleProcedureService";
import Colors from "../../../../../common/style/Colors";
import {useClient, useProcedure, useUser} from "../../../../../hooks";
import {View} from "react-native";
import Loading from "../../../../components/small/Loading";
import {useLayout} from "../../../../../hooks/Layout";
import Errors from "../../../../../common/Errors";
import {getSchedulesByClientId} from "../../../../../services/ScheduleService";

const Clients = () => {
    const {clients, deleteClient, loadAllClients, updateClient} =
        useClient()

    const {currentUser, isOwner} = useUser()
    const {handleModal, modal, handleLoading, loading} = useLayout();

    const [refreshing, setRefresing] = useState(false)

    const navigate = useNavigation();


    const onDeleteClient = async clientToDelete => {
        handleLoading(true);
        try {
            await deleteClient(clientToDelete)
            handleLoading(false);
        } catch (error) {
            handleLoading(false);
            console.error(JSON.stringify(error));
        }
    };


    const onUpdateClient = async (data) => {
        handleLoading(true);
        try {
            await updateClient(data)
            handleLoading(false);
        } catch (e) {
            handleLoading(false);
            console.error(e)
        }


    };

    const fetchData = async () => {
        setRefresing(true);
        try {
            await loadAllClients(currentUser.idSalon)
            setRefresing(false);

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

    const goToSchedules = async (client) => {
            navigate.push("ApplicationStack", {
                screen: "ClientSchedules",
                params: {client: client},
            });
        };

    return (
        <View style={{flex: 1, backgroundColor: Colors.PURPLE}}>
            <List
                showMenu={true}
                goToSchedules={goToSchedules}
                showAddButton={true}
                fetchData={fetchData}
                refreshing={refreshing}
                isOwner={isOwner}
                itemType={"client"}
                showHeader={true}
                headerText={"Clientes"}
                color={Colors.BLUE}
                items={clients}
                searchPlaceHolder={"Procure pelos seus clientes"}
                menuItems={["name", "tel", "email"]}
                onDeleteItem={onDeleteClient}
                onUpdateItem={onUpdateClient}
                onAddNavigateTo={() =>
                    navigate.push("ApplicationStack", {
                        screen: "ClientRegister",
                        params: {client: []},
                    })
                }
                onEditNavigateTo={client =>
                    navigate.push("ApplicationStack", {
                        screen: "ClientRegister",
                        params: {client: client},
                    })
                }
            />
        </View>
    );
};

export default Clients;
