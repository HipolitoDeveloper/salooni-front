import React from "react";

import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import EntranceScreen from "../modules/entrance/entrance.screen";
import OwnerSigninScreen from "@modules/entrance/owner_signin/ownerSignin.screen";
import EmployeeSigninScreen from "@modules/entrance/employee_signin/employeeSignin.screen";
import {CompositeNavigationProp} from "@react-navigation/native";
import UserSignupScreen from "@modules/entrance/user_signup/userSignup.screen";

export type TEntranceStack = CompositeNavigationProp<NativeStackNavigationProp<{
    EntranceOptions: undefined;
    OwnerSignin: undefined;
    EmployeeSignin: undefined;
    UserSignup: undefined;
}>, any>

export const EntranceStack = () => {
    const Stack = createNativeStackNavigator<TEntranceStack>()

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='EntranceOptions' component={EntranceScreen}/>
            <Stack.Screen name='OwnerSignin' component={OwnerSigninScreen}/>
            <Stack.Screen name='EmployeeSignin' component={EmployeeSigninScreen}/>
            <Stack.Screen name='UserSignup' component={UserSignupScreen} />

        </Stack.Navigator>

    )
}
