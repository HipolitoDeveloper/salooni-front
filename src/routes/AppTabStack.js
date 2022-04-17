import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Schedules from '../view/screens/MainScreens/Calendar/Schedules';
import Clients from '../view/screens/MainScreens/Client/Clients';
import ApplicationTabBar from './components/ApplicationTabBar';
import Employees from "../view/screens/MainScreens/Employee/Employees";

const Tab = createBottomTabNavigator();

const TabStack = () => {

  return (
    <Tab.Navigator
      initialRouteName={'Schedules'}
      tabBar={props => <ApplicationTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Employees" component={Employees} />
      <Tab.Screen name="Schedules" component={Schedules} />
      <Tab.Screen name="Clients" component={Clients} />
    </Tab.Navigator>
  )

};
export default TabStack;
