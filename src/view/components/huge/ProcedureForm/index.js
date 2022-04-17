import {yupResolver} from "@hookform/resolvers/yup";
import React, {useState} from "react";
import {Controller, FormProvider, useForm, useFormContext} from "react-hook-form";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Constants from "../../../../common/Errors";
import {useProcedure, useUser} from "../../../../hooks";
import Input from "../../small/Input";
import {procedureValidationSchema} from "../../../../common/validators/Schemas";
import {InputModal} from "../../small/InputModal";
import Loading from "../../small/Loading";
import RegisterComponent from "../RegisterComponent";
import * as S from "./styled";


const defaultValues = {
    name: "",
    duration: "",
    cost: "",
    hasMaintenance: false,
    maintenanceValue: "",
    maintenanceDays: "",
    commissionPercentage: "",
    commissionFixedValue: "",
    indexInView: 0,
    isInView: false,
    salonId: "",
};


const ProcedureForm = ({
                           route,
                           color,
                           isSigningUp,
                           navigate,
                           saveProcedures,
                           updateProcedures
                       }) => {


        const {currentUser} = useUser();
        const {setValue: contextSetValue, getValues: contextGetValues} = useFormContext();
        const methods = useForm({defaultValues, resolver: yupResolver(procedureValidationSchema)});

        const [isLoading, setIsLoading] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const [showAlertModal, setShowAlertModal] = useState({
            isShowing: false,
            text: "",
        });
        const [commissionCheckbox, setCommissionCheckbox] = useState({
            isPercentage: false,
            isFixedValue: false,
        });

        const {control, reset} = methods;

        navigate.addListener("focus", () => {
            if (!isSigningUp) {
                const procedureInView = route.params?.procedure;

                if (Object.keys(procedureInView).length !== 0) {
                    setIsEditing(true);
                }
            }
        });

        const handleCommissionCheckbox = (state, property) => {
            setCommissionCheckbox({
                [Object.keys(commissionCheckbox).find(type => type !== property)]: false,
                [property]: state,
            });
        };

        const handleModal = (isShowing, text, isNavigating) => {
            setShowAlertModal({isShowing: isShowing, text: text});

            if (isNavigating) {
                navigate.navigate("SignupPartners");
            }
        };

        const onSave = (procedures) => {
            setIsLoading(true);

            saveProcedures(procedures).then(
                () => {
                    setTimeout(() => {
                        setIsLoading(false);
                        navigate.goBack();
                        reset();
                    }, 3000);
                    // handleErrorMessage([""]);
                },
                error => {
                    setIsLoading(false);
                    console.log(error);
                },
            );
        };

        const onUpdate = (data) => {
            setIsLoading(true);
            updateProcedures(data).then(
                async () => {
                    setTimeout(() => {
                        setIsLoading(false);
                        navigate.goBack();
                        reset();
                    }, 1000);
                    // handleErrorMessage([""]);
                },
                error => {
                    setIsLoading(false);
                    console.log(error);
                },
            );
        };

        const handleException = () => {
            handleModal(true, Constants.NO_PROCEDURE_ALERT, false);
        };

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
                    handleException={handleException}
                    persistInForm={(procedures) => contextSetValue('procedures', procedures)}
                >

                    <Loading isLoading={isLoading} color={color}/>
                    <S.BodyContent isSigningUp={isSigningUp}>
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
                                            <BouncyCheckbox
                                                isChecked={commissionCheckbox.isPercentage}
                                                onPress={() =>
                                                    handleCommissionCheckbox(!commissionCheckbox.isPercentage, "isPercentage")
                                                }
                                                fillColor={color}
                                                disableBuiltInState
                                                disableText
                                            />

                                            <Controller
                                                name="commissionPercentage"
                                                control={control}
                                                render={({
                                                             field: {onChange, value, name},
                                                         }) => (
                                                    <Input
                                                        handleChange={onChange}
                                                        name={name}
                                                        value={value}
                                                        width={"73%"}
                                                        keyboardType={"numeric"}
                                                        placeholder={"Porcentagem da Comissão"}
                                                        fontSize={38}
                                                        mask={"percentage"}
                                                        maxLength={3}
                                                        rightPlaceholder={"%"}
                                                        color={color}
                                                        label={"Porcentagem"}
                                                    />)}/>

                                        </S.CheckboxContent>

                                        <S.CheckboxContent>
                                            <BouncyCheckbox
                                                style={{borderColor: color}}
                                                isChecked={commissionCheckbox.isFixedValue}
                                                onPress={() =>
                                                    handleCommissionCheckbox(!commissionCheckbox.isFixedValue, "isFixedValue")
                                                }
                                                fillColor={color}
                                                disableBuiltInState
                                                disableText
                                            />

                                            <Controller
                                                name="commissionFixedValue"
                                                control={control}
                                                render={({
                                                             field: {onChange, value, name},
                                                             fieldState: {error},
                                                         }) => (
                                                    <Input
                                                        handleChange={onChange}
                                                        name={name}
                                                        value={value}
                                                        width={"73%"}
                                                        placeholder={"Valor da Comissão."}
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
                    </S.BodyContent>

                </RegisterComponent>
            </FormProvider>
        )
            ;
    }
;

export default ProcedureForm;
