import React, {useCallback, useState} from "react";
import {Dimensions, StyleSheet, Text} from "react-native";
import * as S from "./styled";
import Icon from "react-native-vector-icons/FontAwesome5";
import Warning from "../Warning";
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";
import MaskInput, {Masks} from 'react-native-mask-input';
import {useLayout} from "../../../../hooks/Layout";

const Input = ({
                   error,
                   width,
                   name,
                   isSecureTextEntry,
                   fontSize,
                   mask,
                   leftPlaceholder,
                   rightPlaceholder,
                   color,
                   label,
                   onFocus,
                   handleChange,
                   value,
                   ...inputProps
               }) => {

    const {handleModal, modal} = useLayout()

    const [isInputValid, setIsInputValid] = useState({
        state: true,
        message: "",
    });

    const [isShowingPassword, setIsShowingPassword] = useState(true);
    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;
    const isSmallerScreen = screenHeight < 650;

    const setMask = useCallback(() => {
        switch (mask) {
            case "cpf":
                return Masks.BRL_CPF
            case "phone":
                return Masks.BRL_PHONE
            case "cnpj":
                return Masks.BRL_CNPJ
            case "hour":
                return null;
            case "date":
                return Masks.DATE_DDMMYYYY
            case "brl":
                return Masks.BRL_CURRENCY
            case "percentage":
                return null;
            case "email":
                return null;
            case "password":
                return null;
            default:
                return null;
        }
    }, [mask]);

    const showPassword = () => {
        setIsShowingPassword(!isShowingPassword);
    };

    const showErrors = () => {
        handleModal({...modal, visible: true, variant: "alert", errors: [{message: error.message}]});
    }
    return (
        <S.InputContainer style={[styles.container, {width: width}]}>
            {/*{leftPlaceholder && value?.length > 0 && (*/}
            {/*    <Text style={[styles.leftPlaceholder]}>{leftPlaceholder}</Text>*/}
            {/*)}*/}


            <S.InputContent>
                <S.InputTitle screenHeight={screenHeight} color={color}>
                    {label}
                </S.InputTitle>
                <MaskInput
                    style={[
                        {
                            fontSize: screenHeight / fontSize,
                            borderBottomColor: isInputValid.state ? color : "red",
                            fontFamily: Fonts.MAIN,
                            color: 'black',
                            opacity: 1,
                            width: "100%",
                            borderBottomWidth: 1,
                            paddingRight: 30,
                            paddingBottom: 0
                            // borderBottomColor: borderBottomColoor
                        },
                    ]}
                    onChangeText={(masked, unmasked) => {
                        handleChange(unmasked);
                    }}
                    placeholderTextColor={"grey"}
                    secureTextEntry={isSecureTextEntry && isShowingPassword}
                    clearButtonMode={"always"}
                    value={value}
                    mask={setMask()}
                    {...inputProps}
                />

                {(mask === "password" || mask === "confirmPassword") && (
                    <S.ShowPasswordButton onPress={showPassword}>
                        <Icon
                            name={"eye"}
                            size={24}
                            color={Colors.PURPLE}
                            style={{marginRight: !!error ? 30 : 10}}
                        />
                    </S.ShowPasswordButton>
                )}
                {!!error && (
                    <Warning
                        onPress={showErrors}
                        color={color}
                    />
                )}
            </S.InputContent>
            {!isInputValid.state && (
                <S.MessageBox>
                    {Array.isArray(isInputValid.message) ? (
                        isInputValid.message.map(message => (
                            <Text key={message} style={styles.inputErrorMessage}>
                                {message}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.inputErrorMessage}>{isInputValid.message}</Text>
                    )}
                </S.MessageBox>
            )}


            {rightPlaceholder && value?.length > 0 && (
                <Text style={[styles.rightPlaceholder]}>{rightPlaceholder}</Text>
            )}
        </S.InputContainer>
    );
};

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    input: {
        fontFamily: `${Fonts.MAIN}`,
        color: "black",
    },
    leftPlaceholder: {
        color: "grey",
        fontSize: 20,
        position: "absolute",
        top: 10,
        left: 0,
    },
    rightPlaceholder: {
        color: "grey",
        fontSize: 20,
        position: "absolute",
        top: 10,
        right: 0,
    },
    inputErrorMessage: {
        fontFamily: `${Fonts.MAIN}`,
        fontSize: 12,
        color: `red`,
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 5,
    },
});

export default Input;

Input.defaultProps = {
    handleChange: () => {
    },
    placeholder: "",
    value: "",
    width: "80%",
    name: "",
    keyboard: "numeric",
    isSecureTextEntry: false,
    disabled: false,
    fontSize: "18px",
    type: "custom",
    borderBottomColor: `${Colors.PURPLE}`,
};
