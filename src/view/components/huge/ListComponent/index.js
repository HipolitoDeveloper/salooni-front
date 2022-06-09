import React, {useRef, useState} from "react";
import * as S from "./styled";
import ListContent from "./ListContent";
import ListHeader from "./ListHeader";
import Button from "../../small/Button";
import ListMenu from "./ListMenu";
import {Animated, Dimensions, Platform, RefreshControl,} from "react-native";
import FloatButton from "../../small/FloatButton";
import Times from "../../../../assets/svg/timesSVG.svg";
import Icon from "react-native-vector-icons/FontAwesome5";
import {removeParenthesis} from "../../../../common/RegexFns";
import Colors from "../../../../common/style/Colors";

const {diffClamp} = Animated;

const List = ({
                  showCloseButton,
                  backButtonHeader,
                  showBackButton,
                  showCalendarButton,
                  showHeader,
                  color,
                  headerText,
                  subHeaderText,
                  menuItems,
                  objectMenuItems,
                  analyzeItem,
                  itemType,
                  items,
                  onDeleteItem,
                  onUpdateItem,
                  onAddNavigateTo,
                  onEditNavigateTo,
                  handleAgenda,
                  navigateToCalendar,
                  isOwner,
                  searchPlaceHolder,
                  showProfileIcon,
                  fetchData,
                  refreshing,
                  showAddButton,
                  goToSchedules,
                  showMenu,
              }) => {
        const screenHeight = Dimensions.get("screen").height;
        const screenWidth = Dimensions.get("screen").width;
        const isSmallerScreen = screenHeight < 650;

        const [isConfirming, setIsConfirming] = useState(false);
        const [selectedItems, setSelectedItems] = useState([])
        const [markedItems, setMarkedItems] = useState([])
        const [menuState, setMenuState] = useState({
            itemInView: {},
            open: false,
        });
        const [search, setSearch] = useState("")

        const regex = new RegExp(`${search.replace("(", "").replace(")", "").trim()}`, "i");
        const isDeleting = selectedItems.length > 0;
        const showFooter = isDeleting || isConfirming;

        //HEADER POSITION HANDLER
        const [scrolling, setScrolling] = useState(false);

        const headerHeight = Platform.OS === "ios" ? 90 * 2 : (screenHeight / 10) * 2;
        const scrollY = useRef(new Animated.Value(0));
        const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
        const translateY = scrollYClamped.interpolate({
            inputRange: [0, headerHeight],
            outputRange: [0, -(headerHeight / 2)],
        });
        const translateYNumber = useRef();
        const scrollRef = useRef(null);
        const handleScroll = Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {y: scrollY.current},
                    },
                },
            ],
            {
                useNativeDriver: true,
            },
        );

        translateY.addListener(({value}) => {
            translateYNumber.current = value;
            setScrolling(translateYNumber.current === 0);
        });

        const getCloser = (value, checkOne, checkTwo) =>
            Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

        const handleSnap = ({nativeEvent}) => {
            const offsetY = nativeEvent.contentOffset.y;

            if (
                !(
                    translateYNumber.current === 0 ||
                    translateYNumber.current === -headerHeight / 2
                )
            ) {
                if (scrollRef.current) {
                    scrollRef.current.scrollToOffset({
                        offset:
                            getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
                            -headerHeight / 2
                                ? offsetY + headerHeight / 2
                                : offsetY - headerHeight / 2,
                    });
                }
            }
        };

        const handleMenu = item => {
            setMenuState({
                open: !menuState.open,
                itemInView: items.find(itemInView => itemInView.id === item.id),
            });
        };


        const selectItem = (itemId) => {
            console.log("itemId", itemId)
            items.map(item => {
                if (item.id === itemId) {
                    item.selected = !item.selected;
                }
                return item;
            })

            setSelectedItems(items.filter(item => item.selected))
        };

        const unselectItems = () => {
            setSelectedItems([])
            items.map(item => {
                item.selected = false;
                return item;
            })
        };


        const markItem = (itemId) => {
            items.map(item => {
                if (item.id === itemId) {
                    item.marked = !item.marked;
                }
                return item;
            })

            setIsConfirming(true);
            setMarkedItems(items.filter(item => item.marked))
        }


        const unmarkItems = () => {
            setMarkedItems([])
            items.map(item => {
                item.marked = item.analyzedSchedule;
                return item;
            })

            setIsConfirming(false);
        };

        const doSearch = () => {
            let searchedItems = items;

            const searchType = {
                "schedule": () => {
                    searchedItems = items.filter(
                        i => i.client.name.search(regex) >= 0 || i.selected || i.checked,
                    )
                },
                "clientSchedule": () => {
                    searchedItems = items.filter(
                        i => i.procedure.name.search(regex) >= 0,
                    )
                },
                "employee": () => {
                    searchedItems = items.filter(
                        i => i.name.search(regex) >= 0 || removeParenthesis(i.tel).search(regex) >= 0,
                    )
                },
                "procedure": () => {
                    searchedItems = items.filter(i => i.name.search(regex) >= 0 || i.selected)
                },
                "client": () => {
                    searchedItems = items.filter(
                        i => i.name.search(regex) >= 0 || removeParenthesis(i.tel).search(regex) >= 0,
                    )
                },
                "default": () => {
                    searchedItems = items.filter(i => i.name.search(regex) >= 0 || i.selected)
                }
            }

            if (search !== "") {
                searchType[itemType || "default"]()
            }

            return searchedItems
        };


        const closeMenu = () => {
            setMenuState({
                open: false,
                itemInView: {},
            });
        };

        const onDelete = (item) => {
            onDeleteItem(item || selectedItems);
            unselectItems()
        };

        const onDeleteItemProcedure = (procedure, item) => {
            item.procedures.forEach((itemProcedure, index) => {
                if (itemProcedure.id === procedure.id) {
                    item.procedures.splice(index, 1);
                }
            });
            setMenuState({
                ...menuState,
                itemInView: item,
            });
            onUpdateItem(item)
        };

