import React from "react";
import Layout from "@components/layout/Layout";
import {Flex, HStack, Text, VStack} from "native-base";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";
import Input from "@components/form/Input";
import Button from "@components/form/Button";
import {signin} from "@common/typograph";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLogInMutation} from "@modules/entrance/entrance.graphql.generated";
import {IUserSignin, SUserSignin} from "@modules/entrance/entrance.schema";
import {useLayout} from "@hooks/layout/useLayout";
import {TGraphQLError} from "@interfaces/graphQL";
import useSession from "@hooks/session/useSession";
import Reactotron from "reactotron-react-native";

const OwnerSigninScreen: React.FC = () => {
    const {handleGraphQLError} = useLayout();
    const {session, handleSession} = useSession()

    const {handleSubmit, control} = useForm<IUserSignin>({
        resolver: zodResolver(SUserSignin)
    });

    const [logIn] = useLogInMutation({
        onCompleted({logIn: {viewer: {sessionToken, user}}}) {

        },
        onError(error) {
            handleGraphQLError(JSON.parse(JSON.stringify(error)) as TGraphQLError)
        }
    })

    const signIn = async (formData: IUserSignin) => {
        const {data: {logIn: data}} = await logIn({
            variables: {
                input: {
                    username: formData.email,
                    password: formData.password
                }
            },
        })

        handleSession(data)

    }

    return (
        <Layout>
            <VStack space='50px' alignItems='center' justifyContent='center' p='30px' mt='20px'>
                <SalooniLogo fill={'#A177AF'}
                             width={200}
                             height={200}/>


                <Input placeholder={'E-mail'} control={control} name={'email'} keyboardType={'email-address'}/>

                <Input placeholder={'Senha'} control={control} name={'password'} secureTextEntry={true}/>

                <Flex alignItems='flex-end' w='100%'>
                    <Button variant='link'>
                        <Text fontSize='md' color='purple.1000'>Esqueceu a senha?</Text>
                    </Button>
                </Flex>

                <Button variant={'rounded'} size='lg' onPress={handleSubmit(signIn)}>
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
