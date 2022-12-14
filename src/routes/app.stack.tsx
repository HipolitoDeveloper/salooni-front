import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import {EntranceStack} from "./entrance.stack";
import React from "react";
import {CompositeNavigationProp} from "@react-navigation/native";
import ClientFormScreen from "@modules/client/clientForm.screen";

export type TAppStack = CompositeNavigationProp<NativeStackNavigationProp<{
    ClientForm: undefined;
    EmployeeForm: undefined;
}>, any>

export const AppStack = () => {
    const Stack = createNativeStackNavigator<TAppStack>()

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='ClientForm' component={ClientFormScreen} />
            <Stack.Screen name='EmployeeForm' component={EntranceStack} />

        </Stack.Navigator>

    )
}
