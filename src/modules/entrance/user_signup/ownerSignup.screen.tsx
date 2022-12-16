import React from "react";
import Layout from "@components/layout/Layout";
import ActionHeader from "@components/form/ActionHeader";
import {entrance, successMessages} from "@common/typograph";
import {useLayout} from "@hooks/layout/useLayout";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {SOwnerSignup, TOwnerSignup} from "@modules/entrance/user_signup/ownerSignup.schema";
import {Center, VStack} from "native-base";
import Input from "@components/form/Input";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";
import {useCallCloudCodeMutation} from "@modules/cloud/cloud.graphql.generated";
import {TGraphQLError} from "../../../types/graphQL.type";
import useSession from "@hooks/session/useSession";
import {CloudCodeFunction} from "../../../schema";
import {useNavigation} from "@react-navigation/native";
import {TEntranceStack} from "../../../routes/entrance.stack";
import {EUserAccType} from "../../../types/user.type";

const defaultValue = {
    "salonName": "TESTE233",
    "employeeName": "Teste",
    "tel": "3",
    "email": "33@gmail.com",
    "password": '123245'
}

const UserSignup = () => {
    const {handleGraphQLError, handleSuccessDialog, handleLoading} = useLayout();
    const {handleSession} = useSession()
    const {goBack} = useNavigation<TEntranceStack>();

    const {handleSubmit, control} = useForm<TOwnerSignup>({
        resolver: zodResolver(SOwnerSignup),
        defaultValues: defaultValue
    });
    const [callCloud] = useCallCloudCodeMutation({
        onCompleted({callCloudCode: {result: {data}}}) {
            handleSession({viewer: data})
            handleSuccessDialog(successMessages.SIGNUP_SUCCESS)
            handleLoading(false)
        },
        onError(error) {
            handleGraphQLError(JSON.parse(JSON.stringify(error)) as TGraphQLError)
            handleLoading(false)
        }
    })

    const signUp = async (formData: TOwnerSignup) => {
        handleLoading(true)
        await callCloud({
            variables: {
                input: {
                    functionName: CloudCodeFunction.Signup,
                    params: {...formData, salonName: formData.salonName.toLowerCase().trim(), acctype: EUserAccType.OWN}
                }
            },
        })
    }

    return (
        <Layout>
            <ActionHeader onConfirm={handleSubmit(signUp)} onCancel={goBack}
                          title={entrance.WELCOME} color={'purple.1000'}/>

            <VStack justifyContent='space-around' h='80%'>
                <VStack space='30px' p='20px'>
                    <Input placeholder={'Nome'} control={control} name={'employeeName'} keyboardType={'default'}/>
                    <Input placeholder={'E-mail'} control={control} name={'email'}
                           keyboardType={'email-address'}/>
                    <Input placeholder={'Telefone'} control={control} name={'tel'} keyboardType={'phone-pad'}/>
                    <Input placeholder={'Salão'} control={control} name={'salonName'} keyboardType={'default'}/>
                    <Input placeholder={'Senha'} control={control} name={'password'} keyboardType={'default'}
                           secureTextEntry={true}/>


                </VStack>
                <Center>
                    <SalooniLogo fill={'#A177AF'}
                                 borderFill={'#A177AF'}
                                 width={150}
                                 height={150}/>
                </Center>
            </VStack>
        </Layout>
    )
}

export default UserSignup