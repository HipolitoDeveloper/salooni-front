import React from 'react';
import * as S from './styled';
import RoundedTimes from '../../../../../assets/svg/roundedTimesSVG.svg';
import Confirm from '../../../../../assets/svg/confirmSVG.svg';
import Salooni from '../../../../../assets/svg/salooniSVG.svg';
import {ButtonText} from './styled';
import {Dimensions} from 'react-native';

const RegisterHeader = ({
  color,
  headerTitle,
  isPreRegisteredEditing,
  onConfirm,
  onCancel,
  isEditing,
  validForm,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const isSmallerScreen = screenHeight < 650;

  return (
    <S.Container headerColor={color}>
      <S.Content>
        <S.ButtonContent>
          <S.CancelButton onPress={onCancel}>
            <RoundedTimes
              fill={'white'}
              borderFill={color}
              width={screenHeight / 25}
              height={screenHeight / 25}
            />
          </S.CancelButton>
          <S.ButtonText>Voltar</S.ButtonText>
        </S.ButtonContent>
        <Salooni
          fill={color}
          borderFill={'white'}
          width={screenHeight / 15}
          height={screenHeight / 15}
        />
        <S.ButtonContent>
          <S.ConfirmButton
            disabled={isPreRegisteredEditing}
            isEditing={isPreRegisteredEditing}
            onPress={onConfirm}>
            <Confirm
              fill={color}
              borderFill={'white'}
              width={screenHeight / 25}
              height={screenHeight / 25}
            />
          </S.ConfirmButton>
          <S.ButtonText>{isEditing ? 'Editar' : 'Adicionar'}</S.ButtonText>
        </S.ButtonContent>
      </S.Content>
      <S.HeaderTitleContent>
        <S.HeaderTitle screenHeight={screenHeight} headerColor={color}>
          {headerTitle}
        </S.HeaderTitle>
      </S.HeaderTitleContent>
      <S.HeaderLine screenHeight={screenHeight} headerColor={color} />
    </S.Container>
  );
};

export default RegisterHeader;
