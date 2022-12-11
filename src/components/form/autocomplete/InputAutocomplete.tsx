import React from "react";
import Autocomplete from "react-native-autocomplete-input"
import {Control} from "react-hook-form";
import Input, {IInput} from "@components/form/Input";
import SuggestionItem from "@components/form/autocomplete/SuggestionItem";
import {StyleSheet} from "react-native";

interface IInputAutocomplete extends IInput {
    options: unknown[],
    width: string,
    suggestionItemLabel: string;
    onItemClick(item: unknown): void;


}

const InputAutocomplete: React.FC<IInputAutocomplete> = ({options, suggestionItemLabel, onItemClick, ...props}) => {
    return (
        <Autocomplete
            containerStyle={{
                width: "100%",
            }}
            inputContainerStyle={{
                width: "100%",
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0
            }}
            listContainerStyle={{
                borderRadius: 5,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderLeftWidth: StyleSheet.hairlineWidth,
                borderRightWidth: StyleSheet.hairlineWidth,
                borderColor: '#A177AF'
            }}
            data={options}
            renderTextInput={() => <Input {...props} />}
            flatListProps={{
                keyExtractor: (item) => item.objectId,
                renderItem: ({item}) => <SuggestionItem label={suggestionItemLabel} value={item}
                                                        onItemClick={onItemClick}/>,
            }}
        />
    )
}

export default InputAutocomplete