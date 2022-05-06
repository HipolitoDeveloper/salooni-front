import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ProcedureForm from '../../../components/huge/ProcedureForm';
import Colors from "../../../../common/style/Colors";
import {useFormContext} from "react-hook-form";

const SignupProcedures = ({route}) => {
  const navigate = useNavigation();
  const { setValue: contextSetValue, getValues: contextGetValues } = useFormContext();

  return (
      <ProcedureForm
        route={route}
        color={Colors.PURPLE}
        isSigningUp
        navigate={navigate}
        contextSetValue={contextSetValue}
      />
  );
};
export default SignupProcedures;
