import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignInOwner from '../view/screens/Entrance/SignInOwner';
import SignInEmployee from "../view/screens/Entrance/SignInEmployee";
import {EntranceOption} from "../view/screens/Entrance/EntranceOption";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName={'EntranceOption'}
    screenOptions={{
      headerShown: false,
    }}>

      <Stack.Screen name="SignInOwner" component={SignInOwner} />
    <Stack.Screen name="SignInEmployee" component={SignInEmployee} />
    <Stack.Screen name="EntranceOption" component={EntranceOption} />
  </Stack.Navigator>
);
