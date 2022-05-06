import React, {useState} from "react";
import * as S from "./styled";
import Button from "../../../small/Button";
import Icon from "react-native-vector-icons/FontAwesome5";
import {Dimensions, FlatList, ScrollView, View} from "react-native";
import RoundedTimes from "../../../../../assets/svg/roundedTimesSVG.svg";
import {Switch} from "../../../small/Switch";
import Modal from "react-native-modal";
import {useNavigation} from "@react-navigation/native";
import Clock from "../../../../../assets/svg/clockSVG.svg";
import {ItemInformationWrapper, ScheduleButtonWrapper, ScheduleContent} from "./styled";
import Colors from "../../../../../common/style/Colors";
import {useProcedure} from "../../../../../hooks";

const ListMenu = ({
                      navigateToCalendar,
                      showCalendarButton,
                      color,
                      menuItems,
                      objectMenuItems,
                      menuState,
                      closeMenu,
                      onDeleteItem,
                      onEditNavigateTo,
                      onDeleteProcedure,
                      itemType,
                      onMarkItem,
                      isConfirming,
                      onConfirm,
                      onCancel,
                      handleMenu,
                      isOwner,
                      goToSchedules,
                  }) => {
    const {procedures} = useProcedure()

    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;
    const isSmallerScreen = screenHeight < 650;

    const hasProcedure = menuItems?.some(item => item === "procedure");
    const showingItem = Object.keys(menuState.itemInView).length > 0;

    const navigate = useNavigation();

    const showItemProperty = item => {
        if (item === "cost") {
            return (
                <S.ItemProperty screenHeight={screenHeight}>
                    R$ {menuState.itemInView[`${item}`]}
                </S.ItemProperty>
            );
        } else if (item === "duration") {
            return (
                <S.ItemProperty screenHeight={screenHeight}>
                    {menuState.itemInView[`${item}`]} min.
                </S.ItemProperty>
            );
        } else {
            return (
                <S.ItemProperty screenHeight={screenHeight}>
                    {menuState.itemInView[`${item}`]}
                </S.ItemProperty>
            );
        }
    };

    const showObjectItemProperty = (object, item) => {
        return (
            <S.ItemProperty screenHeight={screenHeight}>
                {menuState.itemInView[`${object}`][`${item}`]}
            </S.ItemProperty>
        );
    };

    const chooseItemPropertyView = (object, item) => {
        if (object && showingItem) {
            return showObjectItemProperty(object, item);
        } else {
            return showItemProperty(item);
        }
    };

    return (
        <S.Wrapper>
            <Modal
                scrollHorizontal={true}
                style={{
                    justifyContent: "flex-end",
                    margin: 0,
                }}
                onBackButtonPress={closeMenu}
                isVisible={menuState.open}
                onBackdropPress={closeMenu}
                onRequestClose={closeMenu}>
                <S.Container>
                    <S.CloseButtonContent onPress={closeMenu}>
                        <S.CloseButton color={color}>
                            <Icon
                                name={"times"}
                                size={25}
                                color={Colors.LIGHT_GREY}
                            />
                        </S.CloseButton>
                    </S.CloseButtonContent>
                    <S.Content color={color}>
                        {itemType === "schedule" && menuState.itemInView.passedHour && (
                            <S.ConfimationMessageContent>
                                <S.ConfimationMessageText screenHeight={screenHeight}>
                                    Os procedimentos do agendamento foram realizados?
                                </S.ConfimationMessageText>
                                <Switch
                                    backgroundColor={Colors.LIGHT_GREY}
                                    circleColor={Colors.PURPLE}
                                    marginTop={"10px"}
                                    handleSwitch={() => {
                                        onMarkItem(menuState.itemInView.id);
                                    }}
                                    value={menuState.itemInView.marked}
                                />
                            </S.ConfimationMessageContent>
                        )}
                        {itemType === "client" && (
                            <S.ScheduleButtonWrapper onPress={() => {
                                handleMenu(menuState.itemInView)
                                goToSchedules(menuState.itemInView)
                            }
                            }>
                                <S.ScheduleContent>
                                    <Clock
                                        fill={color}
                                        borderFill={"#fff"}
                                        width={30}
                                        height={30}
                                    />
                                    <S.ScheduleText>Últimas visitas</S.ScheduleText>
                                </S.ScheduleContent>
                            </S.ScheduleButtonWrapper>
                        )}
                        <S.ItemInformationWrapper hasProcedure={hasProcedure}>
                            {menuItems.map((item, index) => (
                                <View key={item}>
                                    {item === "procedures" ? (
                                        <S.ProcedureContainer>
                                            <FlatList
                                                keyExtractor={item => item.id}
                                                data={menuState.itemInView[item]?.map(itemProcedure => {
                                                    const availableProcedure = procedures.find(procedure => itemProcedure.id === procedure.id)
                                                    return {id: availableProcedure?.id, name: availableProcedure?.name}
                                                })}
                                                renderItem={({item}) => (
                                                    <S.ProcedureContent
                                                        screenHeight={screenHeight}
                                                        disabled={!isOwner && itemType !== "schedule"}
                                                        onPress={() =>
                                                            onDeleteProcedure(
                                                                item,
                                                                menuState.itemInView,
                                                                false,
                                                            )
                                                        }>
                                                        <S.ProcedureDeleteIcon>
                                                            <RoundedTimes
                                                                fill={"#fff"}
                                                                borderFill={color}
                                                                width={screenWidth / 20}
                                                                height={screenHeight / 20}
                                                            />
                                                        </S.ProcedureDeleteIcon>
                                                        <S.ProcedureText screenHeight={screenHeight}>
                                                            {item.name}
                                                        </S.ProcedureText>
                                                    </S.ProcedureContent>
                                                )}
                                            />
                                        </S.ProcedureContainer>
                                    ) : (
                                        chooseItemPropertyView(
                                            objectMenuItems ? objectMenuItems[index] : undefined,
                                            item,
                                        )
                                    )}
                                </View>
                            ))}
                        </S.ItemInformationWrapper>
                        {isOwner && (
                            <S.FooterButtons isSmallerScreen={isSmallerScreen}>
                                {isConfirming ? (
                                    <>
                                        <Button
                                            disabled={false}
                                            marginBottom={"20px"}
                                            onPress={onConfirm}
                                            color={color}
                                            text={"Confirmar"}
                                            width={"120px"}
                                            height={"35px"}
                                            fontSize={"17px"}
                                            textColor={color}
                                            backgroundColor={Colors.BACKGROUND_COLOR}
                                            leftContent={{
                                                show: true,
                                                height: "20px",
                                                width: "20px",
                                                icon: "check",
                                                iconColor: "black",
                                                backgroundColor: `${color}`,
                                                borderRadius: "20px",
                                                iconSize: 13,
                                            }}
                                        />
                                        <Button
                                            disabled={false}
                                            marginBottom={"20px"}
                                            onPress={onCancel}
                                            color={color}
                                            text={"Cancelar confirmação"}
                                            width={"120px"}
                                            height={"35px"}
                                            fontSize={"17px"}
                                            textColor={Colors.LIGHT_GREY}
                                            backgroundColor={color}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {showCalendarButton && (
                                            <Button
                                                disabled={false}
                                                marginBottom={"20px"}
                                                onPress={() => {
                                                    navigateToCalendar(menuState.itemInView);
                                                    handleMenu(menuState.itemInView);
                                                }}
                                                color={color}
                                                text={"Agenda"}
                                                width={"120px"}
                                                height={"35px"}
                                                fontSize={"17px"}
                                                textColor={color}
                                                backgroundColor={Colors.BACKGROUND_COLOR}
                                                leftContent={{
                                                    show: true,
                                                    height: "20px",
                                                    width: "20px",
                                                    icon: "calendar-alt",
                                                    iconColor: "black",
                                                    backgroundColor: `${color}`,
                                                    borderRadius: "20px",
                                                    iconSize: 13,
                                                }}
                                            />
                                        )}

                                        <Button
                                            disabled={false}
                                            marginBottom={"20px"}
                                            onPress={() => {
                                                onEditNavigateTo(menuState.itemInView);
                                                handleMenu(menuState?.itemInView);
                                            }}
                                            color={color}
                                            text={"Editar"}
                                            width={"120px"}
                                            height={"35px"}
                                            fontSize={"17px"}
                                            textColor={color}
                                            backgroundColor={Colors.BACKGROUND_COLOR}
                                            leftContent={{
                                                show: true,
                                                height: "20px",
                                                width: "20px",
                                                icon: "pen",
                                                iconColor: "black",
                                                backgroundColor: `${color}`,
                                                borderRadius: "20px",
                                                iconSize: 13,
                                            }}
                                        />
                                        <Button
                                            disabled={false}
                                            marginBottom={"20px"}
                                            onPress={() => {
                                                onDeleteItem([menuState.itemInView]);
                                                closeMenu();
                                            }}
                                            color={Colors.BACKGROUND_COLOR}
                                            textColor={Colors.BACKGROUND_COLOR}
                                            backgroundColor={color}
                                            text={"Excluir"}
                                            width={"120px"}
                                            height={"35px"}
                                            fontSize={"17px"}
                                            leftContent={{
                                                show: true,
                                                height: "20px",
                                                width: "20px",
                                                icon: "trash",
                                                iconColor: "black",
                                                backgroundColor: `${color}`,
                                                borderRadius: "20px",
                                                iconSize: 13,
                                            }}
                                        />
                                    </>
                                )}
                            </S.FooterButtons>
                        )}
                    </S.Content>
                </S.Container>
            </Modal>
        </S.Wrapper>
    );
};

export default ListMenu;
