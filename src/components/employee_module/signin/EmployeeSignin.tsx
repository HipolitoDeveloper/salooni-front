import React, {useState} from "react";
import Input from "@components/form/Input";
import {Flex, Text, VStack} from "native-base";
import Button from "@components/form/Button";
import {signin} from "@common/typograph";
import {useLayout} from "@hooks/layout/useLayout";
import useSession from "@hooks/session/useSession";
import {useNavigation} from "@react-navigation/native";
import {TEntranceStack} from "../../../routes/entrance.stack";
import {useForm} from "react-hook-form";
import {SUserSignin, TUserSignin} from "@modules/entrance/entrance.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLogInMutation} from "@modules/entrance/entrance.graphql.generated";
import {TGraphQLError} from "../../../types/graphQL.type";
import {CloudCodeFunction} from "../../../schema";
import {EUserAccType} from "../../../types/user.type";
import {useCallCloudCodeMutation} from "@modules/cloud/cloud.graphql.generated";

const defaultValue = {
    "email": "33@gmail.com",
    "password": '123245'
}

const EmployeeSignin = () => {
    const {handleGraphQLError,handleLoading} = useLayout();
    const {session, handleSession} = useSession()
    const {navigate} = useNavigation<TEntranceStack>();

    const {handleSubmit, control} = useForm<TUserSignin>({
        resolver: zodResolver(SUserSignin),
        defaultValues: defaultValue

    });

    const [callCloud] = useCallCloudCodeMutation({
        onCompleted({callCloudCode: {result: {data}}}) {
            handleSession({viewer: data})
            handleLoading(false)
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
                        "acceptedAccType": EUserAccType.EMP
                    }
                }
            },
        })
    }

    return(
        <VStack space='50px' alignItems='center' justifyContent='center'  mt='20px'>
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
        </VStack>
    )
}

export default EmployeeSignin
