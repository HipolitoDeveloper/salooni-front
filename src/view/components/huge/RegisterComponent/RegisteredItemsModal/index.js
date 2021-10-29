import React, {useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList, View, Text} from 'react-native';
import global from '../../../../../common/global';
import Modal from 'react-native-modal';

const RegisteredItemsModal = ({
  color,
  items,
  rightInformation,
  leftInformation,
  isOpened,
  handleOpening,
  deletePreRegisteredItem,
  handleSelect,
}) => {
  return (
    <S.Wrapper>
      {!isOpened && (
        <S.CloseButtonContent onPress={handleOpening}>
          <S.CloseButton color={color}>
            <Icon
              name={'arrow-up'}
              color={global.colors.lightGreyColor}
              size={30}
            />
          </S.CloseButton>
        </S.CloseButtonContent>
      )}
      <Modal
        scrollHorizontal={true}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        onBackButtonPress={handleOpening}
        isVisible={isOpened}
        onBackdropPress={handleOpening}
        onRequestClose={handleOpening}>
        <S.Container>
          {isOpened && (
            <S.CloseButtonContent onPress={handleOpening}>
              <S.CloseButton color={color}>
                <Icon
                  name={'arrow-down'}
                  color={global.colors.lightGreyColor}
                  size={30}
                />
              </S.CloseButton>
            </S.CloseButtonContent>
          )}
          <S.Content color={color}>
            {items.map((item, index) => (
              <S.ItemContent key={item.name}>
                <S.RightItemContent onPress={() => handleSelect(item, index)}>
                  <S.ItemName isEditing={item.isInView}>
                    {leftInformation
                      ? item[`${leftInformation}`].name
                      : item.name}
                  </S.ItemName>
                  <S.ItemDeleteButton
                    onPress={() => deletePreRegisteredItem(item)}>
                    <Icon name={'trash'} color={'black'} size={14} />
                  </S.ItemDeleteButton>
                </S.RightItemContent>
                {rightInformation === 'procedures' ? (
                  <FlatList
                    horizontal={true}
                    data={item.procedures}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                      <S.ItemProcedures key={item.name}>
                        <S.ItemProcedureName color={color}>
                          {item.name}
                        </S.ItemProcedureName>
                      </S.ItemProcedures>
                    )}
                  />
                ) : (
                  <S.ItemInformation>
                    {item[`${rightInformation}`]}
                  </S.ItemInformation>
                )}
              </S.ItemContent>
            ))}
          </S.Content>
        </S.Container>
      </Modal>
    </S.Wrapper>
  );
};

export default RegisteredItemsModal;
