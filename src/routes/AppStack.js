import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import TabStack from "./AppTabStack";
import Procedures from "../view/screens/MainScreens/Procedure/Procedures";
import ClientRegister from "../view/screens/MainScreens/Client/ClientRegister";
import ClientSchedules from "../view/screens/MainScreens/Client/ClientSchedules";
import ScheduleRegister from "../view/screens/MainScreens/Calendar/ScheduleRegister";
import ProcedureRegister from "../view/screens/MainScreens/Procedure/ProcedureRegister";
import UnconfirmedSchedules from "../view/screens/MainScreens/Calendar/UnconfirmedSchedules";
import EmployeeRegister from "../view/screens/MainScreens/Employee/EmployeeRegister";
import {ClientProvider, EmployeeProvider, ProcedureProvider, ScheduleProvider} from "../hooks";
// import ScheduleRegister from "../view/screens/MainScreens/Calendar/ScheduleRegister";
// import UnconfirmedSchedules from "../view/screens/MainScreens/Calendar/UnconfirmedSchedules";
// import ClientRegister from "../view/screens/MainScreens/Client/ClientRegister";
// import ClientSchedules from "../view/screens/MainScreens/Client/ClientSchedules";
// import EmployeeRegister from "../view/screens/MainScreens/Employee/EmployeeRegister";
// import ProcedureRegister from "../view/screens/MainScreens/Procedure/ProcedureRegister";
// import Procedures from "../view/screens/MainScreens/Procedure/Procedures";

// import TabStack from "./AppTabStack";
// import { ClientProvider, EmployeeProvider, ProcedureProvider, ScheduleProvider } from "../hooks";

const Stack = createStackNavigator();

const AppStack = () => {


    return (
        <ScheduleProvider>
            <ProcedureProvider>
                <ClientProvider>
                    <EmployeeProvider>

                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false,
                            }}>
                            <Stack.Group>
                                <Stack.Screen name="TabStack" component={TabStack}/>
                                <Stack.Screen name="Procedures" component={Procedures}/>
                                <Stack.Screen name="ClientRegister" component={ClientRegister}/>
                                <Stack.Screen name="ClientSchedules" component={ClientSchedules}/>
                                <Stack.Screen name="ScheduleRegister" component={ScheduleRegister}/>
                                <Stack.Screen name="EmployeeRegister" component={EmployeeRegister}/>
                                <Stack.Screen name="ProcedureRegister" component={ProcedureRegister}/>
                                <Stack.Screen
                                    name="UnconfirmedSchedules"
                                    component={UnconfirmedSchedules}
                                />


                            </Stack.Group>
                        </Stack.Navigator>
                    </EmployeeProvider>
                </ClientProvider>
            </ProcedureProvider>
        </ScheduleProvider>

    );
};

export default AppStack;
