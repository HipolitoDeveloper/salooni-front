import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from "@react-navigation/native";
import {useLayout} from "../../../../hooks/Layout";

const Notification = ({message, page, route}) => {
    const {handleNotification} = useLayout()
    const {navigate} = useNavigation()
    const navigateTo = () => {
        const pages = {
            "UnconfirmedSchedules": () => {
                // console.log("navigate", navigate())
                // console.log("route", route)

                navigate('ApplicationStack', {
                    screen: 'UnconfirmedSchedules',
                })
            }
        }

        pages[page]()
    }

    return (
        <S.Container>
            <S.Content>
                <S.NotificationMessage
                    onPress={navigateTo}>
                    <S.NotificationText>
                        {message}
                    </S.NotificationText>
                </S.NotificationMessage>
                <S.CloseButton onPress={() => handleNotification(false)}>
                    <Icon style={{padding: 6}} name={'times'} size={12} color={'white'}/>
                </S.CloseButton>
            </S.Content>
        </S.Container>
    )
};

export default Notification;
