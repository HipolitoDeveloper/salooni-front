import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ProcedureForm from '../../../components/huge/ProcedureForm';
import Colors from "../../../../common/style/Colors";

const SignupProcedures = ({route}) => {
  const navigate = useNavigation();

  return (
      <ProcedureForm
        route={route}
        color={Colors.PURPLE}
        isSigningUp
        navigate={navigate}
      />
  );
};
export default SignupProcedures;
