import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './src/routes/MainStack';
import AsyncStorage from '@react-native-community/async-storage';
import Parse from 'parse/react-native.js';
import keys from './src/config/server_connection';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey, 'master');
Parse.serverURL = keys.serverURL;

export default () => {
  return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
  );
};