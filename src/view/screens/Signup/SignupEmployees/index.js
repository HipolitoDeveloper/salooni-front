import React from 'react';
import EmployeeForm from '../../../components/huge/EmployeeForm';
import Colors from "../../../../common/style/Colors";
import {useForm, useFormContext} from "react-hook-form";

const SignupPartners = ({route}) => {
    const { setValue: contextSetValue, getValues: contextGetValues } = useFormContext();

    console.log("procedures", contextGetValues("procedures"))
    return <EmployeeForm isSigningUp
                         isMultiInsert
                         color={Colors.PURPLE}
                         procedures={contextGetValues("procedures")}
                         contextSetValue={contextSetValue}
    />;
};
export default SignupPartners;
