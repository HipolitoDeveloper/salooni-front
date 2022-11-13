import Reactotron from "reactotron-react-native";
import {StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {MainStack} from "./src/routes/main.stack";
import {LayoutProvider} from "./src/hooks/layout/useLayout";
import {NativeBaseProvider, StatusBar} from "native-base";
import theme from "./src/common/theme";
import React from "react";

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
                <StatusBar backgroundColor='purple.1000' barStyle='dark-content'/>
                <LayoutProvider>
                    <MainStack/>
                </LayoutProvider>
            </NativeBaseProvider>

        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});