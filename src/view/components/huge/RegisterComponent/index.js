import React, {useContext, useState} from "react";
import RegisterHeader from "./RegisterHeader";
import RegisteredItemsModal from "./RegisteredItemsModal";
import * as S from "./styled";
import FloatButton from "../../small/FloatButton";
import {Dimensions, Platform, Text} from "react-native";
import Times from "../../../../assets/svg/timesSVG.svg";
import {UserContext} from "../../../../hooks";
import Colors from "../../../../common/style/Colors";
import {useFormContext} from "react-hook-form";

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
                               isMultiInsert,
                               clearItem,
                               itemType,
                               persistInForm,
                           }) => {

    const {currentUser} = useContext(UserContext);
    const {setValue, formState: {errors}, handleSubmit} = useFormContext();

    const [isRegisteredItemsBoxOpened, setIsRegisteredItemsBoxOpened] =
        useState(false);
    const [registeredItems, setRegisteredItems] = useState([]);

    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;
    const isSmallerScreen = screenHeight < 650;

    const registeredItemIsEditing = registeredItems.some(employee => employee.isInView === true)


    const cancelEditing = (reset) => {
        if(reset) {
            setRegisteredItems(registeredItems.map((registeredItem) => {
                registeredItem.isInView = false
                return registeredItem;
            }));
        }
        clearItem();
    };


    const handleSelect = (item) => {
        console.log("item", item)

        setRegisteredItems(registeredItems.map((registeredItem, index) => {
            if (registeredItem === item) {
                registeredItem.isInView = !item.isInView;

                if (item.isInView) {
                    const setType = {
                        "procedure": () => {
                            const {
                                name,
                                cost,
                                duration,
                                maintenanceDays,
                                hasMaintenance,
                                maintenanceValue,
                                hasCommission,
                                commissionPercentage,
                                commissionFixedValue
                            } = item
                            setValue("name", name)
                            setValue("cost", cost)
                            setValue("duration", duration)
                            setValue("hasMaintenance", hasMaintenance)
                            setValue("hasCommission", hasCommission)

                            setValue("maintenanceValue", maintenanceValue)
                            setValue("maintenanceDays", maintenanceDays)
                            setValue("commissionPercentage", commissionPercentage)
                            setValue("commissionFixedValue", commissionFixedValue)
                            setValue("index", index)

                        },
                        "employee": () => {
                            const {name, cnpj, tel, email, procedures: employeeProcedures} = item
                            setValue("name", name)
                            setValue("cnpj", cnpj)
                            setValue("tel", tel)
                            setValue("email", email)
                            setValue("procedures", employeeProcedures)
                            setValue("index", index)

                        }
                    }

                    setType[itemType]()
                } else {
                    clearItem()
                }
            } else {
                registeredItem.isInView = false
            }
            return registeredItem;
        }));

    };

    const editItem = (item) => {
        setRegisteredItems(registeredItems.map((registeredItem, i) => {
            if (item.index === i) {
                registeredItem = {...item};
            }
            registeredItem.isInView = false

            return registeredItem;
        }));

        cancelEditing(false)
        setIsRegisteredItemsBoxOpened(true);

    };

    const addItem = (data) => {
        let newItems = [];

        const addTypes = {
            "employee": () => {
                return newItems = [...registeredItems, {
                    ...data,
                    employeeType: "FNC",
                    salonId: isSigningUp ? "" : currentUser.idSalon,
                }];
            },
            "procedure": () => {
                return newItems = [...registeredItems, {
                    ...data,
                    employeeId: isSigningUp ? "" : currentUser?.idFunc,
                    salonId: isSigningUp ? "" : currentUser?.idSalon,
                    id: isSigningUp ? Math.random() : "",
                }];
            },
            "default": () => {
                return newItems = [...registeredItems, data];

            }
        }

        setRegisteredItems(addTypes[itemType]());
        if (isSigningUp) persistInForm(addTypes[itemType]());
        clearItem();

    };

    const chooseAddEmployeeMethod = (data) => {
        if (registeredItemIsEditing) {
            editItem(data);
        } else {
            addItem(data);
            setIsRegisteredItemsBoxOpened(true);

        }
    };

    const deletePreRegisteredItem = item => {
        const newRegisteredItems = registeredItems.filter((registeredItem, index) => item !== registeredItem);
        setRegisteredItems(newRegisteredItems);

        if (isSigningUp) persistInForm(newRegisteredItems);
        clearItem();
    };

    return (
        <>
            {!isSigningUp && (
                <RegisterHeader
                    isConfirmDisabled={(registeredItemIsEditing || (isMultiInsert && !registeredItems.length > 0)) && !isEditing}
                    color={color}
                    headerTitle={headerTitle}
                    onCancel={onCancel}
                    onConfirm={(isMultiInsert && isEditing) || !isMultiInsert  ? handleSubmit(onConfirm) : () => onConfirm(registeredItems)}
                    isEditing={isEditing}
                />
            )}

            {registeredItemIsEditing && (
                <S.CancelButton
                    color={color}
                    onPress={() => cancelEditing(true)}>
                    <Times
                        fill={"#fff"}
                        borderFill={Colors.LIGHT_GREY}
                        width={10}
                        height={10}
                    />
                    <Text style={{marginLeft: 20, color: 'white', fontSize: 16}}>Cancelar edição</Text>
                </S.CancelButton>
            )}
            <S.Content
                behavior={Platform.OS === "ios" ? "height" : "padding"}
                keyboardShouldPersistTaps="handled">
                {children}



            </S.Content>

            {isMultiInsert && (
                <S.Footer>
                    <FloatButton
                        bottom={`${screenHeight / (isSmallerScreen ? 10 : 7)}px`}
                        right={"40px"}
                        onPress={handleSubmit(chooseAddEmployeeMethod)}
                        buttonColor={color}
                        icon={registeredItemIsEditing ? "pen" : "plus"}
                    />
                    <S.AddMessage screenHeight={screenHeight}>
                        Não esqueça de adicionar as informações.
                    </S.AddMessage>

                    {!isEditing && isMultiInsert  && !registeredItemIsEditing && (
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
                </S.Footer>
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