// const handleItemProcedure = (itemProcedure, itemId) => {
//     let ableToDelete = true;
//     const item = items.find(item => item.id === itemId);
//     const {procedures} = item;
//
//     if (itemType === "schedule") {
//         if (procedures.length === 1) {
//             ableToDelete = false;
//             setShowAlertModal({
//                 text: "Se você apagar o último procedimento desse agendamento, o agendamento por inteiro também será excluído!",
//                 isVisible: true,
//                 onOk: () => {
//                     deleteItemProcedure(itemProcedure, itemId, true, item);
//                     setShowAlertModal({isVisible: false});
//                     handleMenu(item);
//                 },
//                 title: "Atenção",
//                 onClose: () => setShowAlertModal({isVisible: false}),
//                 cancelTitle: "Cancelar",
//                 okTitle: "Apagar",
//             });
//         }
//     }
//     return ableToDelete;
// };


        const doConfirm = () => {
            analyzeItem([...markedItems, ...items]);
            setSelectedItems([]);
            setMarkedItems([]);
            setIsConfirming(false);
        };


        const doRefresh = async () => {
            await fetchData();
        };

        return (
            <S.Container>
                {showMenu && (
                    <ListMenu
                        isOwner={isOwner}
                        navigateToCalendar={navigateToCalendar}
                        handleMenu={handleMenu}
                        showCalendarButton={showCalendarButton}
                        isConfirming={isConfirming}
                        onConfirm={doConfirm}
                        itemType={itemType}
                        objectMenuItems={objectMenuItems}
                        menuState={menuState}
                        color={color}
                        onMarkItem={markItem}
                        onCancel={unmarkItems}
                        menuItems={menuItems}
                        onDeleteItem={onDelete}
                        closeMenu={closeMenu}
                        onEditNavigateTo={onEditNavigateTo}
                        onDeleteProcedure={onDeleteItemProcedure}
                        goToSchedules={goToSchedules}
                    />
                )}

                {showHeader && (
                    <Animated.View
                        style={[
                            {
                                position: "absolute",
                                left: 0,
                                right: 0,
                                width: "100%",
                                zIndex: 1,
                            },
                            {transform: [{translateY}]},
                        ]}>
                        <ListHeader
                            showCloseButton={showCloseButton}
                            backButtonHeader={backButtonHeader}
                            showBackButton={showBackButton}
                            isDeleting={isDeleting}
                            items={items}
                            headerColor={color}
                            headerTitle={headerText}
                            headerSubTitle={subHeaderText}
                            onSearch={(text) => setSearch(text)}
                            selectedItemsLength={selectedItems?.length}
                            onCancel={unselectItems}
                            handleAgenda={handleAgenda}
                            showProfileIcon={showProfileIcon}
                            headerHeight={headerHeight}
                            searchPlaceHolder={searchPlaceHolder}
                            scrolling={scrolling}
                        />
                    </Animated.View>
                )}
                <S.Body isDeleting={isDeleting} isConfirming={isConfirming}>
                    <Animated.FlatList
                        ref={scrollRef}
                        scrollEventThrottle={16}
                        contentContainerStyle={{paddingTop: showHeader ? headerHeight : 0}}
                        onMomentumScrollEnd={handleSnap}
                        onScroll={handleScroll}
                        keyExtractor={item => item.id}
                        data={doSearch()}
                        // onEndReached={fetchMoreData}
                        // onEndReachedThreshold={0.2}

                        refreshControl={
                            <RefreshControl
                                onRefresh={doRefresh}
                                refreshing={refreshing}
                                progressViewOffset={180}
                            />
                        }
                        renderItem={({item}) => (
                            <ListContent
                                item={item}
                                isDeleting={isDeleting}
                                itemType={itemType}
                                color={color}
                                onSelect={isOwner? selectItem: () => {}}
                                selectedItems={selectedItems}
                                onPressItem={() => {
                                    handleMenu(item)
                                }}
                                onMarkItem={markItem}
                                showMenu={showMenu}
                            />
                        )}
                        ListEmptyComponent={
                            <S.EmptyMessageWrapper>
                                <S.EmptyMessageText>
                                    Não existem informações disponíveis.
                                    {"\n \n"}
                                    Para adicionar, clique no <Icon
                                    name={"plus-circle"}
                                    size={18}
                                    color={color}
                                /> abaixo!
                                </S.EmptyMessageText>
                            </S.EmptyMessageWrapper>
                        }
                    />
                </S.Body>
                {!showFooter && showAddButton && isOwner && (
                    <FloatButton
                        bottom={"40px"}
                        right={"30px"}
                        onPress={onAddNavigateTo}
                        buttonColor={color}
                        icon={"plus"}
                    />
                )}

                {showFooter && (
                    <S.Footer color={color}>
                        <S.FooterButtons>
                            {isDeleting && (
                                <Button
                                    disabled={false}
                                    onPress={() => onDelete()}
                                    text={"Apagar"}
                                    width={"120px"}
                                    height={"35px"}
                                    fontSize={"17px"}
                                    color={color}
                                    textColor={color}
                                    backgroundColor={Colors.BACKGROUND_COLOR}
                                />
                            )}

                            {isConfirming && !isDeleting && (
                                <>
                                    <Button
                                        disabled={false}
                                        onPress={doConfirm}
                                        text={"Confirmar"}
                                        width={"120px"}
                                        height={"35px"}
                                        fontSize={"17px"}
                                        color={color}
                                        textColor={color}
                                        backgroundColor={Colors.BACKGROUND_COLOR}
                                    />
                                    <S.CancelButton
                                        onPress={unmarkItems}>
                                        <Times
                                            fill={"#fff"}
                                            borderFill={"#fff"}
                                            width={15}
                                            height={15}
                                        />
                                    </S.CancelButton>
                                </>
                            )}
                        </S.FooterButtons>
                    </S.Footer>
                )}
                {/*<Modal*/}
                {/*  text={*/}
                {/*    "Se você apagar o último procedimento desse agendamento, o agendamento por inteiro também será excluído!"*/}
                {/*  }*/}
                {/*  isVisible={showAlertModal.isVisible}*/}
                {/*  onOk={showAlertModal.onOk}*/}
                {/*  title={showAlertModal.title}*/}
                {/*  onClose={showAlertModal.onClose}*/}
                {/*  cancelTitle={showAlertModal.cancelTitle}*/}
                {/*  okTitle={showAlertModal.okTitle}*/}
                {/*/>*/}
            </S.Container>
        );
    }
;

export default List;
