import React, {useState} from "react";
import * as S from "./styled";
import SalooniLogo from '../../../../assets/svg/salooniSVG.svg';
import {Dimensions} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {ForgotPassword} from "../../../components/huge/ForgotPasswordComponent";
import SubmitButton from "../../../components/small/SubmitButton";
import Colors from "../../../../common/style/Colors";
import Input from "../../../components/small/Input";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {signinValidationSchema} from "../../../../common/validators/Schemas";
import {useLayout} from "../../../../hooks/Layout";
import {useUser} from "../../../../hooks";

const defaultValues = {
    email: "gabriel@gmail.com",
    password: "123Abc@"
};

const SignInOwner = () => {
    const {control, reset, handleSubmit} = useForm({
        defaultValues,
        resolver: yupResolver(signinValidationSchema)
    });
    const {handleModal, modal, handleLoading, clearModal} = useLayout();
    const {onLogin} = useUser()

    const screenHeight = Dimensions.get("screen").height;
    // const screenWidth = Dimensions.get("screen").width;
    // const isSmallerScreen = screenHeight < 650;

    const [isShowingForgot, setIsShowingForgot] = useState(false);

    const navigate = useNavigation();


    const login = async (data) => {
        handleLoading(true);
        try {
            await onLogin(data)
            handleLoading(false);
        } catch (error) {
            console.log("error", error)
            handleModal({...modal, visible: true, variant: "alert", errors: error});
            handleLoading(false);
        }
    };

    const handleForgotModal = () => {
        setIsShowingForgot(!isShowingForgot);
    };

    return (
        <S.Container>
            <S.Content>
                <SalooniLogo fill={Colors.PURPLE}
                             borderFill={Colors.PURPLE}
                             width={140}
                             height={140}/>

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
                            width={"70%"}
                            keyboard={"email-address"}
                            fontSize={40}
                            mask="email"
                            color={Colors.PURPLE}
                            label={"Usuário"}
                            error={error}
                        />)}/>
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
                            placeholder={"Senha"}
                            value={value}
                            width={"70%"}
                            keyboard={"default"}
                            isSecureTextEntry
                            fontSize={40}
                            mask="password"
                            color={Colors.PURPLE}
                            label={"Senha"}
                            error={error}
                        />)}/>

                <S.PasswordResetButton onPress={handleForgotModal}>
                    <S.PasswordResetText screenHeight={screenHeight}>
                        Esqueceu a senha?
                    </S.PasswordResetText>
                </S.PasswordResetButton>

                <SubmitButton
                    text={"Entrar"}
                    onPress={handleSubmit(login)}
                    width={1.6}
                    height={15}
                    fontSize={40}
                    buttonColor={Colors.PURPLE}
                />

                <S.RegisterContent>
                    <S.RegisterText screenHeight={screenHeight}>
                        Não possui cadastro?
                    </S.RegisterText>
                    <S.RegisterButton onPress={() => navigate.navigate("SignupStack")}>
                        <S.RegisterButtonText>{""} Registre-se</S.RegisterButtonText>
                    </S.RegisterButton>
                </S.RegisterContent>
            </S.Content>

            {isShowingForgot && (
                <ForgotPassword emailFromLogin={userData.email} isVisible={isShowingForgot}
                                handleModal={handleForgotModal}/>

            )}
        </S.Container>
    );
};

export default SignInOwner;
