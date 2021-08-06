import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import OwnerRegister from '../view/screens/Signup/OwnerRegister';
import PartnerRegister from '../view/screens/Signup/PartnerRegister';
import ProceduresRegister from '../view/screens/Signup/ProceduresRegister';
import ProcedureProvider from '../contexts/Procedure/ProcedureContext';
import PartnerProvider from '../contexts/Partner/PartnerContext';

const Stack = createStackNavigator();

export default () => (
  <ProcedureProvider>
    <PartnerProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="OwnerRegister" component={OwnerRegister} />
        <Stack.Screen name="PartnerRegister" component={PartnerRegister} />
        <Stack.Screen
          name="ProceduresRegister"
          component={ProceduresRegister}
        />
      </Stack.Navigator>
    </PartnerProvider>
  </ProcedureProvider>
);
