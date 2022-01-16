import React from 'react';

import ClientRegister from '../view/screens/MainScreens/Client/ClientRegister';
import Procedures from '../view/screens/MainScreens/Procedure/Procedures';
import ScheduleRegister from '../view/screens/MainScreens/Calendar/ScheduleRegister';
import PartnerRegister from '../view/screens/MainScreens/Partner/PartnerRegister';
import ProcedureRegister from '../view/screens/MainScreens/Procedure/ProcedureRegister';
import {createStackNavigator} from '@react-navigation/stack';
import UserInformationStack from './UserInformationStack';
import Schedules from '../view/screens/MainScreens/Calendar/Schedules';
import UnconfirmedSchedules from '../view/screens/MainScreens/Calendar/UnconfirmedSchedules';
import ClientSchedules from "../view/screens/MainScreens/Client/ClientSchedules";

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
        <Stack.Screen name="ClientSchedules" component={ClientSchedules} />
        <Stack.Screen name="ScheduleRegister" component={ScheduleRegister} />
        <Stack.Screen name="PartnerRegister" component={PartnerRegister} />
        <Stack.Screen name="ProcedureRegister" component={ProcedureRegister} />
        <Stack.Screen
          name="UnconfirmedSchedules"
          component={UnconfirmedSchedules}
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
