import React, {useEffect, useState} from 'react';
import * as S from './styled';
import RoundedTimes from '../../../../../assets/svg/roundedTimesSVG.svg';
import Confirm from '../../../../../assets/svg/confirmSVG.svg';
import Salooni from '../../../../../assets/svg/salooniSVG.svg';

const RegisterHeader = ({
  color,
  headerTitle,
  isEditing,
  onConfirm,
  onCancel,
}) => {
  return (
    <S.Container headerColor={color}>
      <S.Content>
        <S.CancelButton onPress={onCancel}>
          <RoundedTimes
            fill={'white'}
            borderFill={color}
            width={35}
            height={35}
          />
        </S.CancelButton>
        <Salooni fill={color} borderFill={'white'} width={60} height={60} />
        <S.ConfirmButton
          disabled={isEditing}
          isEditing={isEditing}
          onPress={onConfirm}>
          <Confirm fill={color} borderFill={'white'} width={35} height={35} />
        </S.ConfirmButton>
      </S.Content>
      <S.HeaderTitleContent>
        <S.HeaderTitle headerColor={color}>{headerTitle}</S.HeaderTitle>
      </S.HeaderTitleContent>
      <S.HeaderLine headerColor={color} />
    </S.Container>
  );
};

export default RegisterHeader;
