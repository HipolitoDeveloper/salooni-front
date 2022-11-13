import {createNativeStackNavigator} from "@react-navigation/native-stack";
import EntranceScreen from "../modules/entrance/entrance.screen";

export const EntranceStack = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='EntranceOptions' component={EntranceScreen}/>
        </Stack.Navigator>

    )
}
