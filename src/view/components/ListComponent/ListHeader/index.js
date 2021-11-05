import React, {useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Salooni from '../../../../assets/svg/salooniSVG.svg';
import Search from '../../../../assets/svg/searchSVG.svg';
import Times from '../../../../assets/svg/timesSVG.svg';
import tourMessages from '../../../../common/tourMessages';


const ListHeader = ({
  searchItems,
  headerTitle,
  headerColor,
  calendarView,
  handleCalendarView,
  isDeleting,
  selectedItemsLength,
  cancelDelete,
  handleState,
  headerHeight,
  searchPlaceHolder,
}) => {
  const [scheduleView, setScheduleView] = useState('');
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    setScheduleView(calendarView);
  }, []);

  return (
    <S.Container
      style={[
        {
          height: headerHeight,
        },
      ]}>
      <S.Content>
        <S.Header>
          {!isDeleting && (
            <S.IconContent>
              <Salooni
                fill={headerColor}
                borderFill={'#fff'}
                width={60}
                height={60}
              />
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
              <S.TitleName headerColor={headerColor}>{headerTitle}</S.TitleName>
              {handleState && (
                <S.ChangeIconContent onPress={handleState}>
                  <Icon name={'exchange-alt'} size={20} color={headerColor} />
                </S.ChangeIconContent>
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
              }}>
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
