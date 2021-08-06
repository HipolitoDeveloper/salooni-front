import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EntranceStack from './EntranceStack';
import UserProvider from '../contexts/User/UserContext';
import SchedulingList from '../view/screens/SchedulingList';
import Client from '../view/screens/Client';
import ClientRegister from '../view/screens/ClientRegister';
import AsyncStorage from '@react-native-community/async-storage';
import SignupStack from './SignupStack';
import ClientProvider, {ClientContext} from '../contexts/Client/ClientContext';

const Stack = createStackNavigator();

export const MainStack = () => {
  const [isLoading, setIsLoading] = useState(false); // Implementar splashscreen
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = async () => {
      const currentUser = await AsyncStorage.getItem('currentUser');
      console.log(!!currentUser);
      setIsLoggedIn(!!currentUser);
    };
    currentUser();
  }, []);

  return (
    <UserProvider>
      <ClientProvider>
        {isLoggedIn ? (
          <Stack.Navigator
            initialRouteName="Client"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Client" component={Client} />
            <Stack.Screen name="ClientRegister" component={ClientRegister} />
            <Stack.Screen name="SchedulingList" component={SchedulingList} />
            <Stack.Screen name="EntranceStack" component={EntranceStack} />
            <Stack.Screen name="SignupStack" component={SignupStack} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="EntranceStack"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="EntranceStack" component={EntranceStack} />
            <Stack.Screen name="SignupStack" component={SignupStack} />
            <Stack.Screen name="Client" component={Client} />
            <Stack.Screen name="ClientRegister" component={ClientRegister} />
          </Stack.Navigator>
        )}
      </ClientProvider>
    </UserProvider>
  );
};
