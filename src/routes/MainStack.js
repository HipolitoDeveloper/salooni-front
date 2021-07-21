import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EntranceStack from './EntranceStack';
import UserProvider from '../contexts/User/UserContext';
import SchedulingList from '../view/screens/SchedulingList';
import AsyncStorage from '@react-native-community/async-storage';
import SignupStack from './SignupStack';

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
      {isLoggedIn ? (
        <Stack.Navigator
          initialRouteName="SchedulingList"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SchedulingList" component={SchedulingList} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="EntranceStack"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="EntranceStack" component={EntranceStack} />
          <Stack.Screen name="SignupStack" component={SignupStack} />
          <Stack.Screen name="SchedulingList" component={SchedulingList} />
        </Stack.Navigator>
      )}
    </UserProvider>
  );
};
