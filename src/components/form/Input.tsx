import React from "react";
import {FormControl, HStack, IInputProps, Input as BaseInput, WarningOutlineIcon} from "native-base";


export interface IInput extends IInputProps {
    error?: any;
    isSecureTextEntry?: boolean
}

const Input: React.FC<IInput> = ({
                                     placeholder,
                                     size= 'xl',
                                     width,
                                     variant = 'underlined',
                                     error,
                                     isSecureTextEntry = false,
                                     value, clearButtonMode,
                                     onChangeText,
                                     style,
                                     type
                                 }) => {

    return (
        <HStack w={width}>
            <FormControl isInvalid={!!error}>
                <BaseInput placeholder={placeholder} size={size} variant={variant} type={type}
                           onChangeText={onChangeText} clearButtonMode={clearButtonMode} value={value}
                           secureTextEntry={isSecureTextEntry}
                           focusOutlineColor={'purple.1000'}
                           placeholderTextColor={'black.1000'}
                />


                {!error && (
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        Try different from previous passwords.
                    </FormControl.ErrorMessage>
                )}

            </FormControl>
        </HStack>
    )
}

export default Input;
