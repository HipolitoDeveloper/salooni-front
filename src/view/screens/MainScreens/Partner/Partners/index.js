import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, Text} from 'react-native';
import global from '../../../../../common/global';
import Header from '../../../../components/Header';
import * as S from './styled';
import ActionButton from 'react-native-circular-action-menu';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import {PartnerContext} from '../../../../../contexts/Partner/PartnerContext';
const Partners = () => {
  const {loadAllPartners, partners} = useContext(PartnerContext);

  const {doLogout, currentUser} = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigation();

  useEffect(() => {
    setLoading(true);
    const getAllPartners = async () => {
      await loadAllPartners(currentUser.idSalon).then(
        () => setLoading(false),
        error => {
          console.log(error);
          setLoading(false);
        },
      );
      setLoading(false);
    };
    getAllPartners();
  }, []);

  const loadPartners = partners.map((partner, index) => (
    <S.BoxContainer key={index}>
      <S.BoxContent>
        <S.BoxLabel>Nome</S.BoxLabel>
        <S.BoxText>{partner.Nome}</S.BoxText>
      </S.BoxContent>
      <S.BoxContent>
        <S.BoxLabel>Telefone</S.BoxLabel>
        <S.BoxText>{partner.Telefone}</S.BoxText>
      </S.BoxContent>
      <S.DetailsContent>
        <S.DetailsButton
          onPress={() => {
            navigate.push('ApplicationStack', {
              screen: 'PartnerRegister',
              params: {partner: partner},
            });
          }}>
          <S.DetailsButtonText>Detalhes</S.DetailsButtonText>
        </S.DetailsButton>
      </S.DetailsContent>
    </S.BoxContainer>
  ));

  return (
    <S.Container>
      <S.Content>
        <Header
          headerColor={global.colors.lightBlueColor}
          headerTitle={'Parceiros'}
        />

        {loading && (
          <S.LoadingContent>
            <ActivityIndicator size="large" color={global.colors.blueColor} />
          </S.LoadingContent>
        )}
        <S.BodyContent
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={['transparent']}
              style={{backgroundColor: 'transparent'}}
              refreshing={isRefreshing}
              onRefresh={() => loadAllPartners(currentUser.idSalon)}
            />
          }>
          {loadPartners}
        </S.BodyContent>
        <S.FooterContent>
          <S.ActionButtonContainer>
            <ActionButton
              buttonColor={`${global.colors.lightBlueColor}`}
              onPress={() => {
                navigate.push('ApplicationStack', {
                  screen: 'PartnerRegister',
                });
              }}
            />
          </S.ActionButtonContainer>
        </S.FooterContent>
      </S.Content>
    </S.Container>
  );
};

export default Partners;
