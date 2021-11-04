import React, {useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Partners from '../view/screens/MainScreens/Partner/Partners';
import SchedulingCalendar from '../view/screens/MainScreens/Calendar/SchedulingCalendar';
import Clients from '../view/screens/MainScreens/Client/Clients';
import {UserContext} from '../contexts/User/UserContext';
import {ScheduleContext} from '../contexts/Schedule/ScheduleContext';
import {PartnerContext} from '../contexts/Partner/PartnerContext';
import {ClientContext} from '../contexts/Client/ClientContext';
import {ProcedureContext} from '../contexts/Procedure/ProcedureContext';
import Schedulings from '../view/screens/MainScreens/Scheduling/Schedulings';
import ApplicationTabBar from './components/ApplicationTabBar/ApplicationTabBar';
import SplashScreen from '../view/screens/MainScreens/SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabStack = () => {
  const {currentUser} = useContext(UserContext);
  const {loadAllSchedules, isSchedulesLoading} = useContext(ScheduleContext);
  const {loadAllPartners, isPartnersLoading} = useContext(PartnerContext);
  const {loadAllClients, isClientsLoading} = useContext(ClientContext);
  const {loadAllProcedures, isProceduresLoading} = useContext(ProcedureContext);

  const [executer, setExecuter] = useState(true);

  const isLoggedIn = Object.keys(currentUser).length > 0;
  let informationsOnLoading =
    isClientsLoading === false &&
    isPartnersLoading === false &&
    isProceduresLoading === false &&
    isSchedulesLoading === false;

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
          showCurrentUserSchedules: true,
        }),
      ]).then(() => {});
    };

    if (executer) {
      loadProcedureDropdown();
      setExecuter(false);
    }
  }

  return informationsOnLoading ? (
    <Tab.Navigator
      initialRouteName={'SchedulingCalendar'}
      tabBar={props => <ApplicationTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Partners" component={Partners} />
      <Tab.Screen name="SchedulingCalendar" component={SchedulingCalendar} />
      <Tab.Screen name="Clients" component={Clients} />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default TabStack;
