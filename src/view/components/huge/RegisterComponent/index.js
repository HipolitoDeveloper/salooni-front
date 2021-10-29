import React, {useEffect, useState} from 'react';
import RegisterHeader from './RegisterHeader';
import RegisteredItemsModal from './RegisteredItemsModal';
import * as S from './styled';
import ActionButton from 'react-native-circular-action-menu';
import global from '../../../../common/global';
import FloatButton from '../../small/FloatButton';
import {Platform, TouchableOpacity} from 'react-native';
import {Text} from '../../small/InputModal/styled';
import Times from '../../../../assets/svg/timesSVG.svg';
import {ButtonsContent} from './styled';

const RegisterComponent = ({
  isSigningUp,
  children,
  onCancel,
  color,
  preRegisteredItems,
  handleSelect,
  deletePreRegisteredItem,
  onConfirm,
  isPreRegisteredEditing,
  isEditing,
  onAdd,
  cancelEditing,
  registeredItemRightInformation,
  registeredItemLeftInformation,
  headerTitle,
  showAddButton,
}) => {
  const [isRegisteredItemsBoxOpened, setIsRegisteredItemsBoxOpened] =
    useState(false);

  return (
    <>
      {!isSigningUp && (
        <RegisterHeader
          color={color}
          headerTitle={headerTitle}
          isEditing={isPreRegisteredEditing}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}

      <S.Content behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
        {children}
        {isPreRegisteredEditing && (
          <S.CancelButton color={color} onPress={cancelEditing}>
            <Times
              fill={'#fff'}
              borderFill={`${global.colors.lightGreyColor}`}
              width={10}
              height={10}
            />
          </S.CancelButton>
        )}

        {(showAddButton || !isEditing) && (
          <FloatButton
            bottom={'150px'}
            right={'40px'}
            onPress={onAdd}
            buttonColor={color}
            icon={isPreRegisteredEditing ? 'pen' : 'plus'}
          />
        )}
      </S.Content>

      {!isEditing && (
        <RegisteredItemsModal
          color={color}
          isOpened={isRegisteredItemsBoxOpened}
          handleOpening={() =>
            setIsRegisteredItemsBoxOpened(!isRegisteredItemsBoxOpened)
          }
          deletePreRegisteredItem={deletePreRegisteredItem}
          handleSelect={handleSelect}
          items={preRegisteredItems}
          rightInformation={registeredItemRightInformation}
          leftInformation={registeredItemLeftInformation}
        />
      )}
    </>
  );
};
export default RegisterComponent;
