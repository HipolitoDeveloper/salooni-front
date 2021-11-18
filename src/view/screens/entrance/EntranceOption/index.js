import React, {Component, useContext, useEffect} from 'react';
import * as S from './styled';
// import Icon from 'react-native-vector-icons/FontAwesome';
import global from '../../../../common/global';

import {useNavigation} from '@react-navigation/native';
import SalooniLogo from '../../../../assets/icone11-backgroundwhite.png';
import OwnerIcon from '../../../../assets/svg/ownerSVG.svg';
import PartnerIcon from '../../../../assets/svg/partnerSVG.svg';
import {ProcedureContext} from '../../../../contexts/Procedure/ProcedureContext';
import {PartnerContext} from '../../../../contexts/Partner/PartnerContext';
import {UserContext} from '../../../../contexts/User/UserContext';
import {Dimensions} from 'react-native';

export const EntranceOption = () => {
  const {cleanProceduresInformation} = useContext(ProcedureContext);
  const {cleanPartnersInformation} = useContext(PartnerContext);
  const {cleanOwnerInformation, owner} = useContext(UserContext);
  const navigate = useNavigation();

  const svgHeight = Dimensions.get('screen').height;
  const svgWidth = Dimensions.get('screen').width;

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.SalooniLogo source={SalooniLogo} />
          <S.HeaderText>Olá, você é um?</S.HeaderText>
        </S.Header>
        <S.OwnerContent
          onPress={() => {
            navigate.navigate('SignInOwner');
            cleanProceduresInformation();
            cleanOwnerInformation();
            cleanPartnersInformation();
          }}>
          <OwnerIcon
            fill={global.colors.purpleColor}
            borderFill={global.colors.lightGreyColor}
            width={svgWidth / 2}
            height={svgHeight / 5}
          />
          <S.Text>Proprietário</S.Text>
        </S.OwnerContent>
        <S.PartnerContent onPress={() => navigate.navigate('SignInPartner')}>
          <PartnerIcon
            fill={global.colors.purpleColor}
            borderFill={global.colors.lightGreyColor}
            width={svgWidth / 2}
            height={svgHeight / 5}
          />
          <S.Text>Parceiro</S.Text>
        </S.PartnerContent>
      </S.Content>
    </S.Container>
  );
};
