import React, {useContext, useState} from "react";
import * as S from "./styled";

import {useNavigation} from "@react-navigation/native";
import List from "../../../../components/huge/ListComponent";
import Notification from "../../../../components/small/Notification";
import {getScheduleProceduresByClientId} from "../../../../../services/ScheduleProcedureService";
import Colors from "../../../../../common/style/Colors";
import {useClient, useUser} from "../../../../../hooks";
import {View} from "react-native";
import Loading from "../../../../components/small/Loading";

const Clients = () => {
    const {clients, deleteUniqueClient, deleteClientList, loadAllClients} =
        useClient()


    const {currentUser} = useUser();

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
        return new Promise(resolve => {
            setIsLoading(true);
            loadAllClients(currentUser.idSalon).then(
                newClients => {
                    setIsLoading(false);
                    resolve(newClients);
                },
                error => {
                    console.log(error);
                    setIsLoading(false);
                },
            );
        });
    };

    const goToSchedules = (client) => {
        setIsLoading(true);
        getScheduleProceduresByClientId(
            client.id,
            false
        ).then(
            schedules => {
                setIsLoading(false);
                navigate.push("ApplicationStack", {
                    screen: "ClientSchedules",
                    params: {schedules: schedules, client: client},
                });
            },
            error => {
                console.log(error);
                setIsLoading(false);
            },
        );
    };

    return (
        <View style={{flex: 1, backgroundColor: Colors.PURPLE}}>
            <Notification/>
            {clients.length === 0
                ? (
                    <Loading isLoading={isLoading} color={Colors.PURPLE}/>
                ) : (
                    <List
                        showMenu={true}
                        goToSchedules={goToSchedules}
                        showAddButton={true}
                        onRefresh={onRefresh}
                        refreshing={isLoading}
                        isOwner={true}
                        itemType={"client"}
                        showHeader={true}
                        headerText={"Clientes"}
                        color={Colors.BLUE}
                        itemList={clients}
                        searchPlaceHolder={"Procure pelos seus clientes"}
                        menuItems={["name", "tel", "email"]}
                        deleteUniqueItem={deleteClient}
                        deleteItemList={deleteClients}
                        isLoading={isLoading}
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
                )}
        </View>
    );
};

export default Clients;
