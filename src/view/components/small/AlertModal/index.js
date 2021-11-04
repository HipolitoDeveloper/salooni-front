import React from 'react';

import * as S from './styled';
import Modal from 'react-native-modal';
import {OkButtonText} from './styled';

const AlertModal = ({isVisible, title, text, onClose, onOk, cancelTitle}) => {
  return (
    <S.Container>
      <Modal
        onRequestClose={onClose}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        isVisible={isVisible}>
        <S.Content>
          <S.HeaderContent>
            <S.HeaderTitle>{title}</S.HeaderTitle>
          </S.HeaderContent>
          <S.BodyContent>
            <S.BodyText>{text}</S.BodyText>
          </S.BodyContent>
          <S.FooterContent>
            {onOk && (
              <S.OkButton onPress={() => onOk()}>
                <S.OkButtonText>SIM</S.OkButtonText>
              </S.OkButton>
            )}
            {onClose && (
              <S.Button onPress={() => onClose()}>
                <S.ButtonText>
                  {cancelTitle ? cancelTitle : 'Fechar'}
                </S.ButtonText>
              </S.Button>
            )}
          </S.FooterContent>
        </S.Content>
      </Modal>
    </S.Container>
  );
};

export default AlertModal;
