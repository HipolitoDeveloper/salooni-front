import React from "react";
import {FormControl, HStack, IInputProps, Input as BaseInput, WarningOutlineIcon} from "native-base";
import {Control, Controller} from "react-hook-form";


export interface IInput extends IInputProps {
    isSecureTextEntry?: boolean;
    control: Control,
    name: string;
}

const Input: React.FC<IInput> = ({
                                     placeholder,
                                     size = 'xl',
                                     width,
                                     variant = 'underlined',
                                     isSecureTextEntry = false,
                                     value, clearButtonMode,
                                     style,
                                     type,
                                     onChangeText,
                                     name,
                                     control,
                                     ...props
                                 }) => {
    return (

        <Controller name={name} control={control} render={({field: {onChange, value}, fieldState: {error}}) => (
            <HStack w={width}>

                <FormControl isInvalid={!!error}>
                    <BaseInput placeholder={placeholder} size={size} variant={variant} type={type}
                               clearButtonMode={clearButtonMode}
                               secureTextEntry={isSecureTextEntry}
                               focusOutlineColor={'purple.1000'}
                               placeholderTextColor={'black.1000'}
                               onChangeText={onChange}
                               value={value}
                               {...props}
                    />
                    {!!error && (
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            {error.message}
                        </FormControl.ErrorMessage>
                    )}
                </FormControl>
            </HStack>
        )
        }/>

    )
}

export default Input;
