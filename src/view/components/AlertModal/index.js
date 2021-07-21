import React from 'react';

import * as S from './styled';
import {Modal} from 'react-native';

const AlertModal = ({isVisible, title, text, onClose}) => {
  return (
    <S.Container>
      <Modal
        visible={isVisible}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => onClose()}>
        <S.Content>
          <S.HeaderContent>
            <S.HeaderTitle>{title}</S.HeaderTitle>
          </S.HeaderContent>
          <S.BodyContent>
            <S.BodyText>{text}</S.BodyText>
          </S.BodyContent>
          <S.FooterContent>
            <S.CloseButton onPress={() => onClose()}>
              <S.CloseButtonText>Fechar</S.CloseButtonText>
            </S.CloseButton>
          </S.FooterContent>
        </S.Content>
      </Modal>
    </S.Container>
  );
};

export default AlertModal;
