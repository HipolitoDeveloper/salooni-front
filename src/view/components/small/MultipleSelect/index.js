import React, { useCallback, useEffect, useState } from "react";
import * as S from "./styled";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Dimensions, FlatList, View } from "react-native";
import Modal from "react-native-modal";
import { BrushIcon, ButtonContent, ButtonText } from "./styled";
import Button from "../Button";
import Search from "../../../../assets/svg/searchSVG.svg";
import Times from "../../../../assets/svg/timesSVG.svg";
import Colors from "../../../../common/style/Colors";

const MultipleSelect = ({
                            iconColor,
                            modalHeaderText,
                            options = [],
                            plusIconColor,
                            selectedItemBorderColor,
                            handleMultiSelect,
                            value,
                            placeholderText,
                            inputText,
                        }) => {
    const [isShowingSuggestionBox, setIsShowingSuggestionBox] = useState(false);
    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;
    const isSmallerScreen = screenHeight < 650;

    const handleSelect = (item, selected) => {
        const newSuggestions = options.map(suggestion => {
            if (suggestion.id === item.id) {
                suggestion.selected = selected;
            }

            return suggestion;
        });

        handleMultiSelect(item);
        return newSuggestions;
    };

    const openModal = () => {
        setIsShowingSuggestionBox(true);
    };

    return (
        <S.Container>
            <S.SelectContent>
                <S.SelectedContainer>
                    <S.InputText color={iconColor}>{inputText}</S.InputText>
                    {value.some(v => v.id) > 0 ? (
                        <S.ItemsContainer>
                            <S.BrushIcon
                                onPress={openModal}
                                selectedItemBorderColor={selectedItemBorderColor}>
                                <Icon name={"brush"} size={20} color={iconColor} />
                            </S.BrushIcon>

                            <FlatList
                                horizontal={true}
                                data={value}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <S.SelectedContent
                                        selectedItemBorderColor={selectedItemBorderColor}>
                                        <S.SelectedContentText>{item.name}</S.SelectedContentText>
                                        <S.SelectedContentIcon
                                            onPress={() => handleSelect(item, false)}
                                            selectedItemBorderColor={selectedItemBorderColor}>
                                            <Icon name={"times"} size={20} color={iconColor} />
                                        </S.SelectedContentIcon>
                                    </S.SelectedContent>
                                )}
                            />
                        </S.ItemsContainer>
                    ) : (
                        <S.ButtonContent>
                            <Button
                                disabled={options?.length === 0}
                                marginBottom={"0"}
                                marginTop={"10px"}
                                onPress={openModal}
                                color={Colors.PURPLE}
                                text={placeholderText ? placeholderText : "Procedimentos"}
                                width={`100%`}
                                height={`${screenHeight / 15}px`}
                                fontSize={`${0.2* 100}px`}
                                textColor={"black"}
                                backgroundColor={iconColor}
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
                        </S.ButtonContent>
                    )}
                </S.SelectedContainer>
            </S.SelectContent>
            <SuggestionModal
                isVisible={isShowingSuggestionBox}
                onClose={() => setIsShowingSuggestionBox(!isShowingSuggestionBox)}
                options={options}
                value={value}
                modalHeaderText={modalHeaderText}
                plusIconColor={plusIconColor}
                handleSelect={handleSelect}
            />
        </S.Container>
    );
};

const SuggestionModal = ({
                             isVisible,
                             onClose,
                             options = [],
                             modalHeaderText,
                             plusIconColor,
                             handleSelect,
                         }) => {
        const [search, setSearch] = useState("");
        const regex = new RegExp(`${search.trim()}`, "i");


        const selectItem = item => {
            handleSelect(item, !item.selected);
        };

        return (
            <S.ModalContainer>
                <Modal
                    onBackButtonPress={onClose}
                    isVisible={isVisible}
                    onBackdropPress={onClose}
                    onRequestClose={onClose}
                >
                    <S.SuggestionContainer>
                        <S.SuggestionHeader>
                            <S.SuggestionHeaderText>{modalHeaderText}</S.SuggestionHeaderText>
                            <S.SearchContainer>
                                <S.SearchIcon>
                                    <Search
                                        fill={"#fff"}
                                        borderFill={"black"}
                                        width={20}
                                        height={20}
                                    />
                                </S.SearchIcon>
                                <S.SearchInput
                                    value={search}
                                    onChangeText={text => {
                                        setSearch(text);
                                    }}
                                    placeholder={"Procure por procedimentos"}
                                    placeholderTextColor={"black"}
                                />

                                <S.CancelInput
                                    onPress={() => {
                                        setSearch("");
                                    }}
                                    hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}>
                                    <Times
                                        fill={"#fff"}
                                        borderFill={"black"}
                                        width={10}
                                        height={10}
                                    />
                                </S.CancelInput>
                            </S.SearchContainer>
                        </S.SuggestionHeader>
                        <S.SuggestionContent>
                            <S.SuggestionBody>
                                <FlatList
                                    keyExtractor={item => item.id}
                                    style={{ width: "100%", height: "100%" }}
                                    data={options.filter(i => i?.name?.search(regex) >= 0 || i.selected)}
                                    renderItem={({ item }) => {
                                        if (!item.empty)
                                            return (
                                                <S.SuggestionItemContent onPress={() => selectItem(item)}>
                                                    <S.SuggestionItemIcon>
                                                        {item.selected ? (
                                                            <Icon
                                                                name={"minus-circle"}
                                                                size={25}
                                                                color={plusIconColor}
                                                            />
                                                        ) : (
                                                            <Icon
                                                                name={"plus"}
                                                                size={25}
                                                                color={plusIconColor}
                                                            />
                                                        )}
                                                    </S.SuggestionItemIcon>
                                                    <S.SuggestionItemText>{item.name}</S.SuggestionItemText>
                                                </S.SuggestionItemContent>
                                            );
                                    }}
                                />
                            </S.SuggestionBody>
                        </S.SuggestionContent>
                    </S.SuggestionContainer>
                </Modal>
            </S.ModalContainer>
        );
    }
;

export default MultipleSelect;
