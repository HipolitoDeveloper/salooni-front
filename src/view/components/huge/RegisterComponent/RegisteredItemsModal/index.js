import React, {useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList, View, Text, Dimensions} from 'react-native';
import global from '../../../../../common/global';
import Modal from 'react-native-modal';
import Warning from '../../../small/Warning';

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
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const isSmallerScreen = screenHeight < 650;

  return (
    <S.Wrapper>
      {!isOpened && (
        <S.CloseButtonContent onPress={handleOpening}>
          {items.some(item => item.errorProperties?.length > 0) && (
            <Warning
              right={`${screenWidth / 2.6}px`}
              bottom={0}
              color={color}
            />
          )}
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
                  {item.errorProperties?.length > 0 && (
                    <Warning
                      right={`${screenWidth / 4}px`}
                      color={color}
                      size={15}
                    />
                  )}
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
