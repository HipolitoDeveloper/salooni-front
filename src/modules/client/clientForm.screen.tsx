import React from "react";
import Layout from "@components/layout/Layout";
import ActionHeader from "@components/form/ActionHeader";
import {application, successMessages} from "@common/typograph";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {useNavigation} from "@react-navigation/native";
import {TAppStack} from "../../routes/app.stack";
import {SClientForm, TClientForm} from "@modules/client/clientForm.schema";
import Input from "@components/form/Input";
import LayoutForm from "@components/layout/LayoutForm";
import DatePickerInput from "@components/form/datepicker/DatePickerInput";
import useSession from "@hooks/session/useSession";
import {TGraphQLError} from "../../types/graphQL.type";
import {useCreateClientMutation} from "@modules/client/client.graphql.generated";
import {useLayout} from "@hooks/layout/useLayout";
import {dialogUsefulButtons} from "@components/dialogs/Dialog";

const defaultValue = {
    birthdate: new Date(),
    name: "123123",
    tel: "11 9997257490",
    email: "gabriel@gmail.com"
}

const ClientFormScreen = () => {
    const {goBack} = useNavigation<TAppStack>();
    const {session} = useSession()
    const {handleGraphQLError, handleSuccessDialog, handleLoading} = useLayout();


    const {handleSubmit, control, reset} = useForm<TClientForm>({
        resolver: zodResolver(SClientForm),
        defaultValues: defaultValue
    });

    const [createClient] = useCreateClientMutation({
        onCompleted() {
            handleSuccessDialog({
                description: successMessages.CREATION_SUCCESS,
                buttons: dialogUsefulButtons['yesOrNo']
            })
            handleLoading(false)
        },
        onError(error) {
            handleGraphQLError(JSON.parse(JSON.stringify(error)) as TGraphQLError)
            handleLoading(false)
        }
    })

    const submit = async (formData: TClientForm) => {
        const data = {
            ...formData,
            birthdate: new Date(formData.birthdate).toISOString(),
            salon_id: {
                link: session.salon.id
            }
        }
        handleSuccessDialog({
            description: successMessages.CREATION_SUCCESS,
            buttons: [{...dialogUsefulButtons['yesOrNo'][0], onPress: () => {}}, {...dialogUsefulButtons['yesOrNo'][1]}]
        })
        // await createClient({
        //     variables: {
        //         input: {
        //             fields: data
        //         }
        //     }
        // })

    }

    const resetForm = async () => {
        reset();
    }

    return (
        <Layout>
            <ActionHeader onConfirm={handleSubmit(submit)} onCancel={goBack}
                          title={application.CLIENT} color={'purple.1000'}/>
            <LayoutForm>
                <Input placeholder={'Nome'} control={control} name={'name'}/>
                <Input placeholder={'E-mail'} control={control} name={'email'}/>
                <DatePickerInput
                    inputProps={{placeholder: 'Data de nascimento'}}
                    datePickerModalProps={{mode: 'calendar'}}
                    control={control}
                    name={'birthdate'}/>
                <Input placeholder={'Celular'} control={control} name={'tel'}/>
            </LayoutForm>
        </Layout>
    )
}

export default ClientFormScreen
