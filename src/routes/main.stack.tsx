import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {EntranceStack} from "./entrance.stack";

type TMainStack = {
    EntranceStack: undefined;

}

export const MainStack = () => {
    const Stack = createNativeStackNavigator<TMainStack>()

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='EntranceStack' component={EntranceStack} />
        </Stack.Navigator>

    )
}
