import React, {useContext, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import global from '../../../../common/global';

import Modal from 'react-native-modal';
import {Image, ScrollView} from 'react-native';
import {Text} from '../../../screens/entrance/EntranceOption/styled';
import {WrittenTutorialText} from './styled';
import Loading from '../Loading';

const CollapsableList = ({items, categoryName}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState({
    state: false,
    item: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const openItem = item => {
    setIsLoading(true);
    setTimeout(() => {
      setModalState({state: true, item: item});
      setIsLoading(false);
    }, 3000);
  };

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContent>
          <S.HeaderText>{categoryName}</S.HeaderText>
          <S.CollapsableButtonContent>
            <S.CollapsableButton onPress={() => setIsOpen(!isOpen)}>
              <Icon name={'chevron-down'} size={20} />
            </S.CollapsableButton>
          </S.CollapsableButtonContent>
        </S.HeaderContent>
        {isOpen &&
          items.map(item => (
            <S.ItemContent key={item.url} onPress={() => openItem(item)}>
              <S.ItemContentText>{item.name}</S.ItemContentText>
            </S.ItemContent>
          ))}
      </S.Content>
      <ItemModal
        modalState={modalState}
        closeModal={() => setModalState({state: false, item: {}})}
      />
      <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />
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
            <S.VideoTitle>{modalState.item.name}</S.VideoTitle>
            <S.WrittenTutorialContent>
              <S.WrittenTutorialText>
                {modalState.item.description}
              </S.WrittenTutorialText>
            </S.WrittenTutorialContent>

            <S.VideoContent>
              <Image
                source={{uri: modalState.item.url}}
                style={{
                  width: 250,
                  height: 480,
                  borderRadius: 10,
                  overlayColor: 'white',
                  marginBottom: 20,
                }}
              />
            </S.VideoContent>
          </S.ItemInformation>
        </S.ModalContent>
      </Modal>
    </S.ModalContainer>
  );
};
