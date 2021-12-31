import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContext} from '../contexts/User/UserContext';
import TabStack from './TabStack';
import SignupStack from './SignupStack';
import EntranceStack from './EntranceStack';
import ApplicationStack from './ApplicationStack';
import SplashScreen from '../view/screens/MainScreens/SplashScreen';
import Agenda from '../view/components/huge/AgendaComponent';

const Stack = createStackNavigator();

export const MainStack = () => {
  // const {loginStatus} = useContext(UserContext);

  return (
    <Stack.Navigator
      initialRouteName={'TabStack'}
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Agenda" component={Agenda} />
      {/* {loginStatus === 'LOA' && (
      //   <Stack.Screen name="SplashScreen" component={SplashScreen} />
      // )}

      // {loginStatus === 'IN' && (
      //   <Stack.Group>
      //     <Stack.Screen name="ApplicationStack" component={ApplicationStack} />
      //     <Stack.Screen name="TabStack" component={TabStack} />
      //   </Stack.Group>
      // )}

      // {loginStatus === 'OUT' && (
      //   <Stack.Group>
      //     <Stack.Screen name="EntranceStack" component={EntranceStack} />
      //     <Stack.Screen name="SignupStack" component={SignupStack} />
      //   </Stack.Group>
      // )} */}
    </Stack.Navigator>
  );
};
