import React, {useCallback, useState} from "react";
import Layout from "@components/layout/Layout";
import {VStack} from "native-base";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";
import Button from "@components/form/Button";
import {signin} from "@common/typograph";
import {useForm} from "react-hook-form";
import {SEmployeeSignin, TEmployeeSignin} from "@modules/entrance/employee_signin/employeeSignin.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import InputAutocomplete from "@components/form/autocomplete/InputAutocomplete";
import {useSalonsLazyQuery} from "@modules/salon/salon.graphql.generated";
import {TSalon} from "../../../types/salon.type";
import {TSignInSteps} from "../../../types/signin.type";
import EmployeeFirstStep from "@components/signin/EmployeeFirstStep";

const EmployeeSigninScreen: React.FC = () => {
    const [step, setStep] = useState<TSignInSteps>('first')
    const [selectedSalon, setSelectedSalon] = useState<TSalon>(null)

    const {control, handleSubmit, formState: {errors}} = useForm<TEmployeeSignin>({
        resolver: zodResolver(SEmployeeSignin)
    });

    const sigIn = (formData: TEmployeeSignin) => {
        console.log("formData", formData)
    }

    const renderSteps = useCallback(() => {
        const steps = {
            'first': (
                <EmployeeFirstStep handleStep={setStep} setSelectedSalon={setSelectedSalon} />)
        }

        return steps[step]
    }, [step])

    return (
        <Layout>
            <VStack space='80px' alignItems='center' justifyContent='center' p='30px' mt='20px'>
                <SalooniLogo fill={'#A177AF'}
                             width={200}
                             height={200}/>

                {renderSteps()}

                <Button variant={'rounded'} size='lg' onPress={handleSubmit(sigIn)}>
                    {signin.VERIFY}
                </Button>

            </VStack>
        </Layout>
    )
}

export default EmployeeSigninScreen
