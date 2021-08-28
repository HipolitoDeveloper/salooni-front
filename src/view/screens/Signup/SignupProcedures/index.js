import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ProcedureRegister from '../../../components/ProcedureRegister';

const SignupProcedures = ({route}) => {
  const navigate = useNavigation();

  return (
    <>
      <ProcedureRegister
        route={route}
        pageTitle={'Procedimentos'}
        pageDescription={
          'Cadastre os procedimentos realizados em seu estabelecimento.\n' +
          "{'\\n'}\n" +
          'Se precisar, você poderá mudar ou adicionar detalhes depois'
        }
        goBack={() => navigate.goBack()}
        isSigningUp={true}
      />
    </>
  );
};
export default SignupProcedures;
