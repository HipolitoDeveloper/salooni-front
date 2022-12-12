import React, {useCallback, useState} from "react";
import Layout from "@components/layout/Layout";
import {Box, Center, HStack, Pressable, Text, VStack} from "native-base";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";
import {TEmployeeEntranceOptions} from "../../../types/entrance.type";
import EmployeeSignup from "@components/employee_module/signup/EmployeeSignup";
import EmployeeSignin from "@components/employee_module/signin/EmployeeSignin";

const EmployeeSigninScreen: React.FC = () => {
    const [selectedEntranceOption, setSelectedEntranceOption] = useState<TEmployeeEntranceOptions>('signin')

    const renderEntranceOption = useCallback(() => {
        const steps = {
            'signin': (
                <EmployeeSignin/>),
            'signup': (
                <EmployeeSignup/>)
        }

        return steps[selectedEntranceOption]
    }, [selectedEntranceOption])

    return (
        <Layout>
            <VStack display='flex' space='80px' alignItems='center' justifyContent='center' p='30px' mt='20px'>
                <SalooniLogo fill={'#A177AF'}
                             width={200}
                             height={200}/>

                <Box h={250} w='100%' >
                    {renderEntranceOption()}
                </Box>
                <Center>
                    <HStack space='5px'>
                        <Pressable onPress={() => setSelectedEntranceOption('signin')}>
                            <Text color={selectedEntranceOption === 'signin' ? 'black.1000' : 'purple.1000'}
                                  fontWeight='bold'>Já possui um cadastro?</Text>
                        </Pressable>
                        <Text fontWeight='bold'>/</Text>
                        <Pressable onPress={() => setSelectedEntranceOption('signup')}>
                            <Text color={selectedEntranceOption === 'signup' ? 'black.1000' : 'purple.1000'}
                                  fontWeight='bold'>Cadastre-se</Text>
                        </Pressable>
                    </HStack>
                </Center>
            </VStack>

        </Layout>
    )
}

export default EmployeeSigninScreen
