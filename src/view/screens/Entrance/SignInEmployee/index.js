import React, {useState} from 'react';
import SubmitButton from '../../../components/small/SubmitButton';
import * as S from './styled';
import SalooniLogo from '../../../../assets/icone11-nobackground.png';

import {useNavigation} from '@react-navigation/native';
import ErrorMessage from '../../../components/small/ErrorMessage';
import Input from '../../../components/small/Input';
import {useUser} from "../../../../hooks";
import Constants from "../../../../common/Constants";

import Colors from "../../../../common/style/Colors";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    signinValidationSchema,
    employeeSignupValidationSchema,
    employeeSigninValidationSchema
} from "../../../../common/validators/Schemas";
import {useLayout} from "../../../../hooks/Layout";
import {getEmployeeByEmail} from "../../../../services/EmployeeService";
import Errors from "../../../../common/Errors";

const defaultValues = {
    email: "parceiro1@gmail.com",
    password: "",
    cnpj: "62541680000108"
};


const SignInEmployee = () => {
    const {onSignup, onLogin} = useUser();
    const {handleModal, modal, handleLoading, clearModal} = useLayout();


    const [employee, setEmployee] = useState({})
    const [hasRegister, setHasRegister] = useState(false);
    const [step, setStep] = useState(0)


    const {control, handleSubmit, getValues, setValue} = useForm({
        defaultValues,
        resolver: yupResolver(hasRegister? employeeSigninValidationSchema: employeeSignupValidationSchema)
    });

    const verifyIfAlreadyEntered = async () => {
        try {
            const {employeeType, firstAccess, ...employeeData} = await getEmployeeByEmail(getValues("email").trim());

            setEmployee(employeeData)
            setValue("employee", employeeData)

            if (employeeType !== "FNC") {
                throw Errors.NOT_A_EMAIL_EMPLOYEE_ERROR;
            }

            if (!firstAccess) {
                handleModal({
                    ...modal,
                    visible: true,
                    variant: "confirm",
                    title: Constants.ATTENTION,
                    text: Constants.FOUND_EMAIL_EMPLOYEE,
                    okTitle: 'Ok',
                    onOk: () => {
                        setStep(1)
                        clearModal()
                    },
                });
            } else {
                handleModal({
                    ...modal,
                    visible: true,
                    variant: "confirm",
                    title: Constants.ATTENTION,
                    text: Constants.FIRST_ACCESS_EMPLOYEE_ALERT,
                    okTitle: 'Ok',
                    onOk: () => {
                        setHasRegister(true)
                        clearModal()
                    },
                });
            }
        } catch (error) {
            console.error("verifyIfAlreadyEnteredErrors", error)
            handleModal({...modal, title: Constants.ATTENTION, visible: true, variant: "alert", errors: [{message: error}]});
        }
    }

    const verifyCNPJ = async () => {
        const {salon: {cnpj}} = employee
        try {
            if (getValues("cnpj") !== cnpj) {
                handleModal({
                    ...modal,
                    title: Constants.ATTENTION,
                    visible: true,
                    variant: "alert",
                    errors: [{message: Errors.NOT_A_CNPJ_EMPLOYEE_ERROR}]
                });
            } else {
                handleModal({
                    ...modal,
                    visible: true,
                    variant: "confirm",
                    title: Constants.ATTENTION,
                    text: Constants.FOUND_CNPJ_EMPLOYEE,
                    okTitle: 'Ok',
                    onOk: () => {
                        setStep(2)
                        clearModal()
                    },
                });
            }
        } catch (error) {
            handleModal({...modal,  title: Constants.ATTENTION, visible: true, variant: "alert", errors: [{message: Errors.ERROR_MESSAGE}]});
        }
    };


    const signUp = async (data) => {
        handleLoading(true);
        try {
            await onSignup(data);
            handleLoading(false);
        } catch (error) {
            handleModal({...modal,  title: Constants.ATTENTION,visible: true, variant: "alert", errors: [{message: Errors.ERROR_MESSAGE}]});
            handleLoading(false);
        }
    };

    const login = async (data) => {
        handleLoading(true);
        try {
            await onLogin(data)
            handleLoading(false);
        } catch (error) {
            handleModal({...modal, visible: true, variant: "alert", errors: [{message: Errors.ERROR_MESSAGE}]});
            handleLoading(false);
        }
    };


    return (
        <S.Container>
            <S.Content>
                <S.SalooniLogo source={SalooniLogo}/>

                {step === 0 && (
                    <>
                        <Controller
                            name="email"
                            control={control}
                            render={({
                                         field: {onChange, value, name},
                                         fieldState: {error},
                                     }) => (
                                <Input
                                    handleChange={onChange}
                                    placeholderTextColor={'grey'}
                                    placeholder={'E-mail'}
                                    name={name}
                                    value={value}
                                    keyboard={'email-address'}
                                    width={'70%'}
                                    mask={'email'}
                                    color={Colors.PURPLE}
                                    label={'E-mail'}
                                    fontSize={44}
                                    error={error}
                                />)}/>

                        {hasRegister && (
                            <Controller
                                name="password"
                                control={control}
                                render={({
                                             field: {onChange, value, name},
                                             fieldState: {error},
                                         }) => (
                                    <Input
                                        handleChange={onChange}
                                        name={name}
                                        placeholder={'Senha'}
                                        value={value}
                                        isSecureTextEntry
                                        width={'70%'}
                                        mask={'password'}
                                        color={Colors.PURPLE}
                                        label={'Senha'}
                                        fontSize={44}
                                        error={error}

                                    />)}/>
                        )}

                        <SubmitButton
                            text={hasRegister ? 'Entrar' : 'Verificar'}
                            onPress={hasRegister ? handleSubmit(login) : verifyIfAlreadyEntered}
                            width={1.6}
                            height={15}
                            fontSize={40}
                            buttonColor={Colors.PURPLE}
                        />

                    </>
                )}

                {step === 1 && (
                    <>
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
                                    placeholder={'CNPJ'}
                                    value={value}
                                    mask={'cnpj'}
                                    keyboard={'numeric'}
                                    width={'70%'}
                                    color={Colors.PURPLE}
                                    label={'CNPJ do Salão'}
                                    fontSize={44}
                                    error={error}

                                />)}/>

                        <SubmitButton
                            text={'Validar'}
                            onPress={verifyCNPJ}
                            width={1.6}
                            height={15}
                            fontSize={40}
                            buttonColor={Colors.PURPLE}
                        />

                    </>

                )}

                {step === 2 && (
                    <>
                        <Controller
                            name="password"
                            control={control}
                            render={({
                                         field: {onChange, value, name},
                                         fieldState: {error},
                                     }) => (
                                <Input

                                    handleChange={onChange}
                                    name={name}
                                    value={value}
                                    placeholder={'Senha'}
                                    isSecureTextEntry
                                    keyboard={'default'}
                                    width={'70%'}
                                    mask={'password'}
                                    color={Colors.PURPLE}
                                    label={'Senha'}
                                    fontSize={44}
                                    error={error}

                                />)}/>

                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({
                                         field: {onChange, value, name},
                                         fieldState: {error},
                                     }) => (
                                <Input
                                    handleChange={onChange}
                                    name={name}
                                    value={value}
                                    placeholder={'Confirme sua senha'}
                                    isSecureTextEntry
                                    keyboard={'default'}
                                    width={'70%'}
                                    mask={'confirmPassword'}
                                    color={Colors.PURPLE}
                                    label={'Confirmação da Senha'}
                                    fontSize={44}
                                    error={error}
                                />)}/>

                        <SubmitButton
                            text={'Cadastrar'}
                            onPress={handleSubmit(signUp)}
                            width={1.6}
                            height={15}
                            fontSize={40}
                            buttonColor={Colors.PURPLE}
                        />
                    </>
                )}


            </S.Content>
        </S.Container>
    );
};

export default SignInEmployee;
