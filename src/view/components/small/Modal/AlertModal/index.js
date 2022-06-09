import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as S from "./styled";
import Colors from "../../../../../common/style/Colors";

const AlertModal = ({
                        title,
                        errors,
                        onClose,
                    }) => {


    return (
        <S.Content>
            <S.HeaderContent>
                <S.HeaderTitle>{title}</S.HeaderTitle>
                <S.HeaderDescription>
                    Tivemos alguns problemas com:
                </S.HeaderDescription>
            </S.HeaderContent>
            <S.BodyContent>
                {errors && (
                    errors?.map((error, index) => (
                        <S.BodyError key={index}>
                            <Icon name={"exclamation-triangle"}
                                  size={20}
                                  style={{ marginRight: 10}}
                                  color={Colors.PURPLE} />
                            <S.BodyText>{error.message}</S.BodyText>
                        </S.BodyError>
                    )))}

            </S.BodyContent>
            <S.FooterContent>
                {onClose && (
                    <S.Button onPress={() => onClose()}>
                        <S.ButtonText>
                            Fechar
                        </S.ButtonText>
                    </S.Button>
                )}
            </S.FooterContent>
        </S.Content>
    );
};

export default AlertModal;


