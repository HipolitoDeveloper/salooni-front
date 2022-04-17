import React from "react";

import * as S from "./styled";

const AlertModal = ({
                        title,
                        errors,
                        onClose,
                    }) => {

    return (
        <S.Content>
            <S.HeaderContent>
                <S.HeaderTitle>{title}</S.HeaderTitle>
            </S.HeaderContent>
            <S.BodyContent>
                {typeof errors === "string"
                    ? (
                        <S.BodyText>{errors}</S.BodyText>
                    )
                    : (
                        errors?.map(error => (
                            <S.BodyText>{error.message}</S.BodyText>
                        ))
                    )
                }
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


