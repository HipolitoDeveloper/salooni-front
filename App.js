import React from 'react';
import {MainStack} from './src/routes/MainStack';
import AsyncStorage from '@react-native-community/async-storage';
import Parse from 'parse/react-native.js';
import keys from './src/config/server_connection';
import {NavigationContainer} from '@react-navigation/native';
import UserProvider from './src/contexts/User/UserContext';
import ClientProvider from './src/contexts/Client/ClientContext';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey, 'master');
Parse.serverURL = keys.serverURL;

export default () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <ClientProvider>
          <MainStack />
        </ClientProvider>
      </UserProvider>
    </NavigationContainer>
  );
};
