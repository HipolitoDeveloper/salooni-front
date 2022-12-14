import React from "react";
import Layout from "@components/layout/Layout";
import {Flex, HStack, Pressable, Text, VStack} from "native-base";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";
import Input from "@components/form/Input";
import Button from "@components/form/Button";
import {signin} from "@common/typograph";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SUserSignin, TUserSignin} from "@modules/entrance/entrance.schema";
import {useLayout} from "@hooks/layout/useLayout";
import {TGraphQLError} from "../../../types/graphQL.type";
import useSession from "@hooks/session/useSession";
import {useNavigation} from "@react-navigation/native";
import {TEntranceStack} from "../../../routes/entrance.stack";
import {useCallCloudCodeMutation} from "@modules/cloud/cloud.graphql.generated";
import {CloudCodeFunction} from "../../../schema";
import {EUserAccType} from "../../../types/user.type";
import {ERouteState, useAppRouteState} from "@hooks/route/useAppRouteState";

const defaultValue = {
    "email": "33@gmail.com",
    "password": '123245'
}

const OwnerSigninScreen: React.FC = () => {
    const {handleGraphQLError, handleLoading} = useLayout();
    const {session, handleSession} = useSession()
    const {navigate} = useNavigation<TEntranceStack>();
    const {handleRouteState} = useAppRouteState()


    const {handleSubmit, control} = useForm<TUserSignin>({
        resolver: zodResolver(SUserSignin),
        defaultValues: defaultValue

    });

    const [callCloud] = useCallCloudCodeMutation({
        onCompleted({callCloudCode: {result: {data}}}) {
            handleSession({viewer: data})
            handleLoading(false)
            handleRouteState(ERouteState.IN)
        },
        onError(error) {
            handleGraphQLError(JSON.parse(JSON.stringify(error)) as TGraphQLError)
            handleLoading(false)
        }
    })

    const signIn = async (formData: TUserSignin) => {
        handleLoading(true)
        await callCloud({
            variables: {
                input: {
                    functionName: CloudCodeFunction.Signin,
                    params: {
                        username: formData.email,
                        password: formData.password,
                        "acceptedAccType": EUserAccType.OWN
                    }
                }
            },
        })
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
                        <Pressable onPress={() => navigate('UserSignup')}>
                            <Text color='purple.1000'>{signin.SIGNUP}</Text>

                        </Pressable>
                    </HStack>
                </Button>
            </VStack>
        </Layout>
    )
}

export default OwnerSigninScreen
