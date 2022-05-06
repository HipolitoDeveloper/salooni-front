import {useIsFocused, useNavigation} from "@react-navigation/native";
import {xorBy} from "lodash";
import React, {useEffect, useState} from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {View} from "react-native";
import {useLayout} from "../../../../hooks/Layout";
import Input from "../../small/Input";
import Loading from "../../small/Loading";
import MultipleSelect from "../../small/MultipleSelect";
import RegisterComponent from "../RegisterComponent";
import * as S from "./styled";
import {yupResolver} from "@hookform/resolvers/yup";
import {employeeValidationSchema} from "../../../../common/validators/Schemas";
import Errors from "../../../../common/Errors";
import Constants from "../../../../common/Constants";
import {useProcedure, useUser} from "../../../../hooks";



const defaultValues = {
    name: "Gabriel",
    email: "parceiro@gmail.com",
    tel: "11 99725749",
    cnpj: "63520024000191",
    employeeType: "PRC",
    procedures: [],
    isInView: false,
};


const EmployeeForm = ({
                          route,
                          goBack,
                          isSigningUp,
                          color,
                          isMultiInsert,
                          procedures,
                          saveEmployee,
                          updateEmployee,
                          contextSetValue,
                          idSalon,
                      }) => {
    const methods = useForm({
        // defaultValues,
        resolver: yupResolver(employeeValidationSchema),
    });
    const {control, reset, setValue, getValues} = methods;

    const {handleModal, modal, handleLoading} = useLayout();

    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isSigningUp) {
            const employeeInView = route.params?.employee;

            if (Object.keys(employeeInView).length !== 0) {
                setIsEditing(true)
                const {id, name, cnpj, tel, email, procedures: employeeProcedures, employeeType} = employeeInView
                setValue("id", id)
                setValue("name", name)
                setValue("cnpj", cnpj)
                setValue("tel", tel)
                setValue("email", email)
                setValue("procedures", employeeProcedures?.map(employeeProcedure => {
                    const availableProcedure = procedures.find(procedure => employeeProcedure.id === procedure.id)
                    return {id: availableProcedure?.id, name: availableProcedure?.name}
                }))
                setValue("employeeType", employeeType)
            }
        }
    }, [procedures])

    const handleMultiSelect = (items, callback) => {
        let selectedItem = xorBy(getValues("procedures"), [items], "name");
        callback(selectedItem);
    };

    const onSave = async (data) => {
        handleLoading(true);
        if (!isSigningUp) data.salonId = idSalon
        data.employeeType = "FNC"
        try {
            await saveEmployee(data);
            handleLoading(false);
            handleModal({
                ...modal,
                visible: true,
                variant: "confirm",
                title: Constants.ATTENTION,
                text: Constants.MORE_EMPLOYEE_REGISTER,
                onOk: () => {
                    reset();
                },
                onClose: () => {
                    goBack();
                },
            });
        } catch (err) {
            console.error("OnSaveEmployeeError", err);
            handleLoading(false);
            handleModal({
                ...modal,
                visible: true,
                variant: "alert",
                errors: [{message: Errors.DUPLICATE_EMAIL_ERROR}],
            });
        }
    };

    const onUpdate = async (data) => {
        console.log("data", data)
        handleLoading(true);
        try {
            await updateEmployee(data)
            handleLoading(false);
            navigate.push("TabStack", {screen: "Employees"});

        } catch (error) {
            console.error(error)
            handleLoading(false);
        }
    };

    const clearProcedures = () => {
        if(contextSetValue) {
            contextSetValue("procedures", []);
        } else {
            setValue("procedures", [])
        }
    };

    return (
        <FormProvider {...methods}>
            <RegisterComponent
                isSigningUp={isSigningUp}
                onCancel={goBack}
                color={color}
                onConfirm={isEditing ? onUpdate : onSave}
                isEditing={isEditing}
                registeredItemRightInformation={"procedures"}
                headerTitle={"Parceiros"}
                isMultiInsert={isMultiInsert}
                clearItem={reset}
                itemType={"employee"}
                persistInForm={(employees) => contextSetValue("employees", employees)}
            >
                <S.BodyContent>
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
                                placeholder={"Nome do Parceiro"}
                                value={value}
                                width={"80%"}
                                keyboardType={"default"}
                                fontSize={44}
                                color={color}
                                label={"Nome*"}
                                error={error}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <Input
                                handleChange={onChange}
                                name={name}
                                placeholder={"E-mail"}
                                value={value}
                                width={"80%"}
                                keyboardType={"email-address"}
                                fontSize={44}
                                mask="email"
                                noEmpty
                                color={color}
                                label={"E-mail*"}
                                error={error}
                            />
                        )}
                    />

                    <Controller
                        name="tel"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <Input
                                handleChange={onChange}
                                name={name}
                                placeholder={"Celular do Parceiro"}
                                value={value}
                                width={"80%"}
                                keyboard={"numeric"}
                                fontSize={44}
                                mask={"phone"}
                                noEmpty
                                color={color}
                                label={"Celular*"}
                                error={error}
                            />
                        )}
                    />

                    <Controller
                        name="cnpj"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <Input
                                handleChange={onChange}
                                name={name}
                                placeholder={"CNPJ do Parceiro"}
                                value={value}
                                width={"80%"}
                                keyboardType={"numeric"}
                                fontSize={44}
                                mask={"cnpj"}
                                color={color}
                                label={"CNPJ"}
                                error={error}

                            />
                        )}
                    />

                    <View
                        style={{
                            width: "80%",
                            marginTop: 40,
                        }}
                    >
                            <Controller
                                name="procedures"
                                control={control}
                                render={({
                                             field: {onChange, value, name},
                                             fieldState: {error},
                                         }) => (
                                    <MultipleSelect
                                        iconColor={color}
                                        plusIconColor={color}
                                        modalHeaderText={"Escolha os procedimentos"}
                                        options={procedures?.map(procedure => {
                                            return {
                                                ...procedure,
                                                selected: getValues("procedures")?.some(employeeProcedure => employeeProcedure.id === procedure.id)
                                            }
                                        })}
                                        selectTextColor={"black"}
                                        selectedItemBorderColor={color}
                                        value={value ?? []}
                                        handleMultiSelect={(items) => handleMultiSelect(items, onChange)}
                                        navigate={navigate}
                                        inputText={"Procedimentos"}
                                        clearValue={clearProcedures}
                                        error={error}
                                    />
                                )}
                            />

                    </View>
                </S.BodyContent>
            </RegisterComponent>
        </FormProvider>
    );
};

export default EmployeeForm;
