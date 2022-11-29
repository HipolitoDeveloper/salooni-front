import React from "react";
import Layout from "@components/layout/Layout";
import {Text, VStack} from "native-base";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";
import Input from "@components/form/Input";
import Button from "@components/form/Button";
import {signin} from "@common/typograph";
import {useForm} from "react-hook-form";
import {IUserSignin, SUserSignin,} from "@modules/entrance/employee_signin/employeeSignin.schema";
import {zodResolver} from "@hookform/resolvers/zod";

const EmployeeSigninScreen: React.FC = () => {
    const {register, handleSubmit, formState: {errors} } = useForm<IUserSignin>({
        resolver: zodResolver(SUserSignin)
    });

    console.log("errors", errors)
    const sigIn = (formData: IUserSignin ) => {
        console.log("formData", formData)
    }

    return (
        <Layout>
            <VStack space='80px' alignItems='center' justifyContent='center' p='30px' mt='20px'>
                <SalooniLogo fill={'#A177AF'}
                             width={200}
                             height={200}/>

                <VStack space='50px'>
                    <Input placeholder={'E-mail'} {...register('email')}/>

                    <Input placeholder={'Senha'} {...register('password')}/>
                </VStack>

                <Button variant={'rounded'} size='lg' onPress={handleSubmit(sigIn)} >
                    {signin.VERIFY}
                </Button>

            </VStack>
        </Layout>
    )
}

export default EmployeeSigninScreen
