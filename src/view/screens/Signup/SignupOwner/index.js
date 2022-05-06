import React from "react";
import * as S from "./styled";
import Input from "../../../components/small/Input";
import Colors from "../../../../common/style/Colors";
import { Controller, useFormContext } from "react-hook-form";

const SignupOwners = () => {
  const { control } = useFormContext();

  return (
    <S.Container>
      <S.Content>
        <S.BodyContent>
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
                placeholder={"Salão"}
                width={"80%"}
                fontSize={40}
                color={Colors.PURPLE}
                label={"Nome do Salão*"}
                isToValidate
                noEmpty
                error={error}
                value={value}
              />
            )} />

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
                placeholder={"CNPJ"}
                width={"80%"}
                keyboardType={"numeric"}
                fontSize={40}
                mask={"cnpj"}
                color={Colors.PURPLE}
                label={"CNPJ*"}
                isToValidate
                noEmpty
                error={error}
                value={value}
              />
            )} />

          <Controller
            name="name"
            control={control}
            render={({
                       field: { onChange, value, name },
                       fieldState: { error },
                     }) => (
              <Input
                handleChange={onChange}
                name={name}
                placeholder={"Nome do Proprietário"}
                width={"80%"}
                fontSize={40}
                color={Colors.PURPLE}
                label={"Nome do Proprietário*"}
                isToValidate
                noEmpty
                error={error}
                value={value}

              />)} />

          <Controller
            name="tel"
            control={control}
            render={({
                       field: { onChange, value, name },
                       fieldState: { error },
                     }) => (
              <Input
                handleChange={onChange}
                name={name}
                placeholder={"Telefone"}
                width={"80%"}
                keyboardType={"numeric"}
                fontSize={40}
                mask={"phone"}
                color={Colors.PURPLE}
                label={"Telefone*"}
                isToValidate
                noEmpty
                error={error}
                value={value}
              />
            )} />

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
                placeholder={"E-mail"}
                width={"80%"}
                keyboardType={"email-address"}
                isSecureTextEntry={false}
                fontSize={40}
                disabled={false}
                mask="email"
                color={Colors.PURPLE}
                label={"E-mail*"}
                isToValidate
                noEmpty
                error={error}
                value={value}
              />)} />

          <Controller
            name="password"
            control={control}
            render={({
                       field: { onChange, value, name },
                       fieldState: { error },
                     }) => (
              <Input
                handleChange={onChange}
                name={name}
                placeholder={"Senha"}
                width={"80%"}
                isSecureTextEntry
                fontSize={40}
                mask="password"
                color={Colors.PURPLE}
                label={"Senha*"}
                isToValidate
                noEmpty
                error={error}
                value={value}
              />
            )} />

        </S.BodyContent>
        <S.FooterContent>
          {/*{errorMessage !== "" && (*/}
          {/*  <ErrorMessage*/}
          {/*    text={errorMessage}*/}
          {/*    width={"70%"}*/}
          {/*    textColor={Colors.PURPLE}*/}
          {/*  />*/}
          {/*)}*/}
        </S.FooterContent>
      </S.Content>
    </S.Container>
  );
};

export default SignupOwners;
