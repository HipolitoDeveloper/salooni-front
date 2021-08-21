import React from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const Header = ({headerTitle, headerColor}) => {
  const navigation = useNavigation();

  const openSideMenu = () => {
    navigation.openDrawer();
  };

  return (
    <S.Container>
      <S.Content>
        <S.MenuButtonContent onPress={openSideMenu}>
          <Icon name="menu" size={30} color={headerColor} />
        </S.MenuButtonContent>
        <S.TitleName headerColor={headerColor}>{headerTitle}</S.TitleName>
      </S.Content>
    </S.Container>
  );
};

export default Header;
