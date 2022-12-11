import React from "react";
import Autocomplete from "react-native-autocomplete-input"
import {Controller} from "react-hook-form";
import Input, {IInput} from "@components/form/Input";
import SuggestionItem from "@components/form/autocomplete/SuggestionItem";
import {StyleSheet} from "react-native";

interface IInputAutocomplete extends IInput {
    options: unknown[],
    width: string,
    suggestionItemLabel: string;

    onItemClick?: (item: unknown) => void;


}

const InputAutocomplete: React.FC<IInputAutocomplete> = ({
                                                             options,
                                                             suggestionItemLabel,
                                                             onItemClick,
                                                             name,
                                                             control,
                                                             ...props
                                                         }) => {
    return (
        <Controller name={name} control={control} render={({field: {onChange, value}, fieldState: {error}}) => (
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
                    borderColor: '#A177AF',
                    padding: options.length ? 10 : 0
                }}
                data={options}
                renderTextInput={() => <Input control={null} value={value} {...props} />}
                flatListProps={{
                    keyExtractor: (item) => item.objectId,
                    renderItem: ({item}) => <SuggestionItem label={suggestionItemLabel} value={item}
                                                            onItemClick={(item) => {
                                                                onItemClick && onItemClick(item);
                                                                onChange(item)
                                                            } }/>,
                }}
            />
        )}/>
    )
}

export default InputAutocomplete
