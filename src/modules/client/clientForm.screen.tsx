import React from "react";
import Layout from "@components/layout/Layout";
import ActionHeader from "@components/form/ActionHeader";
import {application} from "@common/typograph";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {useNavigation} from "@react-navigation/native";
import {TAppStack} from "../../routes/app.stack";
import {SClientForm, TClientForm} from "@modules/client/clientForm.schema";
import Input from "@components/form/Input";
import LayoutForm from "@components/layout/LayoutForm";
import DatePickerInput from "@components/form/datepicker/DatePickerInput";

const defaultValue = {
    birthdate: new Date(),
    name: "",
    tel: "",
    email: ""
}

const ClientFormScreen = () => {
    const {goBack} = useNavigation<TAppStack>();


    const {handleSubmit, control} = useForm<TClientForm>({
        resolver: zodResolver(SClientForm),
        defaultValues: defaultValue
    });

    const submit = () => {

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
