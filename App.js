import React from 'react';
import {MainStack} from './src/routes/MainStack';
import AsyncStorage from '@react-native-community/async-storage';
import Parse from 'parse/react-native.js';
import keys from './src/config/server_connection';
import {NavigationContainer} from '@react-navigation/native';
import UserProvider from './src/contexts/User/UserContext';
import ClientProvider from './src/contexts/Client/ClientContext';
import PartnerProvider from './src/contexts/Partner/PartnerContext';
import ScheduleProvider from './src/contexts/Schedule/ScheduleContext';
import ProcedureProvider from './src/contexts/Procedure/ProcedureContext';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey, 'master');
Parse.serverURL = keys.serverURL;

export default () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <ClientProvider>
          <ProcedureProvider>
            <PartnerProvider>
              <ScheduleProvider>
                <MainStack />
              </ScheduleProvider>
            </PartnerProvider>
          </ProcedureProvider>
        </ClientProvider>
      </UserProvider>
    </NavigationContainer>
  );
};
