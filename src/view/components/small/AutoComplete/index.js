import React, {useRef, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Dimensions, FlatList, Text} from 'react-native';
import {InputTitle} from './styled';
import Input from "../Input";
import Colors from "../../../../common/style/Colors";

const AutoComplete = ({
                          placeholder,
                          iconName,
                          iconColor,
                          searchLengthToSuggest,
                          options,
                          handleChange,
                          name,
                          value,
                          textColor,
                          editable,
                          inputText,
                          error,
                          persistProcedures,
                          fontSize
                      }) => {
    const screenHeight = Dimensions.get("screen").height;

    const [suggestions, setSuggestions] = useState([]);

    const handleSuggestion = text => {
        handleChange({name: text})
        if (text === "") setSuggestions([])
        else {
            const regex = new RegExp(`${text.trim()}`, 'i');
            setSuggestions(options.filter(i => i.name.search(regex) >= 0));
        }
    };

    const chooseSuggestion = suggestion => {
        setSuggestions([]);
        handleChange(suggestion);

        if(persistProcedures) persistProcedures(suggestion.procedures)

    };

    const clearSearch = () => {
        handleChange({name: ''});
    };

    return (
        <S.Container>
            <S.InputContainer>
                <S.InputTitle screenHeight={screenHeight} fontSize={fontSize} color={iconColor}>{inputText}</S.InputTitle>
                <S.InputContent>
                    {iconName && (
                        <S.IconContainer>
                            <Icon
                                name={iconName}
                                size={30}
                                style={{marginTop: 13, marginRight: 10}}
                                color={iconColor}
                            />
                        </S.IconContainer>
                    )}

                    <Input
                        name={name}
                        placeholder={placeholder}
                        // placeholderTextColor={textColor}
                        value={value?.name}
                        handleChange={handleSuggestion}
                        editable={editable}
                        error={error}
                        color={Colors.PURPLE}
                        fontSize={38}
                        width={"90%"}
                    />
                    {value?.length > 0 && (
                        <S.ClearButton onPress={() => clearSearch()}>
                            <Icon
                                name={'times'}
                                size={15}
                                style={{marginTop: 13, marginRight: 10}}
                            />
                        </S.ClearButton>
                    )}
                </S.InputContent>
            </S.InputContainer>
            <S.SuggestionContent>
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    keyExtractor={item => item.id}
                    data={suggestions}
                    renderItem={({item}) => (
                        <S.InputItem onPress={() => chooseSuggestion(item)}>
                            <S.InputText color={iconColor}>{item.name}</S.InputText>
                        </S.InputItem>
                    )}
                />
            </S.SuggestionContent>
        </S.Container>
    );
};
export default AutoComplete;
