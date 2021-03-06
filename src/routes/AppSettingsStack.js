import React from 'react';

import SignupOwners from '../view/screens/Signup/SignupOwner';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Profile from '../view/screens/MainScreens/Profile';
import Procedures from '../view/screens/MainScreens/Procedure/Procedures';
import UserTabBar from './components/UserTabBar';
import Video from '../view/screens/MainScreens/Video';
import Finance from '../view/screens/MainScreens/Finance';

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
    <Tab.Group>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Finance" component={Finance} />
      <Tab.Screen name="Videos" component={Video} />
    </Tab.Group>
  </Tab.Navigator>
);
