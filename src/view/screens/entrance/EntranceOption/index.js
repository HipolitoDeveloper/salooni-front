import React, {Component, useContext, useEffect} from 'react';
import * as S from './styled';
// import Icon from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import SalooniLogo from '../../../../assets/icone11-backgroundwhite.png';
import OwnerIcon from '../../../../assets/icone_proprietario_branco.png';
import PartnerIcon from '../../../../assets/icone_parceiro_branco.png';

export const EntranceOption = () => {
  const navigate = useNavigation();

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.SalooniLogo source={SalooniLogo} />
          <S.HeaderText>Olá, você é um?</S.HeaderText>
        </S.Header>
        <S.OwnerContent
          onPress={() => navigate.push('SignInOwner', {isOwner: true})}>
          <S.OwnerImage source={OwnerIcon} />
        </S.OwnerContent>
        <S.PartnerContent
          onPress={() => navigate.push('SignInPartner', {isOwner: false})}>
          <S.PartnerImage source={PartnerIcon} />
        </S.PartnerContent>
      </S.Content>
    </S.Container>
  );
};
