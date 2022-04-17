import React from "react";

import * as S from "./styled";

const ConfirmModal = ({
                      title,
                      text,
                      onClose,
                      onOk,
                      cancelTitle,
                      okTitle,
                    }) => {

  return (
    <S.Content>
          <S.HeaderContent>
            <S.HeaderTitle>{title}</S.HeaderTitle>
          </S.HeaderContent>
          <S.BodyContent>
            <S.BodyText>{text}</S.BodyText>
          </S.BodyContent>
          <S.FooterContent>
            {onOk && (
              <S.OkButton onPress={onOk}>
                <S.OkButtonText> {okTitle ? okTitle : "Sim"}</S.OkButtonText>
              </S.OkButton>
            )}
            {onClose && (
              <S.Button onPress={onClose}>
                <S.ButtonText>
                  {cancelTitle ? cancelTitle : "Fechar"}
                </S.ButtonText>
              </S.Button>
            )}
          </S.FooterContent>
    </S.Content>
  );
};

export default ConfirmModal;


