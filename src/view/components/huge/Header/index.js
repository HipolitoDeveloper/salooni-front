import React, {useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  searchItems,
  headerTitle,
  headerColor,
  calendarView,
  handleCalendarView,
}) => {
  const [scheduleView, setScheduleView] = useState('');
  const [searchMode, setSearchMode] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setScheduleView(calendarView);
  }, []);

  const openSideMenu = () => {
    navigation.openDrawer();
  };

  const handleScheduleView = () => {
    handleCalendarView(scheduleView ? 'AGN' : 'LST');
    setScheduleView(!scheduleView);
  };

  return (
    <S.Container>
      <S.Content searchMode={searchMode}>
        {!searchMode && (
          <S.IconContent headerColor={headerColor}>
            {/*<Icon name="menu" size={30} color={headerColor} />*/}
          </S.IconContent>
        )}

        <S.TitleName headerColor={headerColor}>{headerTitle}</S.TitleName>
        {searchMode && (
          <S.SearchContainer>
            <S.SearchIcon>
              <Icon name="search" size={18} color={'black'} />
            </S.SearchIcon>
            <S.SearchInput
              onChangeText={text => searchItems(text)}
              placeholder={'Procure por seu cliente...'}
              placeholderTextColor={'black'}
            />

            <S.CancelIcon onPress={() => setSearchMode(false)}>
              <Icon name="times" size={18} color={'black'} />
            </S.CancelIcon>
          </S.SearchContainer>
        )}

        {calendarView && (
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
        {!searchMode && (
          <S.SearchIconContainer onPress={() => setSearchMode(true)}>
            <Icon name="search" size={25} color={'black'} />
          </S.SearchIconContainer>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Header;
