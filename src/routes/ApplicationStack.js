import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../view/components/CustomDrawerContent';

import Clients from '../view/screens/MainScreens/Client/Clients';
import ClientRegister from '../view/screens/MainScreens/Client/ClientRegister';
import Schedulings from '../view/screens/MainScreens/Scheduling/Schedulings';
import Procedures from '../view/screens/MainScreens/Procedure/Procedures';
import Partners from '../view/screens/MainScreens/Partner/Partners';
import SchedulingCalendar from '../view/screens/MainScreens/Calendar/SchedulingCalendar';
import SchedulingRegister from '../view/screens/MainScreens/Calendar/SchedulingRegister';
import PartnerRegister from '../view/screens/MainScreens/Partner/PartnerRegister';
import ProcedureForm from '../view/screens/MainScreens/Procedure/ProcedureForm';

const Drawer = createDrawerNavigator();

export default () => (
  <Drawer.Navigator
    initialRouteName="Clients"
    screenOptions={{
      headerShown: false,
    }}
    drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Clients" component={Clients} />
    <Drawer.Screen name="Procedures" component={Procedures} />
    <Drawer.Screen name="Partners" component={Partners} />
    <Drawer.Screen name="SchedulingCalendar" component={SchedulingCalendar} />
    <Drawer.Screen name="ClientRegister" component={ClientRegister} />
    <Drawer.Screen name="Schedulings" component={Schedulings} />
    <Drawer.Screen name="SchedulingRegister" component={SchedulingRegister} />
    <Drawer.Screen name="PartnerRegister" component={PartnerRegister} />
    <Drawer.Screen name="ProcedureForm" component={ProcedureForm} />
  </Drawer.Navigator>
);
