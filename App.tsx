import React from "react";

import Reactotron from "reactotron-react-native";
import {NavigationContainer} from "@react-navigation/native";
import {MainStack} from "./src/routes/main.stack";
import {LayoutProvider} from "./src/hooks/layout/useLayout";
import {NativeBaseProvider, StatusBar} from "native-base";
import theme from "./src/common/theme";
import {ApolloProvider} from "@apollo/client";
import client from "./src/common/apollo.client";
import {AppRouteStateProvider} from "@hooks/route/useAppRouteState";


if (__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
export default function App() {
    Reactotron.display({
        name: "KNOCK KNOCK",
        preview: "Who's there?",
        value: "Orange."
    })

    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <ApolloProvider client={client}>
                    <StatusBar backgroundColor='purple.1000' barStyle='dark-content'/>
                    <LayoutProvider>
                        <AppRouteStateProvider>
                            <MainStack/>
                        </AppRouteStateProvider>
                    </LayoutProvider>
                </ApolloProvider>
            </NativeBaseProvider>

        </NavigationContainer>
    );
}
