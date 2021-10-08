import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ProcedureRegister from '../../../../components/ProcedureRegister';

const ProcedureForm = ({route}) => {
  const navigate = useNavigation();

  return (
    <>
      <ProcedureRegister
        route={route}
        pageTitle={'Procedimentos'}
        goBack={() => navigate.navigate('Procedures')}
        isSigningUp={false}
      />
    </>
  );
};

export default ProcedureForm;
