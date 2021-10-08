import React, {useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
const Header = ({headerTitle, headerColor, handleIsListing, viewType}) => {
  const [scheduleView, setScheduleView] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    setScheduleView(viewType);
  }, []);

  const openSideMenu = () => {
    navigation.openDrawer();
  };

  const handleScheduleView = () => {
    handleIsListing(scheduleView ? 'AGN' : 'LST');
    setScheduleView(!scheduleView);
  };

  return (
    <S.Container>
      <S.Content>
        <S.MenuButtonContent onPress={openSideMenu}>
          <Icon name="menu" size={30} color={headerColor} />
        </S.MenuButtonContent>
        <S.TitleName headerColor={headerColor}>{headerTitle}</S.TitleName>
        {handleIsListing && (
          <S.SwitchContent>
            <S.SwitchButton onPress={handleScheduleView}>
              {scheduleView ? (
                <Icon name="calendar" size={20} color={headerColor} />
              ) : (
                <Icon name="list" size={20} color={headerColor} />
              )}
            </S.SwitchButton>
          </S.SwitchContent>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Header;
