import React, {useEffect, useMemo} from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {EntranceStack} from "./entrance.stack";
import {AppStack} from "./app.stack";
import SplashScreen from "@modules/splash/splash.screen";
import {ERouteState, useAppRouteState} from "@hooks/route/useAppRouteState";
import useSession from "@hooks/session/useSession";

type TMainStack = {
    EntranceStack: undefined;
    AppStack: undefined;
    Loading: undefined

}

export const MainStack = () => {
    const {routeState, handleRouteState} = useAppRouteState()
    const {session} = useSession()

    const Stack = createNativeStackNavigator<TMainStack>()

    useEffect(() => {
        if (session === null) {
            handleRouteState(ERouteState.LOA)
        } else if (session.logged) {
            handleRouteState(ERouteState.IN)
        } else {
            handleRouteState(ERouteState.OUT)
        }
    }, [session])

    const renderApplication = useMemo(() => {
        const routes = {
            [ERouteState.LOA]: <Stack.Screen name='Loading' component={SplashScreen}/>,
            [ERouteState.IN]: <Stack.Group>
                <Stack.Screen name='AppStack' component={AppStack}/>
            </Stack.Group>,
            [ERouteState.OUT]: (
                <Stack.Group>
                    <Stack.Screen name='EntranceStack' component={EntranceStack}/>
                </Stack.Group>)
        }

        return routes[routeState]
    }, [routeState])

    return (
        <Stack.Navigator
            initialRouteName={'EntranceStack'}
            screenOptions={{
                headerShown: false,
            }}
        >
            {renderApplication}
        </Stack.Navigator>

    )
}
