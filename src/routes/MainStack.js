import React, {useContext, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContext} from '../contexts/User/UserContext';
import TabStack from './TabStack';
import SignupStack from './SignupStack';
import EntranceStack from './EntranceStack';
import ApplicationStack from './ApplicationStack';

const Stack = createStackNavigator();

export const MainStack = () => {
  const [isLoading, setIsLoading] = useState(false); // Implementar splashscreen

  const {currentUser} = useContext(UserContext);
  const isLoggedIn = Object.keys(currentUser).length > 0;

  return (
    <Stack.Navigator
      initialRouteName={'TabStack'}
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen name="ApplicationStack" component={ApplicationStack} />
          <Stack.Screen name="TabStack" component={TabStack} />
          {/*/!*<Stack.Screen*!/*/}
          {/*/!*  name={'ProcedureRegister'}*!/*/}
          {/*/!*  component={ProcedureRegister}*!/*/}
          {/*/>*/}
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="EntranceStack" component={EntranceStack} />
          <Stack.Screen name="SignupStack" component={SignupStack} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
