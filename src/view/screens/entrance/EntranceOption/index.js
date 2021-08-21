import React, {Component, useContext, useEffect} from 'react';
import * as S from './styled';
// import Icon from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import SalooniLogo from '../../../../assets/icone11-backgroundwhite.png';
import OwnerIcon from '../../../../assets/icone_proprietario_branco.png';
import PartnerIcon from '../../../../assets/icone_parceiro_branco.png';
import {ProcedureContext} from '../../../../contexts/Procedure/ProcedureContext';
import {PartnerContext} from '../../../../contexts/Partner/PartnerContext';
import {UserContext} from '../../../../contexts/User/UserContext';

export const EntranceOption = () => {
  const {cleanProceduresInformation} = useContext(ProcedureContext);
  const {cleanPartnersInformation} = useContext(PartnerContext);
  const {cleanOwnerInformation} = useContext(UserContext);
  const navigate = useNavigation();

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.SalooniLogo source={SalooniLogo} />
          <S.HeaderText>Olá, você é um?</S.HeaderText>
        </S.Header>
        <S.OwnerContent
          onPress={() => {
            navigate.navigate('SignInOwner', {isOwner: true});
            cleanProceduresInformation();
            cleanOwnerInformation();
            cleanPartnersInformation();
          }}>
          <S.OwnerImage source={OwnerIcon} />
        </S.OwnerContent>
        <S.PartnerContent
          onPress={() => navigate.navigate('SignInPartner', {isOwner: false})}>
          <S.PartnerImage source={PartnerIcon} />
        </S.PartnerContent>
      </S.Content>
    </S.Container>
  );
};
