import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignupOwners from '../view/screens/Signup/SignupOwners';
import SignupPartners from '../view/screens/Signup/SignupPartners';
import SignupProcedures from '../view/screens/Signup/SignupProcedures';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="SignupOwners" component={SignupOwners} />
    <Stack.Screen name="SignupPartners" component={SignupPartners} />
    <Stack.Screen name="SignupProcedures" component={SignupProcedures} />
  </Stack.Navigator>
);
