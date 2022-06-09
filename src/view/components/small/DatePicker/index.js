import React, {useState} from 'react'
import Picker from 'react-native-date-picker'
import * as S from "./styled";
import {InputTitle} from "../Input/styled";
import Icon from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import Warning from "../Warning";
import {Dimensions, Text} from "react-native";
import {currentDate} from "../../../../factory/ScheduleFactory";

const DatePicker = ({color, onChange, value, error, label, icon, width, placeholder, fontSize, mode}) => {
    const [date, setDate] = useState(currentDate)
    const [open, setOpen] = useState(false)
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;

    return (
        <>
            <S.DateTextContainer onPress={() => setOpen(true)} width={width}>
                {label && (
                    <InputTitle
                        style={{marginLeft: !!icon ? 35: 0, marginBottom: -1030}}
                        color={color}
                        screenHeight={screenHeight}>
                        {label}
                    </InputTitle>
                )}
                {!!error && (
                    // <Text>
                    //   {error.message}
                    // </Text>
                    <Warning
                        right={`${screenWidth / 1.35}px`}
                        bottom={"20px"}
                        color={color}
                        size={15}
                    />
                )}

                <S.DateTextContent>
                    {icon && (
                        <S.IconContainer>
                            <Icon
                                name={"calendar-alt"}
                                size={30}
                                color={color}
                            />

                        </S.IconContainer>
                    )}

                    <S.DateText fontSize={screenHeight / fontSize} color={color}  hasIcon={!!icon}>
                        {value
                        ?  (moment(value).format(mode === 'date' ? "DD/MM/YYYY" : "DD/MM/YYYY HH:mm"))
                        : (<Text style={{color: "grey"}}>{placeholder}</Text>)}
                    </S.DateText>
                </S.DateTextContent>
            </S.DateTextContainer>
            <Picker
                mode={mode}
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
                title={"Selecione um horário"}
            />
        </>
    )
}

export default DatePicker
