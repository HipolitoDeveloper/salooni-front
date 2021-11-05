import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import {Text} from '../../../components/small/InputModal/styled';
import {BodyContent, Container, FooterContainer, FooterContent} from './styled';
import Input from '../../../components/small/Input';
import {UserContext} from '../../../../contexts/User/UserContext';
import {useNavigation} from '@react-navigation/native';
import global from '../../../../common/global';
import Button from '../../../components/small/Button';
import Times from '../../../../assets/svg/timesSVG.svg';

const Profile = () => {
  const {currentUser, updateProfile} = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [isEditting, setIsEditting] = useState(false);

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
    setProfile(currentUser);
  };

  return (
    <S.Container>
      <S.BodyContent>
        <Input
          handleChange={handleChange}
          name={'userName'}
          placeholder={'Nome*'}
          value={profile.userName}
          width={'80%'}
          keyboard={'default'}
          isSecureTextEntry={false}
          fontSize={18}
          disabled={false}
        />

        <Input
          handleChange={handleChange}
          name={'salonName'}
          placeholder={'Salão*'}
          value={profile.salonName}
          width={'80%'}
          keyboard={'default'}
          isSecureTextEntry={false}
          fontSize={18}
          disabled={false}
        />

        <Input
          handleChange={handleChange}
          name={'cnpj'}
          placeholder={'CNPJ*'}
          value={profile.cnpj}
          width={'80%'}
          keyboard={'numeric'}
          isSecureTextEntry={false}
          fontSize={18}
          disabled={false}
          mask={'cnpj'}
        />

        <Input
          handleChange={handleChange}
          name={'email'}
          placeholder={'E-mail*'}
          value={profile.email}
          width={'80%'}
          keyboard={'email-address'}
          isSecureTextEntry={false}
          fontSize={18}
          disabled={false}
          mask={'email'}
        />

        <Input
          handleChange={handleChange}
          name={'password'}
          placeholder={'Senha*'}
          value={profile.password}
          width={'80%'}
          keyboard={'default'}
          isSecureTextEntry={true}
          fontSize={18}
          disabled={false}
          mask={'password'}
        />
      </S.BodyContent>
      <S.FooterContainer>
        {isEditting && (
          <S.FooterContent>
            <Button
              marginBottom={'20px'}
              onPress={() => {
                updateProfile(profile);
                cancelEditting();
              }}
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
