import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ProcedureForm from '../../../../components/huge/ProcedureForm';

const ProcedureRegister = ({route}) => {
  const navigate = useNavigation();

  return (
    <>
      <ProcedureForm
        route={route}
        pageTitle={'Procedimentos'}
        goBack={() =>
          navigate.push('UserInformationStack', {screen: 'Procedures'})
        }
        isSigningUp={false}
      />
    </>
  );
};

export default ProcedureRegister;
