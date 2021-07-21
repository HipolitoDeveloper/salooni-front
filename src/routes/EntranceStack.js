import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {EntranceOption} from '../view/screens/entrance/EntranceOption';
import SignInOwner from '../view/screens/entrance/SignInOwner';
import SignInPartner from '../view/screens/entrance/SignInPartner';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="EntranceOption"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="SignInOwner" component={SignInOwner} />
    <Stack.Screen name="SignInPartner" component={SignInPartner} />
    <Stack.Screen name="EntranceOption" component={EntranceOption} />
  </Stack.Navigator>
);
