import React from "react";
import Picker, {DatePickerProps} from 'react-native-date-picker'
import {IInputProps, useDisclose} from "native-base";
import {Control, Controller} from "react-hook-form";
import {Input as BaseInput} from "native-base";

interface IDatePicker extends DatePickerProps {
    control: Control;
    name: string;
    inputProps: IInputProps
}

const InputDatePicker: React.FC<IDatePicker> = ({
                                                    onConfirm,
                                                    onCancel,
                                                    control,
                                                    name,
    inputProps
                                                }) => {

    const {isOpen, onOpen, onClose} = useDisclose()

    return (
        <Controller name={name} control={control} render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
                <BaseInput placeholder={inputProps?.placeholder}
                           size={inputProps?.size ?? 'xl'}
                           variant={inputProps?.variant ?? 'underlined'}
                           type={inputProps?.type}
                           focusOutlineColor={'purple.1000'}
                           placeholderTextColor={'black.1000'}
                           style={{fontSize: 14}}
                           {...inputProps}
                            onTouchStart={onOpen}
                />

                <Picker
                    modal
                    mode='datetime'
                    locale={"pt-BR"}
                    androidVariant={"iosClone"}
                    title={'Selecione uma data'}
                    open={true}
                    date={new Date()}
                    display="inline"
                    onConfirm={(date) => {
                        onOpen()
                        onChange(date)
                    }}
                    onCancel={() => {
                        onClose()
                    }}
                />
            </>

        )}/>)
}

export default InputDatePicker
