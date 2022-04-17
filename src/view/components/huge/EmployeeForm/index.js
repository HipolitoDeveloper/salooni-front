import { useIsFocused, useNavigation } from "@react-navigation/native";
import { xorBy } from "lodash";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { useLayout } from "../../../../hooks/Layout";
import Input from "../../small/Input";
import Loading from "../../small/Loading";
import MultipleSelect from "../../small/MultipleSelect";
import RegisterComponent from "../RegisterComponent";
import * as S from "./styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeValidationSchema } from "../../../../common/validators/Schemas";
import Errors from "../../../../common/Errors";
import Constants from "../../../../common/Constants";

const defaultValues = {
  userName: "Gabriel",
  email: "parceiro@gmail.com",
  tel: "11 99725749",
  cnpj: "63520024000191",
  employeeType: "PRC",
  procedures: [],
  indexInView: 0,
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
  contextGetValues,
}) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(employeeValidationSchema),
  });
  const { control, reset } = methods;

  const { handleModal, modal, handleLoading } = useLayout();

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigation();
  const isFocused = useIsFocused();

  navigate.addListener("focus", async () => {
    if (!isSigningUp) {
      const employeeInView = route.params?.employee;

      if (Object.keys(employeeInView).length !== 0) {
        // setemployee({
        //   ...employeeInView,
        //   procedureListWithoutChanges: employeeInView.procedures,
        // });
        handleLoading(true);
      }
    }
  });

  const handleMultiSelect = (options, value, callback) => {
    let selectedItem = xorBy(options, [value], "name");
    callback(selectedItem);
  };

  const onSave = async (data) => {
    handleLoading(true);

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

  const onUpdate = () => {
    handleLoading(true);
    // updateEmployee(employee).then(
    //   () => {
    //     handleLoading(false);
    //     clearemployee();
    //     handleErrorMessage([""]);
    //     navigate.push("TabStack", { screen: "Employees" });
    //   },
    //   error => {
    //     handleLoading(false);
    //
    //   },
    // );
  };

  const clearProcedures = () => {
    contextSetValue("procedures", []);
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
            name="userName"
            control={control}
            render={({
              field: { onChange, value, name },
              fieldState: { error },
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
              field: { onChange, value, name },
              fieldState: { error },
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
              field: { onChange, value, name },
              fieldState: { error },
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
              field: { onChange, value, name },
              fieldState: { error },
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
              />
            )}
          />

          <View
            style={{
              width: "80%",
              marginTop: 40,
            }}
          >
            {isFocused ? (
              <Controller
                name="procedures"
                control={control}
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) => (
                  <MultipleSelect
                    iconColor={color}
                    plusIconColor={color}
                    modalHeaderText={"Escolha os procedimentos"}
                    options={ procedures }
                    selectTextColor={"black"}
                    selectedItemBorderColor={color}
                    value={value}
                    handleMultiSelect={(item) =>
                      handleMultiSelect(value, item, onChange)
                    }
                    navigate={navigate}
                    inputText={"Procedimentos"}
                    clearValue={clearProcedures}
                    error={error}
                  />
                )}
              />
            ) : (
              <S.noProceduresText>
                Você ainda não adicionou procedimentos.
              </S.noProceduresText>
            )}
          </View>
        </S.BodyContent>
      </RegisterComponent>
    </FormProvider>
  );
};

export default EmployeeForm;
