import Dialog from "@components/dialogs/Dialog";
import React, {useState} from "react";
import DatePicker from 'react-native-modern-datepicker';
import {application} from "@common/typograph";

export interface IDatePickerModal {
    isOpen?: boolean,
    onClose?: () => void;
    onChange?: (date: string) => void;
    selected?: string,
    mode: 'datepicker' | 'calendar' | 'monthYear' | 'time'
}

const DatePickerModal = ({onChange, onClose, isOpen, mode}) => {
    const [date, setDate] = useState();

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title={application.SELECT_DATE} buttons={[]}>
            <DatePicker
                onSelectedChange={date => {
                    onChange(date);
                    onClose();
                    setDate(date)
                }}
                mode={mode}
            />
        </Dialog>
    )
}

export default DatePickerModal;
