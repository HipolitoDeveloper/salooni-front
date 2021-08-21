import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, Text} from 'react-native';
import global from '../../../../../common/global';
import Header from '../../../../components/Header';
import * as S from './styled';
import ActionButton from 'react-native-circular-action-menu';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import {ProcedureContext} from '../../../../../contexts/Procedure/ProcedureContext';
import {
  BoxComissionLabel,
  BoxEmployee,
  BoxEmployeeInformation,
  BoxEmployeeName,
  BoxMainInformations,
  BoxName,
  BoxPrice,
  BoxTime,
} from './styled';
const Partners = () => {
  const {loadAllProcedures, procedures} = useContext(ProcedureContext);

  const {doLogout, currentUser} = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigation();

  useEffect(() => {
    setLoading(true);
    const getAllProcedures = async () => {
      await loadAllProcedures(currentUser.idSalon).then(
        () => setLoading(false),
        error => {
          console.log(error);
          setLoading(false);
        },
      );
      setLoading(false);
    };
    getAllProcedures();
  }, []);

  const loadProcedures = procedures?.map((procedure, index) => (
    <S.BoxContainer
      key={index}
      onPress={() => {
        navigate.push('ApplicationStack', {
          screen: 'ProcedureRegister',
          params: {procedure: procedure},
        });
      }}>
      <S.BoxContent>
        <S.BoxMainInformation>
          <S.BoxPrice>
            <S.PrefixBold>R$</S.PrefixBold>
            {procedure.Valor.toString().replace('.', ',')}
          </S.BoxPrice>
          <S.BoxTime>
            <S.PrefixBold>Hr. </S.PrefixBold>
            {procedure.Tempo}
          </S.BoxTime>
        </S.BoxMainInformation>
        <S.BoxText>
          <S.BoxName>{procedure.Nome}</S.BoxName>
        </S.BoxText>
        <S.BoxEmployeeInformation>
          <S.BoxEmployee>Inserido por: </S.BoxEmployee>
          <S.BoxEmployeeName>{procedure.IdFuncFK.Nome}</S.BoxEmployeeName>
          <S.BoxComission>
            {procedure.ComissaoPorcentagem !== 0 ? (
              <>
                <S.BoxComissionLabel>Porcen.</S.BoxComissionLabel>
                <S.BoxComissionText>
                  {' '}
                  %{procedure.ComissaoPorcentagem}
                </S.BoxComissionText>
              </>
            ) : (
              <>
                <S.BoxComissionLabel>Valor Fixo</S.BoxComissionLabel>
                <S.BoxComissionText>
                  {' '}
                  R${procedure.ComissaoValor.toString().replace('.', ',')}
                </S.BoxComissionText>
              </>
            )}
          </S.BoxComission>
        </S.BoxEmployeeInformation>
      </S.BoxContent>
    </S.BoxContainer>
  ));

  return (
    <S.Container>
      <S.Content>
        <Header
          headerColor={global.colors.purpleColor}
          headerTitle={'Procedimentos'}
        />

        {loading && (
          <S.LoadingContent>
            <ActivityIndicator size="large" color={global.colors.purpleColor} />
          </S.LoadingContent>
        )}
        <S.BodyContent
          refreshControl={
            <RefreshControl
              tintColor="transparent"
              colors={['transparent']}
              style={{backgroundColor: 'transparent'}}
              refreshing={isRefreshing}
              onRefresh={() => loadAllProcedures(currentUser.idSalon)}
            />
          }>
          {loadProcedures}
        </S.BodyContent>
        <S.FooterContent>
          <S.ActionButtonContainer>
            <ActionButton
              buttonColor={`${global.colors.purpleColor}`}
              onPress={() => {
                navigate.push('ApplicationStack', {
                  screen: 'ProcedureRegister',
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
