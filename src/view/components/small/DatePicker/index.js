import React, {useState} from 'react'
import Picker from 'react-native-date-picker'
import * as S from "./styled";
import {InputTitle} from "../Input/styled";
import Icon from "react-native-vector-icons/FontAwesome5";
import moment from "moment";

const DatePicker = ({screenHeight, color, onChange, value}) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <>
            <S.DateTextContainer onPress={() => setOpen(true)}>
                <InputTitle
                    color={color}
                    screenHeight={screenHeight}>
                    Data de Agendamento*
                </InputTitle>
                <S.DateTextContent>
                    <S.IconContainer>
                        <Icon
                            name={"calendar-alt"}
                            size={30}
                            color={color}
                        />
                    </S.IconContainer>
                    <S.DateText>
                        {moment(value).format("DD/MM/YYYY HH:mm")}
                    </S.DateText>
                </S.DateTextContent>
            </S.DateTextContainer>
            <Picker
                modal
                open={open}
                date={date}
                androidVariant={"iosClone"}
                locale={"pt-BR"}
                onConfirm={(date) => {
                    setOpen(false)
                    onChange(date)
                    // setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                title={"Selecione uma data"}
            />
        </>
    )
}

export default DatePicker
