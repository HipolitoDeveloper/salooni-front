import React, { useContext, useEffect, useState } from "react";
import * as S from "./styled";
import Input from "../../../../components/small/Input";
import global from "../../../../../common/global";
import ErrorMessage from "../../../../components/small/ErrorMessage";
import { useNavigation } from "@react-navigation/native";
import { ClientContext } from "../../../../../contexts/Client/ClientContext";
import errorMessages from "../../../../../common/errorMessages";
import AlertModal from "../../../../components/small/AlertModal";
import { UserContext } from "../../../../../contexts/User/UserContext";
import RegisterComponent from "../../../../components/huge/RegisterComponent";
import Loading from "../../../../components/small/Loading";
import {
  CPFVerifier,
  TELVerifier,
} from "../../../../components/small/Input/verifier";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { InputPlaceholder, InputTitle } from "../../../../components/small/Input/styled";
import { Dimensions } from "react-native";

const ClientRegister = ({ route }) => {
  const {
    addClient,
    editClient,
    registeredClients,
    saveClient,
    cleanRegisteredClients,
    updateClientInView,
    updateClient,
    deleteClient,
    deleteClientInView,
    handleClientRegisterError,
  } = useContext(ClientContext);

  const { currentUser } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: "",
  });
  const [client, setClient] = useState({
    bornDate: new Date(),
    errorProperties: [],
  });

  const [showDate, setShowDate] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);

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
    registeredClients.forEach(client => (client.isInView = false));
  }, []);

  const cleanClient = () => {
    setClient({
      bornDate: new Date(),
      errorProperties: [],
    });
  };

  const handleChange = (text, name) => {
    client.errorProperties?.forEach((property, index) => {
      if (property === name) {
        client.errorProperties?.splice(index, 1);
      }
    });

    setClient({
      ...client,
      [name]: text,
    });
  };

  const handleModal = (isShowing, text) => {
    setShowAlertModal({ isShowing: isShowing, text: text });
  };

  const onChangeDate = (event, selectedDate) => {
    console.log("event.type", event.type)
    if (event.type === "neutralButtonPressed") {
      setIsDateSelected(false);
      setShowDate(false);
    } else {

      selectedDate = selectedDate || client.bornDate;
      handleChange(selectedDate, "bornDate");
      setIsDateSelected(true);
      setShowDate(false);
    }
  };

  const chooseAddClientMethod = async () => {
    const { isInView, indexInView } = { ...client };

    if (verifyInformation(true) && isInView) {
      client.isInView = false;
      editClient({ client: client, index: indexInView });
      setErrorMessage("");
      cleanClient();
    }

    if (verifyInformation(true) && !isInView) {
      client.salonId = currentUser.idSalon;
      client.bornDate = isDateSelected ? client.bornDate : null;
      addClient(client);
      setErrorMessage("");
      cleanClient();
    }
  };

  const handleClient = (client, index) => {
    updateClientInView(index);
    client.isInView = !client.isInView;
    client.indexInView = index;

    setClient(client);

    if (!verifyIfIsPreRegisteredEditing()) {
      cleanClient();
    }
  };

  const verifyIfIsPreRegisteredEditing = () => {
    return registeredClients.some(client => client.isInView === true);
  };

  const saveClients = async () => {
    let isSaving = false;
    setIsLoading(true);
    if (verifyInformationToGo()) {
      for (const client of registeredClients) {
        await saveClient(client).then(
          () => {
            setErrorMessage("");
            isSaving = true;
          },
          error => {
            setIsLoading(false);
            // if (error === 137)
            //   handleClientRegisterError({ item: client, property: "cpf" });
            setErrorMessage(errorMessages.duplicateEmailPreRegisteredItems);
          },
        );
      }

      if (isSaving) {
        setTimeout(() => {
          setIsLoading(false);
          navigate.push("TabStack", { screen: "Clients" });
          cleanClient();
          cleanRegisteredClients();
        }, 3000);
      }
    }
  };

  const updateClients = async () => {
    setIsLoading(true);
    await updateClient(client).then(
      () => {
        setTimeout(() => {
          setIsLoading(false);
          navigate.push("TabStack", { screen: "Clients" });
          cleanClient();
        }, 500);
        setErrorMessage("");
      },
      error => {
        setIsLoading(false);
        // if (error.code === 137)
        //   handleClientRegisterError({ item: client, property: "email" });
        setErrorMessage(errorMessages.duplicateEmailPreRegisteredItems);
      },
    );
  };

  const deletePreRegisteredItem = client => {
    deleteClientInView(client);
    cleanClient();
  };

  const cancelEditing = () => {
    updateClientInView(-1);
    cleanClient();
  };

  const deleteClients = () => {
    setIsLoading(true);
    deleteClient(client).then(
      () => {
        setIsLoading(false);
        navigate.navigate("Clients");
        setErrorMessage("");
        cleanClient();
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;
    // if (Object.keys(client).length < 4) {
    // addClient(client);
    // return ableToGo;
    // ableToGo = false;
    // setErrorMessage(errorMessages.noClientMessage);
    // setIsLoading(false);
    // } else
    if (registeredClients.length === 0) {
      ableToGo = false;
      setErrorMessage(errorMessages.noClientMessage);
      setIsLoading(false);
    }
    return ableToGo;
  };

  const verifyInformation = showErrorMessages => {
    let ableToGo = true;
    let errorMessage = "";

    if (
      client === {} ||
      client.name === undefined ||
      client.name === "" ||
      client.tel === undefined ||
      client.tel === ""

    ) {
      ableToGo = false;
      errorMessage = errorMessages.clientMessage;
      if (showErrorMessages) setIsLoading(false);
    } else {
      if (!TELVerifier(client.tel).state) {
        ableToGo = false;
        errorMessage = errorMessages.invalidTel;
        if (showErrorMessages) setIsLoading(false);
      }
    }

    if (
      client.tel2 !== "" &&
      client.tel2 !== undefined &&
      !TELVerifier(client.tel2).state
    ) {
      ableToGo = false;
      errorMessage = errorMessages.invalidTel;
      if (showErrorMessages) setIsLoading(false);
    }

    if (
      client.cpf !== "" &&
      client.cpf !== undefined &&
      !CPFVerifier(client.cpf).state
    ) {
      ableToGo = false;
      errorMessage = errorMessages.invalidCPF;
      if (showErrorMessages) setIsLoading(false);
    }

    if (
      registeredClients.some(
        registeredClient =>
          registeredClient.email === client.email && registeredClient?.email,
      )
    ) {
      ableToGo = false;
      errorMessage = errorMessages.duplicateClientInformation;
      setErrorMessage(errorMessages.duplicateClientInformation);
      if (showErrorMessages) setIsLoading(false);
    }

    if (showErrorMessages) setErrorMessage(errorMessage);
    if (errorMessage === "") setErrorMessage("");
    return ableToGo;
  };

  return (
    <RegisterComponent
      onCancel={() => {
        navigate.goBack();
        cleanRegisteredClients();
      }}
      color={`${global.colors.blueColor}`}
      preRegisteredItems={registeredClients}
      handleSelect={handleClient}
      deletePreRegisteredItem={deletePreRegisteredItem}
      onConfirm={isEditing ? updateClients : saveClients}
      isPreRegisteredEditing={verifyIfIsPreRegisteredEditing()}
      cancelEditing={cancelEditing}
      isEditing={isEditing}
      onAdd={chooseAddClientMethod}
      registeredItemRightInformation={"tel"}
      headerTitle={"Clientes"}
      validForm={() => verifyInformation(false)}>
      {errorMessage !== "" && (
        <ErrorMessage
          text={errorMessage}
          width={"70%"}
          textColor={global.colors.blueColor}
        />
      )}
      <Loading isLoading={isLoading} color={global.colors.blueColor} />
      <S.BodyContent>
        <Input
          invalidValue={client?.errorProperties?.some(
            property => property === "name",
          )}
          handleChange={handleChange}
          name={"name"}
          placeholder={"Nome do Cliente"}
          value={client.name}
          width={"80%"}
          keyboard={"default"}
          isSecureTextEntry={false}
          fontSize={50}
          disabled={false}
          color={global.colors.blueColor}
          label={"Nome*"}
          isToValidate={true}
          noEmpty={true}
        />

        <Input
          invalidValue={client?.errorProperties?.some(
            property => property === "email",
          )}
          handleChange={handleChange}
          name={"email"}
          placeholder={"E-mail do Cliente"}
          value={client.email}
          width={"80%"}
          keyboard={"email-address"}
          isSecureTextEntry={false}
          fontSize={50}
          disabled={false}
          mask="email"
          color={global.colors.blueColor}
          label={"E-mail"}
          isToValidate={true}
          noEmpty={false}
        />

        <Input
          invalidValue={client?.errorProperties?.some(
            property => property === "cpf",
          )}
          handleChange={handleChange}
          name={"cpf"}
          placeholder={"CPF"}
          value={client.cpf}
          width={"80%"}
          keyboard={"numeric"}
          isSecureTextEntry={false}
          fontSize={50}
          disabled={false}
          mask={"cpf"}
          color={global.colors.blueColor}
          label={"CPF"}
          isToValidate={true}
          noEmpty={false}
        />

        <S.DateTextContent
          borderBottomColor={global.colors.blueColor}
          onPress={() => setShowDate(true)}>
          <InputTitle
            color={global.colors.blueColor}
            screenHeight={screenHeight}>
            Data de Nascimento
          </InputTitle>
          {isDateSelected
            ? (
              <S.DateText>
                {moment(client.bornDate).format("DD/MM/YYYY")}
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
            value={client.bornDate}
            mode={"date"}
            is24Hour={true}
            display="default"
            minimumDate={new Date(1950, 0, 1)}
            maximumDate={new Date()}
            onChange={onChangeDate}
            locale="pt-BR"
          />
        )}

        <Input
          invalidValue={client?.errorProperties?.some(
            property => property === "tel",
          )}
          handleChange={handleChange}
          name={"tel"}
          placeholder={"Celular"}
          value={client.tel}
          width={"80%"}
          keyboard={"numeric"}
          isSecureTextEntry={false}
          fontSize={50}
          disabled={false}
          mask={"phone"}
          color={global.colors.blueColor}
          label={"Celular*"}
          isToValidate={true}
          noEmpty={true}
        />

        <Input
          invalidValue={client?.errorProperties?.some(
            property => property === "tel2",
          )}
          handleChange={handleChange}
          name={"tel2"}
          placeholder={"Telefone"}
          value={client.tel2}
          width={"80%"}
          keyboard={"numeric"}
          isSecureTextEntry={false}
          fontSize={50}
          disabled={false}
          mask={"phone"}
          color={global.colors.blueColor}
          label={"Telefone Residencial"}
          isToValidate={true}
          noEmpty={false}
        />
      </S.BodyContent>

      <AlertModal
        text={showAlertModal.text}
        isVisible={showAlertModal.isShowing}
        onClose={() => {
          handleModal(false, "");
        }}
        onOk={() => {
          deleteClients();
        }}
        title={"Atenção."}
      />
    </RegisterComponent>
  );
};

export default ClientRegister;
