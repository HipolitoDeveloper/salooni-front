import React, {useContext, useEffect, useState} from 'react';
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
import {UserContext} from '../contexts/User/UserContext';
import {PartnerContext} from '../contexts/Partner/PartnerContext';
import {ClientContext} from '../contexts/Client/ClientContext';
import {ProcedureContext} from '../contexts/Procedure/ProcedureContext';
import {ScheduleContext} from '../contexts/Schedule/ScheduleContext';

const Drawer = createDrawerNavigator();

const ApplicationStack = () => {
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
};

export default ApplicationStack;
