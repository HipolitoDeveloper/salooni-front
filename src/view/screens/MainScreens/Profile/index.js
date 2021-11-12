import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import {Text} from '../../../components/small/InputModal/styled';
import {
  BodyContent,
  Container,
  FooterContainer,
  FooterContent,
  ProcedureContent,
} from './styled';
import Input from '../../../components/small/Input';
import {UserContext} from '../../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import global from '../../../../common/global';
import Button from '../../../components/small/Button';
import Times from '../../../../assets/svg/timesSVG.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import errorMessages from '../../../../common/errorMessages';
import {
  CNPJVerifier,
  CPFVerifier,
  EMAILVerifier,
  TELVerifier,
} from '../../../components/small/Input/verifier';
import ErrorMessage from '../../../components/small/ErrorMessage';
import Loading from '../../../components/small/Loading';

const Profile = () => {
  const {currentUser, updateProfile} = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [isEditting, setIsEditting] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigation();

  navigate.addListener('focus', () => {
    setProfile(currentUser);
  });

  const handleChange = (text, name) => {
    setIsEditting(true);
    setProfile({
      ...profile,
      [name]: text,
    });
  };

  const cancelEditting = () => {
    setIsEditting(false);
  };

  const updateInformation = () => {
    setIsLoading(true);
    updateProfile(profile).then(
      () => {
        cancelEditting();
        setIsLoading(false);
      },
      error => {
        console.error(error);
        setIsLoading(false);
      },
    );
  };

  const verifyInformation = showErrorMessages => {
    let ableToGo = true;
    let errorMessage = '';

    if (
      profile === {} ||
      profile.userName === undefined ||
      profile.userName === '' ||
      profile.salonName === undefined ||
      profile.salonName === '' ||
      profile.cnpj === undefined ||
      profile.cnpj === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessages.profileMessage;
      setIsLoading(false);
    } else {
      if (!CNPJVerifier(profile.cnpj).state) {
        ableToGo = false;
        errorMessage = errorMessages.invalidCPF;
        setIsLoading(false);
      }
    }

    if (showErrorMessages) setErrorMessage(errorMessage);
    return ableToGo;
  };

  return (
    <S.Container>
      <S.BodyContent>
        {errorMessage !== '' && (
          <ErrorMessage
            text={errorMessage}
            width={'70%'}
            textColor={global.colors.purpleColor}
          />
        )}
        <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />
        <S.ProcedureContent>
          <Button
            disabled={false}
            marginBottom={'20px'}
            onPress={() =>
              navigate.navigate('ApplicationStack', {screen: 'Procedures'})
            }
            color={global.colors.purpleColor}
            text={'Procedimentos'}
            width={'180px'}
            height={'50px'}
            fontSize={'17px'}
            textColor={global.colors.backgroundColor}
            backgroundColor={global.colors.purpleColor}
            leftContent={{
              show: true,
              height: '20px',
              width: '20px',
              icon: 'brush',
              iconColor: 'black',
              backgroundColor: `${global.colors.backgroundColor}`,
              borderRadius: '20px',
              iconSize: 13,
            }}
          />
        </S.ProcedureContent>
        <Input
          handleChange={handleChange}
          name={'userName'}
          placeholder={'Nome do Usuário'}
          value={profile.userName}
          width={'80%'}
          keyboard={'default'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={false}
          color={global.colors.purpleColor}
          label={'Nome do Usuário'}
          isToValidate={true}
          noEmpty={true}
        />

        <Input
          handleChange={handleChange}
          name={'salonName'}
          placeholder={'Salão*'}
          value={profile.salonName}
          width={'80%'}
          keyboard={'default'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={false}
          color={global.colors.purpleColor}
          label={'Nome do Salão'}
          isToValidate={true}
          noEmpty={true}
        />

        <Input
          handleChange={handleChange}
          name={'cnpj'}
          placeholder={'CNPJ*'}
          value={profile.cnpj}
          width={'80%'}
          keyboard={'numeric'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={false}
          mask={'cnpj'}
          color={global.colors.purpleColor}
          label={'CNPJ'}
          isToValidate={true}
          noEmpty={true}
        />

        <Input
          handleChange={handleChange}
          name={'email'}
          placeholder={'E-mail*'}
          value={profile.email}
          width={'80%'}
          keyboard={'email-address'}
          isSecureTextEntry={false}
          fontSize={14}
          disabled={true}
          editable={false}
          mask={'email'}
          color={global.colors.purpleColor}
          label={'E-mail'}
        />

        {/*<Input*/}
        {/*  handleChange={handleChange}*/}
        {/*  name={'password'}*/}
        {/*  placeholder={'Senha*'}*/}
        {/*  value={profile.password}*/}
        {/*  width={'80%'}*/}
        {/*  keyboard={'default'}*/}
        {/*  isSecureTextEntry={true}*/}
        {/*  fontSize={14}*/}
        {/*  disabled={true}*/}
        {/*  editable={false}*/}
        {/*  mask={'password'}*/}
        {/*  color={global.colors.purpleColor}*/}
        {/*  label={'Senha'}*/}
        {/*/>*/}
      </S.BodyContent>
      <S.FooterContainer>
        {isEditting && (
          <S.FooterContent>
            <Button
              marginBottom={'20px'}
              onPress={updateInformation}
              color={global.colors.backgroundColor}
              text={'Atualizar'}
              width={'150px'}
              height={'40px'}
              fontSize={'20px'}
              textColor={global.colors.backgroundColor}
              backgroundColor={global.colors.purpleColor}
              leftContent={{
                show: true,
                height: '20px',
                width: '20px',
                icon: 'pen',
                iconColor: 'black',
                backgroundColor: `${global.colors.backgroundColor}`,
                borderRadius: '20px',
                iconSize: 13,
              }}
              disabled={() => verifyInformation(false)}
            />
            <S.CancelButton onPress={cancelEditting}>
              <Times
                fill={'black'}
                borderFill={'black'}
                width={15}
                height={15}
              />
            </S.CancelButton>
          </S.FooterContent>
        )}
      </S.FooterContainer>
    </S.Container>
  );
};

export default Profile;
