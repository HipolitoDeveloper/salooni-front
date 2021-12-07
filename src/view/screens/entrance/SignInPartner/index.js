import React, { useContext, useEffect, useState } from "react";
import SubmitButton from "../../../components/small/SubmitButton";
import * as S from "./styled";
import SalooniLogo from "../../../../assets/icone11-nobackground.png";
import { UserContext } from "../../../../contexts/User/UserContext";
import errorMessages from "../../../../common/errorMessages";

import { useNavigation } from "@react-navigation/native";
import AlertModal from "../../../components/small/AlertModal";
import { ActivityIndicator, StyleSheet } from "react-native";
import global from "../../../../common/global";
import { MaskedTextInput } from "react-native-mask-text";
import ErrorMessage from "../../../components/small/ErrorMessage";
import Input from "../../../components/small/Input";
import Loading from "../../../components/small/Loading";
import {
  CNPJVerifier,
  EMAILVerifier,
  TELVerifier,
} from "../../../components/small/Input/verifier";
import Icon from "react-native-vector-icons/FontAwesome5";

const SignInPartner = () => {
  const { doLogin, verifyPartner, doSignup, owner } = useContext(UserContext);
  const navigate = useNavigation();

  const [verifiedPartner, setVerifiedPartner] = useState({});
  const [userData, setUserData] = useState({});
  const [isPartnerFirstAccess, setIsPartnerFirstAccess] = useState(false);
  const [isPartner, setIsPartner] = useState(false);
  const [isAbleToSignup, setIsAbleToSignup] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    headerText: "",
    isVisible: false,
    text: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value, name) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const doPartnerLogin = () => {
    setIsLoading(true);
    doLogin(userData).then(
      () => {
        navigate.navigate("TabStack");
        setIsLoading(false);
      },

      error => {
        setShowAlertModal({
          headerText: "Oops!",
          isVisible: true,
          text: "Não foi possível entrar no Salooni. Parece que seu e-mail ou senha não coincidem!",
        });
        setIsLoading(false);
      },
    );
  };

  const doPartnerSignup = () => {
    setIsLoading(true);
    if (verifyInformation(true)) {
      doSignup(verifiedPartner, userData).then(
        () => {
          setShowAlertModal({
            headerText: "Parabéns!",
            isVisible: true,
            text: "Seu cadastro foi realizado com sucesso, realize o seu primeiro acesso",
          });
          setIsPartnerFirstAccess(false);
          setVerifiedPartner({});
          setIsAbleToSignup(false);
          setUserData({});
          navigate.navigate("TabStack");
          setIsLoading(false);
        },

        error => {
          setIsLoading(false);
          console.log(error);
        },
      );
    }
  };

  const verifyEmail = () => {
    setIsLoading(true);
    verifyPartner(userData, "").then(
      ({ isPartner, isFirstAccess, verifiedPartner }) => {
        setIsPartner(isPartner);
        setIsPartnerFirstAccess(isFirstAccess);
        setVerifiedPartner(verifiedPartner);
        setIsLoading(false);

        console.log("verifiedPartner", verifiedPartner)

        if (!isFirstAccess) {
          setShowAlertModal({
            headerText: "Boas notícias!",
            isVisible: true,
            text: "Seu cadastro foi encontrado. Por favor, realize a sua entrada na aplicação.",
          });
        }
      },
      error => {
        setIsPartner(false);
        setShowAlertModal({
          headerText: "Desculpe...",
          isVisible: true,
          text: "Não encontramos seu cadastro em nosso sistema de parceiros.",
        });
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const verifyCNPJ = () => {
    setIsLoading(true);
    verifyPartner(userData, verifiedPartner).then(
      ({ isAbleToSignup }) => {
        setIsAbleToSignup(isAbleToSignup);
        setIsLoading(false);

        if (isAbleToSignup) {
          setShowAlertModal({
            headerText: "Boas notícias!",
            isVisible: true,
            text: "Seu cadastro foi encontrado. Por favor, realize o seu registro na aplicação.",
          });
        }
      },
      error => {
        setIsPartner(false);
        setShowAlertModal({
          headerText: "Desculpe...",
          isVisible: true,
          text: "Não encontramos esse cadastro vinculado ao CNPJ informado em nosso sistema de parceiros.",
        });
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const resetVerifier = () => {
    setIsPartner(false);
    setIsPartnerFirstAccess(false);
  };

  const verifyInformation = showErrorMessages => {
    let ableToGo = true;
    let errorMessage = "";

    if (
      userData === {} ||
      userData.email === undefined ||
      userData.email === "" ||
      userData.password === undefined ||
      userData.password === "" ||
      userData.confirmPassword === undefined ||
      userData.confirmPassword === ""
    ) {
      ableToGo = false;
      errorMessage = errorMessages.partnerSignupMessage;
      if (showErrorMessages) setIsLoading(false);
    } else {
      if (!EMAILVerifier(userData.email).state) {
        ableToGo = false;
        errorMessage = errorMessages.invalidEmail;
        if (showErrorMessages) setIsLoading(false);
      }

      if (userData.password !== userData.confirmPassword) {
        ableToGo = false;
        setErrorMessage(errorMessages.passwordsNotMatch);
        if (showErrorMessages) setIsLoading(false);
      }
    }

    if (showErrorMessages) setErrorMessage(errorMessage);
    return ableToGo;
  };


  return (
    <S.Container>
      <S.Content>
        <S.SalooniLogo source={SalooniLogo} />
        {isPartnerFirstAccess && !isAbleToSignup && (
          <S.EmailMessage>
            Parece que esse é o seu primeiro acesso. Coloque o CNPJ do seu salão
            para verificarmos seu cadastro.
          </S.EmailMessage>
        )}

        {errorMessage !== "" && (
          <ErrorMessage
            text={errorMessage}
            width={"70%"}
            textColor={`${global.colors.purpleColor}`}
          />
        )}

        {!isPartnerFirstAccess && (
          <Input
            invalidValue={userData?.errorProperties?.some(
              property => property === "email",
            )}
            handleChange={handleChange}
            placeholderTextColor={"grey"}
            placeholder={"E-mail"}
            name={"email"}
            value={userData.email}
            keyboard={"email-address"}
            width={"70%"}
            mask={"email"}
            color={global.colors.purpleColor}
            label={"E-mail"}
            isToValidate={true}
            noEmpty={true}
            onFocus={resetVerifier}
            fontSize={44}
          />
        )}


        {isPartner && !isPartnerFirstAccess && (
          <Input
            invalidValue={userData?.errorProperties?.some(
              property => property === "password",
            )}
            handleChange={handleChange}
            name={"password"}
            placeholder={"Senha"}
            value={userData.password}
            editable={isPartner}
            selectTextOnFocus={isPartner}
            isSecureTextEntry={true}
            width={"70%"}
            mask={"password"}
            color={global.colors.purpleColor}
            label={"Senha"}
            isToValidate={isPartner}
            noEmpty={true}
            fontSize={44}
          />
        )}


        <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />

        {isPartnerFirstAccess && (
          isAbleToSignup ? (
            <>
              <Input
                invalidValue={userData?.errorProperties?.some(
                  property => property === "password",
                )}
                handleChange={handleChange}
                name={"password"}
                placeholder={"Senha"}
                value={userData.password}
                isSecureTextEntry={true}
                keyboard={"default"}
                width={"70%"}
                mask={"password"}
                color={global.colors.purpleColor}
                label={"Senha"}
                isToValidate={isPartnerFirstAccess}
                noEmpty={true}
                fontSize={44}
              />

              <Input
                invalidValue={userData?.errorProperties?.some(
                  property => property === "confirmPassword",
                )}
                handleChange={handleChange}
                name={"confirmPassword"}
                placeholder={"Confirme sua senha"}
                value={userData.confirmPassword}
                isSecureTextEntry={true}
                keyboard={"default"}
                width={"70%"}
                mask={"confirmPassword"}
                originalPassword={userData.password}
                color={global.colors.purpleColor}
                label={"Confirmação da Senha"}
                isToValidate={isPartnerFirstAccess}
                noEmpty={true}
                fontSize={44}
              />
            </>
          ) : (
            <Input
              invalidValue={userData?.errorProperties?.some(
                property => property === "cnpj",
              )}
              handleChange={handleChange}
              name={"cnpj"}
              placeholder={"CNPJ "}
              value={userData.cnpj}
              isSecureTextEntry={false}
              mask={"cnpj"}
              keyboard={"numeric"}
              width={"70%"}
              color={global.colors.purpleColor}
              label={"CNPJ do Salão"}
              isToValidate={isPartnerFirstAccess}
              noEmpty={true}
              fontSize={44}
            />
          )
        )}

        <S.FooterButtons>
        {isPartnerFirstAccess ? (
          <SubmitButton
            text={isAbleToSignup ? "Cadastrar" : "Verificar"}
            onPress={() => (isAbleToSignup ? doPartnerSignup() : verifyCNPJ())}
            width={1.6}
            height={15}
            fontSize={40}
            buttonColor={`${global.colors.purpleColor}`}
          />

        ) : (
          <SubmitButton
            text={isPartner ? "Entrar" : "Verificar"}
            onPress={() => (isPartner ? doPartnerLogin() : verifyEmail())}
            width={1.6}
            height={15}
            fontSize={40}
            buttonColor={global.colors.purpleColor}
          />
        )}

        {isPartner && (
          <S.CloseButton color={global.colors.purpleColor} onPress={resetVerifier}>
            <Icon
              name={"times"}
              size={15}
              color={"black"}
            />
          </S.CloseButton>
        )}
        </S.FooterButtons>


        <AlertModal
          title={showAlertModal.headerText}
          text={showAlertModal.text}
          isVisible={showAlertModal.isVisible}
          onClose={() =>
            setShowAlertModal({ isVisible: false, text: "", headerText: "" })
          }
        />
      </S.Content>
    </S.Container>
  );
};

export default SignInPartner;

export const styles = StyleSheet.create({
  input: {
    fontFamily: `${global.fonts.mainFont}`,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: `${global.colors.purpleColor}`,
    color: "black",
  },
});
