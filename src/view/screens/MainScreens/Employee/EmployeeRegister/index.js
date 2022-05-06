import {useNavigation} from '@react-navigation/native';
import EmployeeForm from '../../../../components/huge/EmployeeForm';
import React from 'react';
import Notification from '../../../../components/small/Notification';
import Colors from "../../../../../common/style/Colors";
import {useEmployee, useProcedure, useUser} from "../../../../../hooks";
import {useForm} from 'react-hook-form';

const EmployeeRegister = ({route}) => {
    const {procedures} = useProcedure();
    const navigate = useNavigation();
    const {currentUser} = useUser();

    const {saveEmployee, updateEmployee} = useEmployee();

    return (
        <EmployeeForm
            idSalon={currentUser.idSalon}
            route={route}
            goBack={() => navigate.push('TabStack', {screen: 'Partners'})}
            color={Colors.GREEN}
            procedures={procedures}
            saveEmployee={saveEmployee}
            updateEmployee={updateEmployee}
        />
    );
};

export default EmployeeRegister;
