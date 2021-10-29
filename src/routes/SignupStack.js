import React from 'react';

import SignupOwners from '../view/screens/Signup/SignupOwners';
import SignupPartners from '../view/screens/Signup/SignupPartners';
import SignupProcedures from '../view/screens/Signup/SignupProcedures';
import SignupTabBar from './components/SignupTabBar/SignupTabBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserProvider from '../contexts/User/UserContext';
const Tab = createMaterialTopTabNavigator();

export default () => (
  <Tab.Navigator
    initialRouteName={'SignupOwners'}
    tabBar={props => <SignupTabBar {...props} />}
    screenOptions={{
      swipeEnabled: false,
      // tabBarBounces: true,
      // tabBarActiveTintColor: '#e91e63',
      // tabBarLabelStyle: {fontSize: 12},
      // tabBarStyle: {backgroundColor: 'powderblue'},
      // tabBarScrollEnabled: true,
    }}>
    <>
      <Tab.Screen name="SignupOwners" component={SignupOwners} />
      <Tab.Screen name="SignupProcedures" component={SignupProcedures} />
      <Tab.Screen name="SignupPartners" component={SignupPartners} />
    </>
  </Tab.Navigator>
);
