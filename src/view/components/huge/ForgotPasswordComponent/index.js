import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Button from '../../small/Button';
import Input from '../../small/Input';
import * as S from './styled';
import Parse from 'parse/react-native';
import { Alert } from "react-native";
import Colors from "../../../../common/style/Colors";

export const ForgotPassword = ({ isVisible, handleModal, emailFromLogin }) => {
    const [email, setEmail] = useState(emailFromLogin)
    const [isShowingAlertModal, setIsShowingAlertModal] = useState(isShowingAlertModal)

    const handleChange = (text) => {
        setEmail(
            text
        );
    };

    const onConfirm = async () => {
        try {
            await Parse.User.requestPasswordReset(email);
            Alert.alert(
            "Maravilha!",
            "Em poucos minutos você receberá um e-mail em sua caixa de entrada!",
            [
                {
                    text: "Obrigado!", onPress: () => handleModal()
                }
            ])

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Modal
                isVisible={isVisible}
                style={{
                    margin: 0,
                }}
                onBackButtonPress={handleModal}
                onBackdropPress={handleModal}
                onRequestClose={handleModal}>
                <S.Container>
                    <S.Description>
                        Digite seu e-mail a baixo e logo você receberá mais instruções para recuperar sua senha.
                    </S.Description>
                    <Input
                        handleChange={handleChange}
                        name={'name'}
                        placeholder={'E-mail'}
                        value={email}
                        width={'80%'}
                        keyboard={'email-address'}
                        isSecureTextEntry={false}
                        fontSize={44}
                        disabled={false}
                        isToValidate={true}
                        noEmpty={true}
                        color={Colors.PURPLE}
                        label={'E-mail*'}
                    />
                    <S.ButtonsContainer></S.ButtonsContainer>
                    <Button
                        disabled={false}
                        onPress={onConfirm}
                        text={"Enviar"}
                        width={"120px"}
                        height={"35px"}
                        fontSize={"17px"}
                        color={Colors.PURPLE}
                        textColor={Colors.LIGHT_GREY}
                        backgroundColor={Colors.PURPLE} />
                </S.Container>

            </Modal>
        </>
    )
}

