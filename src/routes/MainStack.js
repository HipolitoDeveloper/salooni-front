import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
// import notificationsMessages from '../common/notificationsMessages';
import SplashScreen from "../view/screens/MainScreens/SplashScreen";
import EntranceStack from "./EntranceStack";
import SignupStack from "./SignupStack";
import {useUser} from "../hooks";
import AppSettingsStack from "./AppSettingsStack";
import AppStack from "./AppStack";

const Stack = createStackNavigator();

export const MainStack = () => {
    const {stackStatus} = useUser();
    //TODO ADJUST INITIAL DATA OF APPLICATION

    // if (loader === 0 && Object.keys(currentUser).length > 0) {
    //   setLoader(loader + 1);
    //
    //   Promise.all([
    //     loadAllProcedures(currentUser.idSalon),
    //     loadAllClients(currentUser.idSalon),
    //     loadAllPartners(currentUser.idSalon),
    //     loadAllSchedules({
    //       salonId: currentUser.idSalon,
    //       employeeId: currentUser.idFunc,
    //       employeeType: currentUser.employeeType,
    //     }),
    //   ]).then(data => {
    //
    //     const schedules = data[3];
    //     // verifyNotification({
    //     //   name: notificationsMessages.notifications[0].name,
    //     //   verification: schedules.some(schedule => schedule.needsToBeNotified),
    //     //   method: () =>
    //     //     navigate.push('ApplicationStack', {
    //     //       screen: 'UnconfirmedSchedules',
    //     //     }),
    //     // });
    //     setStackStatus("IN");
    //   }, error => {
    //     setStackStatus("OUT");
    //     console.error(error);
    //
    //   });
    // }

    return (
        <Stack.Navigator
            initialRouteName={"SplashScreen"}
            screenOptions={{
                headerShown: false,
            }}>
            {stackStatus === "LOA" && (
                <Stack.Screen name="SplashScreen" component={SplashScreen}/>

            )}
            {stackStatus === "IN" && (
                <Stack.Group>
                    <Stack.Screen name="ApplicationStack" component={AppStack}/>
                    <Stack.Screen
                        name="AppSettingsStack"
                        component={AppSettingsStack}
                    />
                </Stack.Group>
            )}

            {stackStatus === "OUT" && (
                <Stack.Group>
                    <Stack.Screen name="EntranceStack" component={EntranceStack}/>
                    <Stack.Screen name="SignupStack" component={SignupStack}/>
                </Stack.Group>
            )}
        </Stack.Navigator>

    );
};
