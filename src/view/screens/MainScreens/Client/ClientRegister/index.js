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

const defaultValues = {
    name: "Gabriel",
    email: "parceiro@gmail.com",
    cpf: "47287935830",
    bornDate: "",
    tel: "11999725749",
    tel2: "",
};


const ClientRegister = ({route}) => {
    const methods = useForm({
        defaultValues,
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
    const [client, setClient] = useState({
        name: "",
        email: "",
        cpf: "",
        birthDate: new Date(),
        errorProperties: [],
    });

    const [showDate, setShowDate] = useState(false);


    const navigate = useNavigation();
    const screenHeight = Dimensions.get("screen").height;

    useEffect(() => {
        navigate.addListener("focus", () => {
            if (Object.keys(route.params?.client).length !== 0) {
                const clientInView = route.params?.client;

                setClient(clientInView);
                setIsEditing(true);
            }
        });
    }, [navigate]);

    useEffect(() => {
        // registeredClients.forEach(client => (client.isInView = false));
    }, []);

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
                    navigate.goBack();
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

    const updateClients = async () => {
        // setIsLoading(true);
        // await updateClient(client).then(
        //   () => {
        //     setTimeout(() => {
        //       setIsLoading(false);
        //       navigate.push("TabStack", { screen: "Clients" });
        //       clearClient();
        //     }, 500);
        //     handleErrorMessage([""]);
        //   },
        //   error => {
        //     setIsLoading(false);
        //
        //   },
        // );
    };


    return (
        <FormProvider {...methods}>
            <RegisterComponent
                onCancel={() => {
                    navigate.goBack();
                }}
                color={Colors.BLUE}
                onConfirm={isEditing ? updateClients : saveClients}
                headerTitle={"Clientes"}
                savedItems={clients}
                item={client}
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
                                label={"E-mail"}
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

                    <S.DateTextContent
                        borderBottomColor={Colors.BLUE}
                        onPress={() => setShowDate(true)}>
                        <InputTitle
                            color={Colors.BLUE}
                            screenHeight={screenHeight}>
                            Data de Nascimento
                        </InputTitle>
                        {getValues("birthDate")
                            ? (
                                <S.DateText>
                                    {moment(getValues("birthDate")).format("DD/MM/YYYY")}
                                </S.DateText>)
                            : (
                                <InputPlaceholder>
                                    Data de Nascimento
                                </InputPlaceholder>
                            )}

                    </S.DateTextContent>
                    {showDate && (

                        <RNDateTimePicker
                            neutralButtonLabel="LIMPAR"
                            value={getValues("birthDate")}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            minimumDate={new Date(1950, 0, 1)}
                            maximumDate={new Date()}
                            onChange={onChangeDate}
                            locale="pt-BR"
                        />
                    )}

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

                {/*<Modal*/}
                {/*  text={showAlertModal.text}*/}
                {/*  isVisible={showAlertModal.isShowing}*/}
                {/*  onClose={() => {*/}
                {/*    navigate.goBack();*/}
                {/*  }}*/}
                {/*  onOk={() => {*/}
                {/*    handleModal(false, "");*/}
                {/*  }}*/}
                {/*  title={"Atenção."} okTitle={"SIM"}*/}
                {/*  cancelTitle={"VER CLIENTES"}*/}
                {/*/>*/}
            </RegisterComponent>
        </FormProvider>
    );
};

export default ClientRegister;
