import * as S from '../CollapsableList/styled';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import global from '../../../../common/global';
import React from 'react';

const InformationModal = ({modalState, closeModal, children}) => {
  return (
    <S.ModalContainer>
      <Modal
        isVisible={modalState.state}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <S.ModalContent>
          <S.CloseButtonContent>
            <S.CloseButton onPress={closeModal}>
              <Icon
                name={'times'}
                color={global.colors.lightGreyColor}
                size={24}
              />
            </S.CloseButton>
          </S.CloseButtonContent>
          {children}
        </S.ModalContent>
      </Modal>
    </S.ModalContainer>
  );
};

export default InformationModal;
