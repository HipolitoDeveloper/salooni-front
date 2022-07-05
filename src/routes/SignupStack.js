import React from "react";

import SignupOwners from "../view/screens/Signup/SignupOwner";
import SignupPartners from "../view/screens/Signup/SignupEmployees";
import SignupProcedures from "../view/screens/Signup/SignupProcedures";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SignupTabBar from "./components/SignupTabBar";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "../common/validators/Schemas";

const defaultValues = {
  salonName: "SalooniTeste",
  cnpj: "45123731000162",
  name: "Gabriel",
  tel: "11999725749",
  email: "gabriel123@gmail.com",
  password: "123Abc@",
  // salonName: "",
  // cnpj: "",
  // name: "",
  // tel: "",
  // email: "",
  // password: "",
  procedures: [],
  employees: [],
};

const Tab = createMaterialTopTabNavigator();


const SignupStack = () => {
  const methods = useForm({ defaultValues, resolver: yupResolver(signupValidationSchema) });

  return (
    <FormProvider {...methods} >
      <Tab.Navigator
        initialRouteName={"SignupOwners"}
        tabBar={props => <SignupTabBar {...props} />}
        screenOptions={{
          swipeEnabled: false,
        }}>
        <Tab.Screen name="SignupOwners" component={SignupOwners} />
        <Tab.Screen name="SignupProcedures" component={SignupProcedures} />
        <Tab.Screen name="SignupPartners" component={SignupPartners} />
      </Tab.Navigator>
    </FormProvider>
  );
};

export default SignupStack;


