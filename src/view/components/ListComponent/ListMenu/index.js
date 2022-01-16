import React, { useState } from "react";
import * as S from "./styled";
import Button from "../../small/Button";
import global from "../../../../common/global";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Dimensions, FlatList, ScrollView, View } from "react-native";
import RoundedTimes from "../../../../assets/svg/roundedTimesSVG.svg";
import { Switch } from "../../small/Switch";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import Clock from "../../../../assets/svg/clockSVG.svg";
import { ItemInformationWrapper, ScheduleButtonWrapper, ScheduleContent } from "./styled";

const ListMenu = ({
                    navigateToCalendar,
                    showCalendarButton,
                    color,
                    menuItems,
                    objectMenuItems,
                    menuState,
                    closeMenu,
                    deleteItem,
                    onEditNavigateTo,
                    deleteProcedure,
                    itemType,
                    checkItem,
                    isConfirming,
                    onConfirm,
                    handleMenu,
                    isOwner,
                    goToSchedules,
                  }) => {
  const screenHeight = Dimensions.get("screen").height;
  const screenWidth = Dimensions.get("screen").width;
  const isSmallerScreen = screenHeight < 650;

  const hasProcedure = menuItems?.some(item => item === "procedure");
  const showingItem = Object.keys(menuState.itemToShow).length > 0;

  const navigate = useNavigation();

  const showItemProperty = item => {
    if (item === "value") {
      return (
        <S.ItemProperty screenHeight={screenHeight}>
          R$ {menuState.itemToShow[`${item}`]}
        </S.ItemProperty>
      );
    } else if (item === "time") {
      return (
        <S.ItemProperty screenHeight={screenHeight}>
          {menuState.itemToShow[`${item}`]} min.
        </S.ItemProperty>
      );
    } else {
      return (
        <S.ItemProperty screenHeight={screenHeight}>
          {menuState.itemToShow[`${item}`]}
        </S.ItemProperty>
      );
    }
  };

  const showObjectItemProperty = (object, item) => {
    return (
      <S.ItemProperty screenHeight={screenHeight}>
        {menuState.itemToShow[`${object}`][`${item}`]}
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
                color={`${global.colors.lightGreyColor}`}
              />
            </S.CloseButton>
          </S.CloseButtonContent>
          <S.Content color={color}>
            {itemType === "schedule" && menuState.itemToShow.passedHour && (
              <S.ConfimationMessageContent>
                <S.ConfimationMessageText screenHeight={screenHeight}>
                  Os procedimentos do agendamento foram realizados?
                </S.ConfimationMessageText>
                <Switch
                  backgroundColor={global.colors.lightGreyColor}
                  circleColor={global.colors.purpleColor}
                  marginTop={"10px"}
                  handleSwitch={() => {
                    checkItem(menuState.itemToShow.id);
                  }}
                  switchState={{
                    state: menuState.itemToShow.checked,
                    text: menuState.itemToShow.checked ? "check" : "times",
                  }}
                />
              </S.ConfimationMessageContent>
            )}
            {itemType === "client" && (
              <S.ScheduleButtonWrapper onPress={() => {
                handleMenu(menuState.itemToShow)
                goToSchedules(menuState.itemToShow)}
              } >
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
                        data={menuState.itemToShow[`${item}`]}
                        renderItem={({ item }) => (
                          <S.ProcedureContent
                            screenHeight={screenHeight}
                            disabled={!isOwner && itemType !== "schedule"}
                            onPress={() =>
                              deleteProcedure(
                                item,
                                menuState.itemToShow.id,
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
                      backgroundColor={global.colors.backgroundColor}
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
                      onPress={() => checkItem(-1)}
                      color={color}
                      text={"Cancelar confirmação"}
                      width={"120px"}
                      height={"35px"}
                      fontSize={"17px"}
                      textColor={global.colors.lightGreyColor}
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
                          navigateToCalendar(menuState.itemToShow);
                          handleMenu(menuState.itemToShow);
                        }}
                        color={color}
                        text={"Agenda"}
                        width={"120px"}
                        height={"35px"}
                        fontSize={"17px"}
                        textColor={color}
                        backgroundColor={global.colors.backgroundColor}
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
                        onEditNavigateTo(menuState.itemToShow);
                        handleMenu(menuState?.itemToShow);
                      }}
                      color={color}
                      text={"Editar"}
                      width={"120px"}
                      height={"35px"}
                      fontSize={"17px"}
                      textColor={color}
                      backgroundColor={global.colors.backgroundColor}
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
                        deleteItem(menuState.itemToShow);
                        closeMenu();
                      }}
                      color={global.colors.backgroundColor}
                      textColor={global.colors.backgroundColor}
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
