import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ProcedureForm from '../../../../components/huge/ProcedureForm';
import {useProcedure, useUser} from "../../../../../hooks";
import {useForm} from "react-hook-form";
import Colors from "../../../../../common/style/Colors";

const ProcedureRegister = ({route}) => {
  const navigate = useNavigation();
    const {
        saveProcedures,
        updateProcedure,
    } = useProcedure();

    const {currentUser} = useUser();
    const {
        setValue: contextSetValue,
        getValues: contextGetValues,
    } = useForm();

  return (
      <ProcedureForm
        idSalon={currentUser.idSalon}
        route={route}
        navigate={navigate}
        color={Colors.PURPLE}
        saveProcedures={saveProcedures}
        updateProcedures={updateProcedure}
      />
  );
};

export default ProcedureRegister;
