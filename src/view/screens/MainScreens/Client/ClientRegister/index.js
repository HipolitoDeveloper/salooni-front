import RNDateTimePicker from "@react-native-community/datetimepicker";
import {useNavigation} from "@react-navigation/native";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Dimensions} from "react-native";
import RegisterComponent from "../../../../components/huge/RegisterComponent";
import ErrorMessage from "../../../../components/small/ErrorMessage";
import Input from "../../../../components/small/Input";
import {InputPlaceholder, InputTitle} from "../../../../components/small/Input/styled";

import Loading from "../../../../components/small/Loading";
import * as S from "./styled";
import Colors from "../../../../../common/style/Colors";
import {useClient, useUser} from "../../../../../hooks";
import {Controller, FormProvider, useForm} from "react-hook-form";

import Constants from "../../../../../common/Constants";
import Errors from "../../../../../common/Errors";
import {useLayout} from "../../../../../hooks/Layout";
import {yupResolver} from "@hookform/resolvers/yup";
import {clientValidationSchema} from "../../../../../common/validators/Schemas";
import DatePicker from "../../../../components/small/DatePicker";

const defaultValues = {
    name: "Gabriel",
    email: "parceiro@gmail.com",
    cpf: "47287935830",
    birthDate: "",
    tel: "11999725749",
    tel2: "",
};


const ClientRegister = ({route}) => {
    const methods = useForm({
        // defaultValues,
        resolver: yupResolver(clientValidationSchema),
    });

    const {control, reset, setValue, getValues} = methods;

    const {
        saveClient,
        updateClient,
        clients,
    } = useClient();

    const {currentUser} = useUser();
    const {handleModal, modal, handleLoading} = useLayout();
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState({
        isShowing: false,
        text: "",
    });

    const [showDate, setShowDate] = useState(false);

    const navigate = useNavigation();
    const screenHeight = Dimensions.get("screen").height;

    useEffect(() => {
            const clientInView = route.params?.client;

            if (Object.keys(clientInView).length !== 0) {
                setIsEditing(true)
                const {id, name, cpf, tel, email, birthDate, tel2} = clientInView
                setValue("id", id)
                setValue("name", name)
                setValue("cpf", cpf)
                setValue("tel", tel)
                setValue("tel2", tel2)
                setValue("email", email)
                setValue("birthDate", birthDate)
            }
    }, [route])

    const onChangeDate = (event, selectedDate) => {
        if (event.type === "neutralButtonPressed") {
            setShowDate(false);
        } else {

            selectedDate = selectedDate || getValues("birthDate");
            setValue("birthDate", selectedDate)
            setShowDate(false);
        }
    };


    const saveClients = async (data) => {
        handleLoading(true);
        try {
            data.salonId = currentUser.idSalon;
            // data.birthDate = isDateSelected ? client.birthDate : null;
            await saveClient(data)
            handleLoading(false);
            handleModal({
                ...modal,
                visible: true,
                variant: "confirm",
                title: Constants.ATTENTION,
                text: Constants.MORE_CLIENT_REGISTER,
                onOk: () => {
                    reset();
                },
                onClose: () => {
                    navigate.push("TabStack", {screen: "Clients"});
                },
            });
        } catch (err) {
            console.error("Error", err);
            handleLoading(false);
            handleModal({
                ...modal,
                visible: true,
                variant: "alert",
                errors: Errors.DUPLICATE_EMAIL_ERROR,
            });
        }
    };

    const updateClients = async (data) => {
        handleLoading(true);
        try {
            await updateClient(data)
            handleLoading(false);
            navigate.push("TabStack", {screen: "Clients"});
        } catch (e) {
            handleLoading(false);
            console.error(e)
        }
    };


    return (
        <FormProvider {...methods}>
            <RegisterComponent
                onCancel={() => {
                    navigate.push("TabStack", {screen: "Clients"});
                }}
                color={Colors.BLUE}
                onConfirm={isEditing ? updateClients : saveClients}
                headerTitle={"Clientes"}
                itemType={"client"}
                isEditing={isEditing}
                registeredItemRightInformation={"tel"}
                clearItem={reset}
            >
                {errors !== "" && (
                    <ErrorMessage
                        text={errors}
                        width={"70%"}
                        textColor={Colors.BLUE}
                    />
                )}
                <Loading isLoading={isLoading} color={Colors.BLUE}/>
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
                                placeholder={"Nome do Cliente"}
                                value={value}
                                width={"80%"}
                                keyboard={"default"}
                                fontSize={50}
                                color={Colors.BLUE}
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
                                value={value}
                                placeholder={"E-mail do Cliente"}
                                width={"80%"}
                                keyboard={"email-address"}
                                fontSize={50}
                                mask="email"
                                color={Colors.BLUE}
                                label={"E-mail*"}
                                error={error}
                            />)}/>

                    <Controller
                        name="cpf"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <Input

                                handleChange={onChange}
                                name={name}
                                placeholder={"CPF"}
                                value={value}
                                width={"80%"}
                                keyboard={"numeric"}
                                fontSize={50}
                                mask={"cpf"}
                                color={Colors.BLUE}
                                label={"CPF"}
                                error={error}
                            />)}/>

                    <Controller
                        name="birthDate"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <DatePicker color={Colors.BLUE}
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        width={"80%"}
                                        fontSize={50}
                                        placeholder={"Data de Nascimento"}
                                        label={"Data de Nascimento*"}
                                        mode="date"
                            />
                        )}/>

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
                                placeholder={"Celular"}
                                value={value}
                                width={"80%"}
                                keyboard={"numeric"}
                                fontSize={50}
                                mask={"phone"}
                                color={Colors.BLUE}
                                label={"Celular*"}
                                error={error}
                            />)}/>

                    <Controller
                        name="tel2"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <Input
                                handleChange={onChange}
                                name={"tel2"}
                                placeholder={"Telefone"}
                                value={value}
                                width={"80%"}
                                keyboard={"numeric"}
                                fontSize={50}
                                mask={"phone"}
                                color={Colors.BLUE}
                                label={"Telefone Residencial"}
                                error={error}
                            />)}/>
                </S.BodyContent>


            </RegisterComponent>
        </FormProvider>
    );
};

export default ClientRegister;
