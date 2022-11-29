import React from "react";
import Layout from "@components/layout/Layout";
import {Flex, HStack, Text, VStack} from "native-base";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";
import Input from "@components/form/Input";
import Button from "@components/form/Button";
import {signin} from "@common/typograph";

const OwnerSigninScreen: React.FC = () => {

    return (
        <Layout>
            <VStack space='50px' alignItems='center' justifyContent='center' p='30px' mt='20px'>
                <SalooniLogo fill={'#A177AF'}
                             width={200}
                             height={200}/>

                <Input placeholder={'E-mail'}/>

                <Input placeholder={'Senha'}/>

                <Flex alignItems='flex-end' w='100%'>
                    <Button variant='link'>
                        <Text fontSize='md' color='purple.1000'>Esqueceu a senha?</Text>
                    </Button>
                </Flex>

                <Button variant={'rounded'} size='lg'>
                    {signin.ENTER}
                </Button>

                <Button variant='link' flexDirection='row' w='100%'>
                    <HStack>
                        <Text color='black.1000'>{signin.DONT_HAVE_USER} {' '}
                        </Text>
                        <Text color='purple.1000'>{signin.SIGNUP}</Text>
                    </HStack>
                </Button>
            </VStack>
        </Layout>
    )
}

export default OwnerSigninScreen
