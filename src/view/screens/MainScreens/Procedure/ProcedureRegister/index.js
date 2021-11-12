import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ProcedureForm from '../../../../components/huge/ProcedureForm';

const ProcedureRegister = ({route}) => {
  const navigate = useNavigation();

  return (
    <>
      <ProcedureForm
        route={route}
        goBack={() => navigate.push('ApplicationStack', {screen: 'Procedures'})}
        isSigningUp={false}
      />
    </>
  );
};

export default ProcedureRegister;
