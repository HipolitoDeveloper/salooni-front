import React, {useContext, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import global from '../../../../common/global';

import Modal from 'react-native-modal';
import {ScrollView} from 'react-native';

const CollapsableList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState({
    state: false,
    item: {},
  });

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContent>
          <S.HeaderText>Procedimentos</S.HeaderText>
          <S.CollapsableButtonContent>
            <S.CollapsableButton onPress={() => setIsOpen(!isOpen)}>
              <Icon name={'chevron-down'} size={20} />
            </S.CollapsableButton>
          </S.CollapsableButtonContent>
        </S.HeaderContent>
        {isOpen && (
          <>
            <S.ItemContent onPress={() => setModalState({state: true})}>
              <S.ItemContentText>Testeeeee</S.ItemContentText>
            </S.ItemContent>
            <S.ItemContent>
              <S.ItemContentText>Testeeeee</S.ItemContentText>
            </S.ItemContent>
            <S.ItemContent>
              <S.ItemContentText>Testeeeee</S.ItemContentText>
            </S.ItemContent>
            <S.ItemContent>
              <S.ItemContentText>Testeeeee</S.ItemContentText>
            </S.ItemContent>
          </>
        )}
      </S.Content>
      <ItemModal
        modalState={modalState}
        closeModal={() => setModalState({state: false, item: {}})}
      />
    </S.Container>
  );
};

export default CollapsableList;

const ItemModal = ({modalState, closeModal}) => {
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
          <S.ItemInformation>
            <S.VideoContent></S.VideoContent>
            <S.WrittenTutorialContent></S.WrittenTutorialContent>
          </S.ItemInformation>
        </S.ModalContent>
      </Modal>
    </S.ModalContainer>
  );
};
