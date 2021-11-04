import React from 'react';
import {MainStack} from './src/routes/MainStack';
import AsyncStorage from '@react-native-community/async-storage';
import Parse from 'parse/react-native.js';
import keys from './src/config/server_connection_test';
import {NavigationContainer} from '@react-navigation/native';
import UserProvider from './src/contexts/User/UserContext';
import ClientProvider from './src/contexts/Client/ClientContext';
import PartnerProvider from './src/contexts/Partner/PartnerContext';
import ScheduleProvider from './src/contexts/Schedule/ScheduleContext';
import ProcedureProvider from './src/contexts/Procedure/ProcedureContext';

import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide';

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
                <TourGuideProvider verticalOffset={40} {...{borderRadius: 16}}>
                  <MainStack />
                </TourGuideProvider>
              </ScheduleProvider>
            </PartnerProvider>
          </ProcedureProvider>
        </ClientProvider>
      </UserProvider>
    </NavigationContainer>
  );
};
