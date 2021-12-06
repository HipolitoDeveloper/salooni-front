import React, {useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Partners from '../view/screens/MainScreens/Partner/Partners';
import Schedules from '../view/screens/MainScreens/Calendar/Schedules';
import Clients from '../view/screens/MainScreens/Client/Clients';
import {UserContext} from '../contexts/User/UserContext';
import {ScheduleContext} from '../contexts/Schedule/ScheduleContext';
import {PartnerContext} from '../contexts/Partner/PartnerContext';
import {ClientContext} from '../contexts/Client/ClientContext';
import {ProcedureContext} from '../contexts/Procedure/ProcedureContext';
import ApplicationTabBar from './components/ApplicationTabBar/ApplicationTabBar';
import SplashScreen from '../view/screens/MainScreens/SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import notificationsMessages from '../common/notificationsMessages';
import {useNavigation} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabStack = () => {
  const {currentUser, verifyNotification} = useContext(UserContext);
  const {loadAllSchedules, isSchedulesLoading} = useContext(ScheduleContext);
  const {loadAllPartners, isPartnersLoading} = useContext(PartnerContext);
  const {loadAllClients, isClientsLoading} = useContext(ClientContext);
  const {loadAllProcedures, isProceduresLoading} = useContext(ProcedureContext);

  const [executer, setExecuter] = useState(true);
  const navigate = useNavigation();
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
        }),
      ]).then(data => {
        const schedules = data[3];
        verifyNotification({
          name: notificationsMessages.notifications[0].name,
          verification: schedules.some(schedule => schedule.needsToBeNotified),
          method: () =>
            navigate.push('ApplicationStack', {
              screen: 'UnconfirmedSchedules',
            }),
        });
      });
    };

    if (executer) {
      loadProcedureDropdown();
      setExecuter(false);
    }
  }

  return informationsOnLoading ? (
    <Tab.Navigator
      initialRouteName={'Schedules'}
      tabBar={props => <ApplicationTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Partners" component={Partners} />
      <Tab.Screen name="Schedules" component={Schedules} />
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
