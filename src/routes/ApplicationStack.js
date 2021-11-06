import React from 'react';

import ClientRegister from '../view/screens/MainScreens/Client/ClientRegister';
import Procedures from '../view/screens/MainScreens/Procedure/Procedures';
import SchedulingRegister from '../view/screens/MainScreens/Calendar/SchedulingRegister';
import PartnerRegister from '../view/screens/MainScreens/Partner/PartnerRegister';
import ProcedureRegister from '../view/screens/MainScreens/Procedure/ProcedureRegister';
import {createStackNavigator} from '@react-navigation/stack';
import UserInformationStack from './UserInformationStack';
import SchedulingCalendar from '../view/screens/MainScreens/Calendar/SchedulingCalendar';

const Stack = createStackNavigator();

const ApplicationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="Procedures" component={Procedures} />
        <Stack.Screen name="ClientRegister" component={ClientRegister} />
        <Stack.Screen
          name="SchedulingRegister"
          component={SchedulingRegister}
        />
        <Stack.Screen name="PartnerRegister" component={PartnerRegister} />
        <Stack.Screen name="ProcedureRegister" component={ProcedureRegister} />

        <Stack.Screen
          name="SchedulingCalendar"
          component={SchedulingCalendar}
        />
        <Stack.Screen
          name="UserInformationStack"
          component={UserInformationStack}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ApplicationStack;
