import React from "react";
import {FormControl, HStack, IInputProps, Input as BaseInput, WarningOutlineIcon} from "native-base";
import {Control, Controller} from "react-hook-form";


export interface IInput extends IInputProps {
    control?: Control,
    name?: string;
}

const Input: React.FC<IInput> = ({
                                     placeholder,
                                     size = 'xl',
                                     width,
                                     variant = 'underlined',
                                     value,
                                     clearButtonMode,
                                     style,
                                     type,
                                     onChangeText,
                                     name,
                                     control,
                                     ...props
                                 }) => {
    return (

        control ? (
            <Controller name={name} control={control} render={({field: {onChange, value}, fieldState: {error}}) => (
                <HStack w={width}>

                    <FormControl isInvalid={!!error}>
                        <BaseInput placeholder={placeholder} size={size} variant={variant} type={type}
                                   clearButtonMode={clearButtonMode}
                                   focusOutlineColor={'purple.1000'}
                                   placeholderTextColor={'black.1000'}
                                   onChangeText={onChange}
                                   value={value}
                                   style={{fontSize: 14}}
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
        ) : (
                <BaseInput placeholder={placeholder} size={size} variant={variant} type={type}

                           clearButtonMode={clearButtonMode}
                           focusOutlineColor={'purple.1000'}
                           placeholderTextColor={'gray.1000'}
                           style={{fontSize: 14}}
                           {...props}
                />
        )


    )
}

export default Input;
