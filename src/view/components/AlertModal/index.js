import React from 'react';

import * as S from './styled';
import {Modal} from 'react-native';

const AlertModal = ({isVisible, title, text, onClose, onOk}) => {
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
            {onOk && (
              <S.Button onPress={() => onOk()}>
                <S.ButtonText>SIM</S.ButtonText>
              </S.Button>
            )}
            <S.Button onPress={() => onClose()}>
              <S.ButtonText>Fechar</S.ButtonText>
            </S.Button>
          </S.FooterContent>
        </S.Content>
      </Modal>
    </S.Container>
  );
};

export default AlertModal;
