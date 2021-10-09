import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Parse from 'parse/react-native';

import EntranceStack from './EntranceStack';
import {UserContext} from '../contexts/User/UserContext';

import SignupStack from './SignupStack';
import {ClientContext} from '../contexts/Client/ClientContext';
import ProcedureProvider, {
  ProcedureContext,
} from '../contexts/Procedure/ProcedureContext';
import PartnerProvider, {
  PartnerContext,
} from '../contexts/Partner/PartnerContext';
import ApplicationStack from './ApplicationStack';
import ScheduleProvider, {
  ScheduleContext,
} from '../contexts/Schedule/ScheduleContext';

const Stack = createStackNavigator();

export const MainStack = () => {
  const [isLoading, setIsLoading] = useState(false); // Implementar splashscreen

  const {currentUser} = useContext(UserContext);
  const isLoggedIn = Object.keys(currentUser).length > 0;

  return (
    <Stack.Navigator
      initialRouteName={'ApplicationStack'}
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <Stack.Screen name="ApplicationStack" component={ApplicationStack} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="EntranceStack" component={EntranceStack} />
          <Stack.Screen name="SignupStack" component={SignupStack} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
