import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect, useState} from "react";
import {Controller, FormProvider, useFieldArray, useForm} from "react-hook-form";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Constants from "../../../../common/Errors";
import Input from "../../small/Input";
import {procedureValidationSchema} from "../../../../common/validators/Schemas";
import {InputModal} from "../../small/InputModal";
import Loading from "../../small/Loading";
import RegisterComponent from "../RegisterComponent";
import * as S from "./styled";
import {useLayout} from "../../../../hooks/Layout";


const defaultValues = {
    name: "",
    duration: "",
    cost: "",
    hasMaintenance: false,
    maintenanceValue: "",
    maintenanceDays: "",
    commissionPercentage: "",
    commissionFixedValue: "",
    isInView: false,
    salonId: "",
};


const ProcedureForm = ({
                           route,
                           color,
                           isSigningUp,
                           navigate,
                           saveProcedures,
                           updateProcedures,
                           contextSetValue
                       }) => {
        const methods = useForm({resolver: yupResolver(procedureValidationSchema)});
        const {control, reset, setValue, formState: {errors}, resetField} = methods;

        const [isEditing, setIsEditing] = useState(false);
        const [isPercentage, setIsPercentage] = useState(false);
        const [isFixedValue, setIsFixedValue] = useState(false);

        const {handleModal, modal, handleLoading, loading} = useLayout();


        useEffect(() => {
            if (!isSigningUp) {
                const employeeInView = route.params?.procedure;

                if (Object.keys(employeeInView).length !== 0) {
                    setIsEditing(true)
                    const {
                        id,
                        name,
                        cost,
                        duration,
                        maintenanceDays,
                        hasMaintenance,
                        maintenanceValue,
                        hasCommission,
                        commissionPercentage,
                        commissionValue,
                        isFixedValue,
                        isPercentage
                    } = employeeInView
                    setValue("id", id)
                    setValue("name", name)
                    setValue("cost", cost)
                    setValue("duration", duration)
                    setValue("hasMaintenance", hasMaintenance)
                    setValue("maintenanceValue", maintenanceValue)
                    setValue("maintenanceDays", maintenanceDays)
                    setValue("hasCommission", hasCommission)
                    setValue("commissionPercentage", commissionPercentage)
                    setValue("commissionFixedValue", commissionValue)

                    setIsFixedValue(isFixedValue)
                    setIsPercentage(isPercentage)

                    console.log("isFixedValue", commissionValue)

                }
            }
        }, [route])

        const handleCheckbox = (value, type) => {
            const setType = {
                "isPercentage": () => {
                    setIsPercentage(value);
                    setIsFixedValue(false)
                    setValue("commissionFixedValue", "")
                },
                "isFixedValue": () => {
                    setIsPercentage(false);
                    setIsFixedValue(value);
                    setValue("commissionPercentage", "")
                }
            }

            setType[type]()
        }

        const goBack = () => {
            navigate.push('ApplicationStack', {screen: 'Procedures'})
        }

        const onSave = async (procedures) => {
            handleLoading(true);
            try {
                await saveProcedures(procedures)
                handleLoading(false);
                goBack()
            } catch (error) {
                handleLoading(false);
                console.error(error);
            }
        }

        const onUpdate = async (procedure) => {
            handleLoading(true);
            try {
                await updateProcedures(procedure)
                handleLoading(false);
                goBack()
            } catch (error) {
                handleLoading(false);
                console.error(error);
            }
        }

        return (
            <FormProvider {...methods}>
                <RegisterComponent
                    isMultiInsert
                    isSigningUp={isSigningUp}
                    onCancel={() => navigate.goBack()}
                    color={color}
                    onConfirm={isEditing ? onUpdate : onSave}
                    isEditing={isEditing}
                    registeredItemRightInformation={"value"}
                    headerTitle={"Procedimentos"}
                    clearItem={reset}
                    itemType={"procedure"}
                    persistInForm={(procedures) => contextSetValue('procedures', procedures)}
                >

                    {/*<S.BodyContent isSigningUp={isSigningUp}>*/}
                        <Controller
                            name="name"
                            control={control}
                            render={({
                                         field: {onChange, value, name},
                                         fieldState: {error},
                                     }) => (
                                <Input
                                    handleChange={onChange}
                                    name={name}
                                    placeholder={"Nome do Procedimento"}
                                    value={value}
                                    width={"80%"}
                                    fontSize={40}
                                    color={color}
                                    label={"Nome*"}
                                    noEmpty
                                    error={error}
                                />
                            )}/>

                        <Controller
                            name="duration"
                            control={control}
                            render={({
                                         field: {onChange, value, name},
                                         fieldState: {error},
                                     }) => (
                                <Input
                                    handleChange={onChange}
                                    name={name}
                                    placeholder={"Duração do Procedimento"}
                                    value={value}
                                    width={"80%"}
                                    keyboardType={"numeric"}
                                    fontSize={40}
                                    mask={"hour"}
                                    maxLength={3}
                                    rightPlaceholder={"minutos"}
                                    color={color}
                                    label={"Duração*"}
                                    noEmpty
                                    error={error}
                                />
                            )}/>

                        <Controller
                            name="cost"
                            control={control}
                            render={({
                                         field: {onChange, value, name},
                                         fieldState: {error},
                                     }) => (
                                <Input
                                    handleChange={onChange}
                                    name={name}
                                    placeholder={"Valor do Procedimento*"}
                                    value={value}
                                    width={"80%"}
                                    keyboardType={"numeric"}
                                    fontSize={40}
                                    mask={"brl"}
                                    leftPlaceholder={"R$"}
                                    color={color}
                                    label={"Valor*"}
                                    noEmpty
                                    error={error}
                                />
                            )}
                        />

                        <Controller
                            name="hasMaintenance"
                            control={control}
                            render={({
                                         field: {onChange, value, name},
                                     }) => (
                                <InputModal
                                    name={name}
                                    inputTitle={"Manutenção"}
                                    handleSwitch={onChange}
                                    switchState={value}
                                >

                                    <Controller
                                        name="maintenanceValue"
                                        control={control}
                                        render={({
                                                     field: {onChange, value, name},
                                                     fieldState: {error},
                                                 }) => (
                                            <Input
                                                handleChange={onChange}
                                                name={name}
                                                placeholder={"Valor de Manutenção"}
                                                value={value}
                                                width={"80%"}
                                                keyboardType={"numeric"}
                                                fontSize={40}
                                                mask="brl"
                                                leftPlaceholder={"R$"}
                                                color={color}
                                                label={"Valor*"}
                                                noEmpty
                                                error={error}
                                            />)}/>

                                    <Controller
                                        name="maintenanceDays"
                                        control={control}
                                        render={({
                                                     field: {onChange, value, name},
                                                     fieldState: {error},
                                                 }) => (
                                            <Input
                                                handleChange={onChange}
                                                name={name}
                                                placeholder={"Dias para Manutenção"}
                                                value={value}
                                                width={"80%"}
                                                keyboardType={"numeric"}
                                                fontSize={40}
                                                mask="none"
                                                color={color}
                                                label={"Dias*"}
                                                noEmpty
                                                error={error}
                                            />)}/>
                                </InputModal>
                            )}/>

                        <Controller
                            name="hasCommission"
                            control={control}
                            render={({
                                         field: {onChange, value, name},
                                     }) => (
                                <InputModal
                                    name={name}
                                    inputTitle={"Comissão"}
                                    handleSwitch={onChange}
                                    switchState={value}
                                >
                                    <S.CheckboxContainer>
                                        <S.CheckboxContent>
                                            {/*<BouncyCheckbox*/}
                                            {/*    isChecked={isPercentage}*/}
                                            {/*    onPress={() =>*/}
                                            {/*        handleCheckbox(!isPercentage, "isPercentage")*/}
                                            {/*    }*/}
                                            {/*    fillColor={color}*/}
                                            {/*    disableBuiltInState*/}
                                            {/*    disableText*/}
                                            {/*/>*/}

                                            <Controller
                                                name="commissionPercentage"
                                                control={control}
                                                render={({
                                                             field: {onChange, value, name},
                                                         }) => (
                                                    <Input
                                                        handleChange={(value) => {onChange(value); setValue("commissionFixedValue")}}
                                                        name={name}
                                                        value={value}
                                                        width={"100%"}
                                                        keyboardType={"numeric"}
                                                        placeholder={"0%"}
                                                        fontSize={38}
                                                        mask={"percentage"}
                                                        maxLength={3}
                                                        rightPlaceholder={"%"}
                                                        color={color}
                                                        label={"Porcentagem"}
                                                    />)}/>

                                        </S.CheckboxContent>

                                        <S.CheckboxContent>
                                            {/*<BouncyCheckbox*/}
                                            {/*    style={{borderColor: color}}*/}
                                            {/*    isChecked={isFixedValue}*/}
                                            {/*    onPress={() =>*/}
                                            {/*        handleCheckbox(!isFixedValue, "isFixedValue")*/}
                                            {/*    }*/}
                                            {/*    fillColor={color}*/}
                                            {/*    disableBuiltInState*/}
                                            {/*    disableText*/}
                                            {/*/>*/}

                                            <Controller
                                                name="commissionFixedValue"
                                                control={control}
                                                render={({
                                                             field: {onChange, value, name},
                                                             fieldState: {error},
                                                         }) => (
                                                    <Input
                                                        handleChange={(value) => {onChange(value); setValue("commissionPercentage")}}
                                                        name={name}
                                                        value={value}
                                                        width={"100%"}
                                                        placeholder={"R$0,00"}
                                                        keyboardType={"numeric"}
                                                        fontSize={38}
                                                        mask={"brl"}
                                                        leftPlaceholder={"R$"}
                                                        color={color}
                                                        label={"Valor"}
                                                        error={error}
                                                    />)}/>
                                        </S.CheckboxContent>
                                    </S.CheckboxContainer>
                                </InputModal>
                            )}/>
                    {/*</S.BodyContent>*/}

                </RegisterComponent>
            </FormProvider>
        )
            ;
    }
;

export default ProcedureForm;
