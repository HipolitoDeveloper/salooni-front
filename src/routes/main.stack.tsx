import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {EntranceStack} from "./entrance.stack";

export const MainStack = () => {
    const Stack = createNativeStackNavigator()

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
