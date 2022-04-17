import React from 'react';
import Parse from "parse/react-native.js";
import {NavigationContainer} from "@react-navigation/native";
import {MainStack} from "./src/routes/MainStack";
import {UserProvider} from "./src/hooks";
import {LayoutProvider} from "./src/hooks/Layout";
import keys from "./src/config/server_connection_test";
import AsyncStorage from "@react-native-community/async-storage";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey, "master");
Parse.serverURL = keys.serverURL;

export default () => {
    return (
        <NavigationContainer>
            <UserProvider>
                <LayoutProvider>
                    <MainStack/>
                </LayoutProvider>
            </UserProvider>
        </NavigationContainer>
    );
};
