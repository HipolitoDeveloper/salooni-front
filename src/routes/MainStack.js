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
  const {loadAllSchedules} = useContext(ScheduleContext);
  const {loadAllPartners} = useContext(PartnerContext);
  const {loadAllClients} = useContext(ClientContext);
  const {loadAllProcedures} = useContext(ProcedureContext);

  const [executer, setExecuter] = useState(true);

  const isLoggedIn = Object.keys(currentUser).length > 0;
  if (isLoggedIn) {
    const loadProcedureDropdown = () => {
      Promise.all([
        loadAllProcedures(currentUser.idSalon),
        loadAllClients(currentUser.idSalon),
        loadAllPartners(currentUser.idSalon),
        loadAllSchedules({
          salonId: currentUser.idSalon,
          employeeId: currentUser.idFunc,
          employeeType: currentUser.employeeType,
        }),
      ]).then(
        () => {
          // setIsLoading(false);
        },
        // error => setIsLoading(false),
      );
      // setIsLoading(false);
    };

    if (executer) {
      loadProcedureDropdown();
      setExecuter(false);
    }
  }
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
