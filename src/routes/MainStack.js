import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Parse from 'parse/react-native';

import EntranceStack from './EntranceStack';
import UserProvider, {UserContext} from '../contexts/User/UserContext';

import AsyncStorage from '@react-native-community/async-storage';
import SignupStack from './SignupStack';
import ClientProvider, {ClientContext} from '../contexts/Client/ClientContext';
import ProcedureProvider from '../contexts/Procedure/ProcedureContext';
import PartnerProvider from '../contexts/Partner/PartnerContext';
import ApplicationStack from './ApplicationStack';
import SchedulingCalendar from '../view/screens/MainScreens/Calendar/SchedulingCalendar';

const Stack = createStackNavigator();

export const MainStack = () => {
  const [isLoading, setIsLoading] = useState(false); // Implementar splashscreen

  const {currentUser} = useContext(UserContext);

  const isLoggedIn = Object.keys(currentUser).length > 0;

  return (
    <ClientProvider>
      <ProcedureProvider>
        <PartnerProvider>
          <Stack.Navigator
            initialRouteName={'ApplicationStack'}
            screenOptions={{
              headerShown: false,
            }}>
            {isLoggedIn ? (
              <Stack.Screen
                name="ApplicationStack"
                component={ApplicationStack}
              />
            ) : (
              <Stack.Group>
                <Stack.Screen name="EntranceStack" component={EntranceStack} />
                <Stack.Screen name="SignupStack" component={SignupStack} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </PartnerProvider>
      </ProcedureProvider>
    </ClientProvider>
  );
};
