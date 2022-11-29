import React from "react";
import Layout from "@components/layout/Layout";
import {Text, VStack} from "native-base";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";
import Input from "@components/form/Input";
import Button from "@components/form/Button";
import {signin} from "@common/typograph";

const EmployeeSigninScreen: React.FC = () => {

    return (
        <Layout>
            <VStack space='80px' alignItems='center' justifyContent='center' p='30px' mt='20px'>
                <SalooniLogo fill={'#A177AF'}
                             width={200}
                             height={200}/>

                <VStack space='50px'>
                    <Input placeholder={'E-mail'}/>

                    <Input placeholder={'Senha'}/>
                </VStack>

                <Button variant={'rounded'} size='lg'>
                    {signin.VERIFY}
                </Button>

            </VStack>
        </Layout>
    )
}

export default EmployeeSigninScreen
