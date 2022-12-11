import React from "react";
import {TouchableOpacity, Text} from "react-native";

interface ISuggestionItem {
    onItemClick(item: unknown): void;
    label: string;
    value: unknown;
}
const SuggestionItem: React.FC<ISuggestionItem> = ({onItemClick, label, value}) => {
    return(
        value &&
        <TouchableOpacity onPress={() => onItemClick(value)}>
            <Text>{value[label]}</Text>
        </TouchableOpacity>
    )
}

export default SuggestionItem