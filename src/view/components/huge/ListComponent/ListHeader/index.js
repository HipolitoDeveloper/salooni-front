import React, { useEffect, useState } from "react";
import * as S from "./styled";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Salooni from "../../../../../assets/svg/salooniSVG.svg";
import Search from "../../../../../assets/svg/searchSVG.svg";
import Times from "../../../../../assets/svg/timesSVG.svg";
import { View, Text, Dimensions } from "react-native";
import { CalendarIcon, CloseButton, ProfileIcon } from "./styled";
import Profile from "../../../../../assets/svg/profileSVG.svg";
import BackButton from "../../../small/BackButton";
import Colors from "../../../../../common/style/Colors";

const ListHeader = ({
                      backButtonHeader,
                      onSearch,
                      headerTitle,
                      headerSubTitle,
                      headerColor,
                      calendarView,
                      showProfileIcon,
                      isDeleting,
                      selectedItemsLength,
                      onCancel,
                      handleAgenda,
                      headerHeight,
                      searchPlaceHolder,
                      scrolling,
                      showBackButton,
                      showCloseButton
                    }) => {
  const screenHeight = Dimensions.get("screen").height;
  const screenWidth = Dimensions.get("screen").width;
  const isSmallerScreen = screenHeight < 650;

  const [scheduleView, setScheduleView] = useState("");
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    setScheduleView(calendarView);
  }, []);

  return (
    <S.Container
      backButtonHeader={backButtonHeader}
      style={[
        {
          height: headerHeight,
        },
      ]}>
      {backButtonHeader ? (
        <S.HeaderContent>
          <BackButton
            positionLeft={"20px"}
            positionTop={"60px"}
            onPress={() => {
              navigation.push("TabStack", { screen: "Schedules" });
            }}
            buttonColor={Colors.PURPLE}
          />
          <S.HeaderText>Agendamentos a confirmar</S.HeaderText>
        </S.HeaderContent>
      ) : (
        <S.Content>
          <S.Header>
            {!isDeleting && scrolling && (
              <S.IconContent>
                {showBackButton ? (
                  <BackButton
                    onPress={() =>
                      navigation.goBack()
                    }
                    buttonColor={headerColor}
                    positionTop={"20px"}
                    positionLeft={"10px"}
                  />
                ) : (
                  <Salooni
                    fill={headerColor}
                    borderFill={"#fff"}
                    width={screenWidth / 8}
                    height={screenHeight / 8}
                  />
                )}
              </S.IconContent>
            )}
            {isDeleting ? (
              <S.DeleteContent headerColor={headerColor}>
                <S.DeleteText>{`Deseja apagar os ${selectedItemsLength} itens?`}</S.DeleteText>
                <S.DeleteCancelIcon onPress={onCancel}>
                  <Times
                    fill={"#fff"}
                    borderFill={"#fff"}
                    width={10}
                    height={10}
                  />
                </S.DeleteCancelIcon>
              </S.DeleteContent>
            ) : (
              <>
                  <S.TitleName
                    screenHeight={screenHeight}
                    headerColor={headerColor}>
                    {headerTitle}
                  </S.TitleName>
                  {headerSubTitle && (
                    <S.SubTitleName
                      screenHeight={screenHeight}
                      headerColor={headerColor}>
                      cliente {headerSubTitle}
                    </S.SubTitleName>
                  )}
                {handleAgenda && (
                  <S.CalendarIcon
                    screenWidth={screenWidth}
                    onPress={handleAgenda}
                    backgroundColor={headerColor}>
                    <Icon name={"calendar"} size={14} color={"white"} />
                  </S.CalendarIcon>
                )}

                {showCloseButton && (
                  <S.CloseButton onPress={() => navigation.pop()}>
                    <Icon name={"close-circle"} size={25} color={'black'}/>
                  </S.CloseButton>
                )}

                {showProfileIcon && (
                  <S.ProfileIcon
                    onPress={() =>
                      navigation.push("AppSettingsStack")
                    }>
                    <Profile
                      fill={headerColor}
                      borderFill={"#fff"}
                      width={screenWidth / 12}
                      height={screenHeight / 12}
                    />
                  </S.ProfileIcon>
                )}
              </>
            )}
          </S.Header>

          <S.SubHeader>
            <S.SearchContainer>
              <S.SearchIcon>
                <Icon
                  name={"search"}
                  size={25}
                  color={"black"}
                />
              </S.SearchIcon>
              <S.SearchInput
                screenHeight={screenHeight}
                // value={search}
                onChangeText={onSearch}
                placeholder={searchPlaceHolder}
                placeholderTextColor={"black"}
              />

              <S.CancelInput
                onPress={() => {
                    onSearch("");
                }}
                hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}>
                  <Icon
                      name={"close"}
                      size={18}
                      color={"black"}
                  />
              </S.CancelInput>
            </S.SearchContainer>
          </S.SubHeader>
        </S.Content>
      )}
    </S.Container>
  );
};

export default ListHeader;

// ListHeader.defaultProps = {
//   onPress: () => {},
//   width: '120px',
//   height: '35px',
//   text: '',
//   color: 'white',
//   fontSize: '17px',
//   leftContent: {
//     show: false,
//     height: '20px',
//     width: '20px',
//     icon: '',
//     backgroundColor: 'white',
//     iconSize: 14,
//     iconColor: 'white',
//   },
// };
//
// Button.propTypes = {
//   onPress: PropTypes.func,
//   width: PropTypes.string,
//   text: PropTypes.string,
//   positionLeft: PropTypes.string,
//   color: PropTypes.string,
//   fontSize: PropTypes.string,
//   leftContent: PropTypes.object,
// };
