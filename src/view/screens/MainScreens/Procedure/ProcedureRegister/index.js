import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ProcedureForm from '../../../../components/huge/ProcedureForm';
import {useProcedure} from "../../../../../hooks";

const ProcedureRegister = ({route}) => {
  const navigate = useNavigation();
    const {
        saveProcedures,
        updateProcedure,
    } = useProcedure();

  return (
    <>
      <ProcedureForm
        route={route}
        goBack={() => navigate.push('ApplicationStack', {screen: 'Procedures'})}
        saveProcedures={saveProcedures}
        updateProcedure={updateProcedure}
      />
    </>
  );
};

export default ProcedureRegister;
