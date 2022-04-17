import React, { useContext, useState } from "react";
import RegisterHeader from "./RegisterHeader";
import RegisteredItemsModal from "./RegisteredItemsModal";
import * as S from "./styled";
import FloatButton from "../../small/FloatButton";
import { Dimensions, Platform } from "react-native";
import Times from "../../../../assets/svg/timesSVG.svg";
import { UserContext } from "../../../../hooks";
import Colors from "../../../../common/style/Colors";
import { useFormContext } from "react-hook-form";

const RegisterComponent = ({
                             isSigningUp,
                             children,
                             onCancel,
                             color,
                             onConfirm,
                             isEditing,
                             registeredItemRightInformation,
                             registeredItemLeftInformation,
                             headerTitle,
                             validForm,
                             isMultiInsert,
                             clearItem,
                             item,
                             handleErrorMessage,
                             itemType,
                             persistInForm,
                             handleException,
                           }) => {

  const { currentUser } = useContext(UserContext);
  const { setValue: setItem, formState: { errors }, handleSubmit } = useFormContext();

  const [isRegisteredItemsBoxOpened, setIsRegisteredItemsBoxOpened] =
    useState(false);
  const [registeredItems, setRegisteredItems] = useState([]);

  const screenHeight = Dimensions.get("screen").height;
  const screenWidth = Dimensions.get("screen").width;
  const isSmallerScreen = screenHeight < 650;

  const cancelRegister = () => {
    if (registeredItems.length > 0) {
      // setModalState(true);
    } else {
      onCancel();
    }
  };

  const verifyIfIsPreRegisteredEditing = () => {
    return registeredItems.some(employee => employee.isInView === true);
  };

  const cancelEditing = () => {
    changeItemInView(-1);
    clearItem();
  };

  const changeItemInView = (inViewIndex) => {
    setRegisteredItems(registeredItems.map((item, index) => {
      if (inViewIndex === -1) {
        item.isInView = false;
      } else if (item.isInView === true && index !== inViewIndex) {
        item.isInView = false;
      }

      return item;
    }));
  };

  const handleSelect = (item, index) => {
    changeItemInView(index);
    item.isInView = !item.isInView;
    item.indexInView = index;

    if (!verifyIfIsPreRegisteredEditing()) {
      clearItem();
    }
  };

  const editItem = (item, index) => {
    setRegisteredItems(registeredItems.map((registeredItem, i) => {
      if (index === i) {
        registeredItem = { ...item };
      }

      return registeredItem;
    }));
  };

  const addItem = (data) => {
    let newItems = [];

    switch (itemType) {
      case "employee":
        newItems = [...registeredItems, {
          ...data,
          employeeType: "PRC",
          salonId: isSigningUp ? "" : currentUser.idSalon,
        }];
        break;

      case "procedure":
        newItems = [...registeredItems, {
          ...data,
          employeeId: isSigningUp ? "" : currentUser?.idFunc,
          salonId: isSigningUp ? "" : currentUser?.idSalon,
          id: isSigningUp ? Math.random() : "",
        }];

        break;
      default:
        newItems = [...registeredItems, data];
        break;
    }

    setRegisteredItems(newItems);
    if (isSigningUp) persistInForm(newItems);
    clearItem();

  };

  const chooseAddEmployeeMethod = (data) => {
    // const { isInView, indexInView } = { ...item };
    if (isEditing) {
      // setItem("isInView", false);
      editItem(data);
      // handleErrorMessage([""]);
      clearItem();
    }

    if (!isEditing) {
      addItem(data);
      // handleErrorMessage([""]);
      setIsRegisteredItemsBoxOpened(true);
    }
  };

  const deletePreRegisteredItem = item => {
    const indexToDelete = registeredItems.indexOf(item);
    const newRegisteredItems = registeredItems.filter((_, index) => index !== indexToDelete);
    setRegisteredItems(newRegisteredItems);

    if (isSigningUp) persistInForm(newRegisteredItems);
    clearItem();
  };
  return ( 
    <>
      {!isSigningUp && (
        <RegisterHeader
          color={color}
          headerTitle={headerTitle}
          isPreRegisteredEditing={verifyIfIsPreRegisteredEditing()}
          onCancel={cancelRegister}
          onConfirm={handleSubmit(onConfirm)}
          isEditing={isEditing}
          validForm={validForm}
        />
      )}
      <S.Content
        behavior={Platform.OS === "ios" ? "height" : "padding"}
        keyboardShouldPersistTaps="handled">
        {children}

        {verifyIfIsPreRegisteredEditing() && (
          <S.CancelButton
            bottom={`${screenHeight / (isSmallerScreen ? 5 : 6)}px`}
            color={color}
            onPress={cancelEditing}>
            <Times
              fill={"#fff"}
              borderFill={Colors.LIGHT_GREY}
              width={10}
              height={10}
            />
          </S.CancelButton>
        )}

        {!isEditing && isMultiInsert && (
          <>
            <FloatButton
              bottom={`${screenHeight / (isSmallerScreen ? 5 : 7)}px`}
              right={"40px"}
              onPress={handleSubmit(chooseAddEmployeeMethod)}
              buttonColor={color}
              icon={verifyIfIsPreRegisteredEditing() ? "pen" : "plus"}
            />
            <S.AddMessage screenHeight={screenHeight}>
              Não esqueça de adicionar as informações.
            </S.AddMessage>
          </>
        )}
      </S.Content>
      {!isEditing && isMultiInsert && (
        <RegisteredItemsModal
          color={color}
          isOpened={isRegisteredItemsBoxOpened}
          handleOpening={() =>
            setIsRegisteredItemsBoxOpened(!isRegisteredItemsBoxOpened)
          }
          deletePreRegisteredItem={deletePreRegisteredItem}
          handleSelect={handleSelect}
          items={registeredItems}
          rightInformation={registeredItemRightInformation}
          leftInformation={registeredItemLeftInformation}
        />
      )}
      {/*<Modal*/}
      {/*  text={`Você possui ${registeredItems.length} itens pré-registrados, gostaria de cancelar esses pré-registros?`}*/}
      {/*  isVisible={modalState}*/}
      {/*  onOk={onCancel}*/}
      {/*  title={'Atenção!'}*/}
      {/*  onClose={() => setModalState(false)}*/}
      {/*  cancelTitle={'NÃO'}*/}
      {/*/>*/}
    </>
  );
};
export default RegisterComponent;
