import React, {useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Salooni from '../../../../assets/svg/salooniSVG.svg';
import Search from '../../../../assets/svg/searchSVG.svg';
import Times from '../../../../assets/svg/timesSVG.svg';
import tourMessages from '../../../../common/tourMessages';
import {View, Text, Dimensions} from 'react-native';
import {CalendarIcon, ProfileIcon} from './styled';
import Profile from '../../../../assets/svg/profileSVG.svg';
import BackButton from '../../small/BackButton';
import global from '../../../../common/global';

const ListHeader = ({
  backButtonHeader,
  searchItems,
  headerTitle,
  headerColor,
  calendarView,
  showProfileIcon,
  isDeleting,
  selectedItemsLength,
  cancelDelete,
  handleAgenda,
  headerHeight,
  searchPlaceHolder,
  scrolling,
  showBackButton,
  onBack,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const isSmallerScreen = screenHeight < 650;

  const [scheduleView, setScheduleView] = useState('');
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    setScheduleView(calendarView);
  }, []);

  return (
    <S.Container
      backButtonHeader={backButtonHeader}
      style={[
        {
          height: headerHeight,
        },
      ]}>
      {backButtonHeader ? (
        <S.HeaderContent>
          <BackButton
            positionLeft={'20px'}
            positionTop={'60px'}
            onPress={() => {
              onBack(-1);
              navigation.push('TabStack', {screen: 'Schedules'});
            }}
            buttonColor={global.colors.purpleColor}
          />
          <S.HeaderText>Agendamentos a confirmar</S.HeaderText>
        </S.HeaderContent>
      ) : (
        <S.Content>
          <S.Header>
            {!isDeleting && scrolling && (
              <S.IconContent>
                {showBackButton ? (
                  <BackButton
                    onPress={() =>
                      navigation.navigate('UserInformationStack', {
                        screen: 'Profile',
                      })
                    }
                    buttonColor={headerColor}
                    positionTop={'20px'}
                    positionLeft={'10px'}
                  />
                ) : (
                  <Salooni
                    fill={headerColor}
                    borderFill={'#fff'}
                    width={screenWidth / 8}
                    height={screenHeight / 8}
                  />
                )}
              </S.IconContent>
            )}
            {isDeleting ? (
              <S.DeleteContent headerColor={headerColor}>
                <S.DeleteText>{`Deseja apagar os ${selectedItemsLength} itens?`}</S.DeleteText>
                <S.DeleteCancelIcon onPress={cancelDelete}>
                  <Times
                    fill={'#fff'}
                    borderFill={'#fff'}
                    width={10}
                    height={10}
                  />
                </S.DeleteCancelIcon>
              </S.DeleteContent>
            ) : (
              <>
                <S.TitleName
                  screenHeight={screenHeight}
                  headerColor={headerColor}>
                  {headerTitle}
                </S.TitleName>
                {handleAgenda && (
                  <S.CalendarIcon
                    screenWidth={screenWidth}
                    onPress={handleAgenda}
                    backgroundColor={headerColor}>
                    <Icon name={'calendar'} size={14} color={'black'} />
                  </S.CalendarIcon>
                )}

                {showProfileIcon && (
                  <S.ProfileIcon
                    onPress={() =>
                      navigation.push('ApplicationStack', {
                        screen: 'UserInformationStack',
                      })
                    }>
                    <Profile
                      fill={headerColor}
                      borderFill={'#fff'}
                      width={screenWidth / 12}
                      height={screenHeight / 12}
                    />
                  </S.ProfileIcon>
                )}
              </>
            )}
          </S.Header>

          <S.SubHeader>
            <S.SearchContainer>
              <S.SearchIcon>
                <Search
                  fill={'#fff'}
                  borderFill={'black'}
                  width={20}
                  height={20}
                />
              </S.SearchIcon>
              <S.SearchInput
                screenHeight={screenHeight}
                value={search.text}
                onChangeText={text => {
                  searchItems(text);
                  setSearch({text: text, isSearching: true});
                }}
                placeholder={searchPlaceHolder}
                placeholderTextColor={'black'}
              />

              <S.CancelInput
                onPress={() => {
                  setSearch({text: '', isSearching: false});
                  searchItems('');
                }}
                hitSlop={{top: 12, left: 12, right: 12, bottom: 12}}>
                <Times
                  fill={'#fff'}
                  borderFill={'black'}
                  width={10}
                  height={10}
                />
              </S.CancelInput>
            </S.SearchContainer>
          </S.SubHeader>
        </S.Content>
      )}
    </S.Container>
  );
};

export default ListHeader;

// ListHeader.defaultProps = {
//   onPress: () => {},
//   width: '120px',
//   height: '35px',
//   text: '',
//   color: 'white',
//   fontSize: '17px',
//   leftContent: {
//     show: false,
//     height: '20px',
//     width: '20px',
//     icon: '',
//     backgroundColor: 'white',
//     iconSize: 14,
//     iconColor: 'white',
//   },
// };
//
// Button.propTypes = {
//   onPress: PropTypes.func,
//   width: PropTypes.string,
//   text: PropTypes.string,
//   positionLeft: PropTypes.string,
//   color: PropTypes.string,
//   fontSize: PropTypes.string,
//   leftContent: PropTypes.object,
// };
