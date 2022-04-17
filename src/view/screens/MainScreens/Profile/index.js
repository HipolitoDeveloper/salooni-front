import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions } from "react-native";
import Times from "../../../../assets/svg/timesSVG.svg";
import Errors from "../../../../common/Errors";
import Colors from "../../../../common/style/Colors";
import { buildProfile } from "../../../../factory/UserFactory";
import { useUser } from "../../../../hooks";
import { useLayout } from "../../../../hooks/Layout";
import { verifyBeforeUpdateProfile } from "../../../../services/CloudService";
import Button from "../../../components/small/Button";
import Input from "../../../components/small/Input";
import * as S from "./styled";
import { yupResolver } from '@hookform/resolvers/yup';
import { profileUpdateValidationSchema } from "../../../../common/validators/Schemas";

const Profile = () => {
  const { currentUser, updateProfile } = useUser();
  const { handleModal, modal } = useLayout();

  const defaultValues = currentUser;
  const {
    setValue,
    formState: { isDirty, isValid },
    getValues,
    control,
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(profileUpdateValidationSchema),
  });

  const [isEditting, setIsEditting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigation();

  const screenHeight = Dimensions.get("screen").height;
  const screenWidth = Dimensions.get("screen").width;
  const isSmallerScreen = screenHeight < 650;

  const cancelEditting = () => {
    setIsEditting(false);
  };

  const updateInformation = async (data) => {
    setIsLoading(true);
    const newProfile = buildProfile(data);
    
    try {
      await verifyBeforeUpdateProfile(newProfile);
      await updateProfile(newProfile);
      cancelEditting();
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
      setIsLoading(false);
      handleModal({
        ...modal,
        visible: true,
        variant: "alert",
        errors: Errors.PROFILE_FORM_ERROR,
      });
    }
  };

  return (
    <S.Container>
      <S.BodyContent>
        {/* <Loading isLoading={isLoading} color={`${Colors.PURPLE}`} /> */}
        <S.ProcedureContent isSmallerScreen={isSmallerScreen}>
          <Button
            disabled={false}
            marginBottom={"20px"}
            onPress={() =>
              navigate.navigate("ApplicationStack", { screen: "Procedures" })
            }
            color={Colors.PURPLE}
            text={"Procedimentos"}
            width={"180px"}
            height={"50px"}
            fontSize={"17px"}
            textColor={Colors.BACKGROUND_COLOR}
            backgroundColor={Colors.PURPLE}
            leftContent={{
              show: true,
              height: "20px",
              width: "20px",
              icon: "brush",
              iconColor: "black",
              backgroundColor: `${Colors.BACKGROUND_COLOR}`,
              borderRadius: "20px",
              iconSize: 13,
            }}
          />
        </S.ProcedureContent>

        <Controller
          name="userName"
          control={control}
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              handleChange={onChange}
              name={name}
              placeholder={"Nome do Usuário*"}
              value={value}
              width={"80%"}
              keyboard={"default"}
              fontSize={40}
              color={Colors.PURPLE}
              label={"Nome do Usuário"}
              error={error}
            />
          )}
        />

        <Controller
          name="salonName"
          control={control}
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              handleChange={onChange}
              name={name}
              placeholder={"Salão*"}
              value={value}
              width={"80%"}
              keyboard={"default"}
              fontSize={40}
              color={Colors.PURPLE}
              label={"Nome do Usuário"}
              error={error}
            />
          )}
        />

        <Controller
          name="cnpj"
          control={control}
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              handleChange={onChange}
              name={name}
              placeholder={"CNPJ*"}
              value={value}
              width={"80%"}
              keyboard={"numeric"}
              fontSize={40}
              mask={"cnpj"}
              color={Colors.PURPLE}
              label={"CNPJ"}
              error={error}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Input
              handleChange={onChange}
              name={name}
              placeholder={"E-mail*"}
              value={value}
              width={"80%"}
              keyboard={"email-address"}
              fontSize={40}
              disabled
              mask={"email"}
              color={Colors.PURPLE}
              label={"E-mail"}
              error={error}
            />
          )}
        />

        {/*<Input*/}
        {/*  handleChange={handleChange}*/}
        {/*  name={'password'}*/}
        {/*  placeholder={'Senha*'}*/}
        {/*  value={profile.password}*/}
        {/*  width={'80%'}*/}
        {/*  keyboard={'default'}*/}
        {/*  isSecureTextEntry={true}*/}
        {/*  fontSize={40}*/}
        {/*  disabled={true}*/}
        {/*  editable={false}*/}
        {/*  mask={'password'}*/}
        {/*  color={Colors.PURPLE}*/}
        {/*  label={'Senha'}*/}
        {/*/> */}
      </S.BodyContent>
      <S.FooterContainer>
        {isDirty && (
          <S.FooterContent>
            <Button
              marginBottom={"20px"}
              onPress={handleSubmit(updateInformation)}
              color={Colors.BACKGROUND_COLOR}
              text={"Atualizar"}
              width={"150px"}
              height={"40px"}
              fontSize={"20px"}
              textColor={Colors.BACKGROUND_COLOR}
              backgroundColor={Colors.PURPLE}
              leftContent={{
                show: true,
                height: "20px",
                width: "20px",
                icon: "pen",
                iconColor: "black",
                backgroundColor: `${Colors.BACKGROUND_COLOR}`,
                borderRadius: "20px",
                iconSize: 13,
              }}
              disabled={isValid}
            />
            <S.CancelButton onPress={cancelEditting}>
              <Times
                fill={"black"}
                borderFill={"black"}
                width={15}
                height={15}
              />
            </S.CancelButton>
          </S.FooterContent>
        )}
      </S.FooterContainer>
  
    </S.Container>
  );
};

export default Profile;
