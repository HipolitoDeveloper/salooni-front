import React from 'react';

import SignupOwners from '../view/screens/Signup/SignupOwners';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Profile from '../view/screens/MainScreens/Profile';
import Procedures from '../view/screens/MainScreens/Procedure/Procedures';
import UserTabBar from './components/UserTabBar/UserTabBar';
import Video from '../view/screens/MainScreens/Video';

const Tab = createMaterialTopTabNavigator();

export default () => (
  <Tab.Navigator
    initialRouteName={'Profile'}
    tabBar={props => <UserTabBar {...props} />}
    screenOptions={{
      swipeEnabled: false,
      // tabBarBounces: true,
      // tabBarActiveTintColor: '#e91e63',
      // tabBarLabelStyle: {fontSize: 12},
      // tabBarStyle: {backgroundColor: 'powderblue'},
      // tabBarScrollEnabled: true,
    }}>
    <>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Procedures" component={Procedures} />
      <Tab.Screen name="Videos" component={Video} />
    </>
  </Tab.Navigator>
);
