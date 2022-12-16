import React from "react";
import {Input as BaseInput, useDisclose} from "native-base";
import {Control, Controller} from "react-hook-form";
import {IInput} from "@components/form/Input";
import DatePickerModal, {IDatePickerModal} from "@components/form/datepicker/DatePickerModal";
import { format } from "date-fns";

interface IDatePicker {
    control: Control;
    name: string;
    inputProps: IInput;
    datePickerModalProps: IDatePickerModal
}

const DatePickerInput: React.FC<IDatePicker> = ({
                                                    control,
                                                    name,
                                                    inputProps,
                                                    datePickerModalProps
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
                           isReadOnly={true}
                           onTouchStart={onOpen}
                           value={format(new Date(value), 'dd/MM/yyyy')}
                           {...inputProps}

                />

                <DatePickerModal onChange={onChange} onClose={onClose} isOpen={isOpen} {...datePickerModalProps} />

            </>
        )}/>)
}

export default DatePickerInput
