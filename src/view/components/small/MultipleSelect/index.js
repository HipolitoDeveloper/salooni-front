import React, {useEffect, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList, View} from 'react-native';
import Modal from 'react-native-modal';
import {ButtonContent, ButtonText} from './styled';
import global from '../../../../common/global';
import Button from '../Button';
import Search from '../../../../assets/svg/searchSVG.svg';
import Times from '../../../../assets/svg/timesSVG.svg';

const MultipleSelect = ({
  iconColor,
  modalHeaderText,
  options,
  plusIconColor,
  selectedItemBorderColor,
  handleMultiSelect,
  value,
  navigate,
  placeholderText,
  disabled,
  inputText,
  clearValue,
}) => {
  const [isShowingSuggestionBox, setIsShowingSuggestionBox] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    clearValue();

    setSuggestions(
      options?.map(option => {
        option.selected = false;

        return option;
      }),
    );
  }, []);

  const handleSelect = (item, selected) => {
    const newSuggestions = suggestions.map(suggestion => {
      if (suggestion.id === item.id) {
        suggestion.selected = selected;
      }

      return suggestion;
    });
    setSuggestions(newSuggestions);
    handleMultiSelect(item);
    return newSuggestions;
  };

  const openModal = () => {
    options.forEach(option => {
      if (value.length === 0) {
        option.selected = false;
      } else {
        value.forEach(v => {
          if (option.id === v.id) option.selected = true;
        });
      }
    });
    setIsShowingSuggestionBox(true);
  };

  return (
    <S.Container>
      <S.SelectContent>
        <S.SelectedContainer>
          <S.InputText color={iconColor}>{inputText}</S.InputText>
          {value.some(v => v.id) > 0 ? (
            <S.ItemsContainer>
              <FlatList
                horizontal={true}
                data={value}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <S.SelectedContent
                    selectedItemBorderColor={selectedItemBorderColor}>
                    <S.SelectedContentText>{item.name}</S.SelectedContentText>
                    <S.SelectedContentIcon
                      onPress={() => handleSelect(item, false)}
                      selectedItemBorderColor={selectedItemBorderColor}>
                      <Icon name={'times'} size={20} color={iconColor} />
                    </S.SelectedContentIcon>
                  </S.SelectedContent>
                )}
              />
            </S.ItemsContainer>
          ) : (
            <S.ButtonContent>
              <Button
                disabled={false}
                marginBottom={'0'}
                marginTop={'10px'}
                onPress={openModal}
                color={global.colors.purpleColor}
                text={placeholderText ? placeholderText : 'Procedimentos'}
                width={'180px'}
                height={'50px'}
                fontSize={'17px'}
                textColor={'black'}
                backgroundColor={iconColor}
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
            </S.ButtonContent>
          )}
        </S.SelectedContainer>
      </S.SelectContent>
      <SuggestionModal
        isVisible={isShowingSuggestionBox}
        onClose={() => setIsShowingSuggestionBox(!isShowingSuggestionBox)}
        options={suggestions}
        value={value}
        modalHeaderText={modalHeaderText}
        plusIconColor={plusIconColor}
        handleSelect={handleSelect}
      />
    </S.Container>
  );
};

const SuggestionModal = ({
  isVisible,
  onClose,
  options,
  value,
  modalHeaderText,
  plusIconColor,
  handleSelect,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState('');

  const onShow = () => {
    setSuggestions(
      options.map(option => {
        option.selected = value.some(procedure => procedure.id === option.id);

        return option;
      }),
    );
  };

  const selectItem = item => {
    setSuggestions(handleSelect(item, !item.selected));
  };

  const searchItems = text => {
    const regex = new RegExp(`${text.trim()}`, 'i');
    setSuggestions(
      options.filter(i => i.name.search(regex) >= 0 || i.selected),
    );
    setSearch(text);
  };

  return (
    <S.ModalContainer>
      <Modal
        onBackButtonPress={onClose}
        isVisible={isVisible}
        onBackdropPress={onClose}
        onRequestClose={onClose}
        onModalWillShow={onShow}>
        <S.SuggestionContainer>
          <S.SuggestionHeader>
            <S.SuggestionHeaderText>{modalHeaderText}</S.SuggestionHeaderText>
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
                value={search}
                onChangeText={text => {
                  searchItems(text);
                }}
                placeholder={'Procure por procedimentos'}
                placeholderTextColor={'black'}
              />

              <S.CancelInput
                onPress={() => {
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
          </S.SuggestionHeader>
          <S.SuggestionContent>
            <S.SuggestionBody>
              <FlatList
                keyExtractor={item => item.id}
                style={{width: '100%', height: '100%'}}
                data={suggestions}
                renderItem={({item}) => {
                  if (!item.empty)
                    return (
                      <S.SuggestionItemContent onPress={() => selectItem(item)}>
                        <S.SuggestionItemIcon>
                          {item.selected ? (
                            <Icon
                              name={'minus-circle'}
                              size={25}
                              color={plusIconColor}
                            />
                          ) : (
                            <Icon
                              name={'plus'}
                              size={25}
                              color={plusIconColor}
                            />
                          )}
                        </S.SuggestionItemIcon>
                        <S.SuggestionItemText>{item.name}</S.SuggestionItemText>
                      </S.SuggestionItemContent>
                    );
                }}
              />
            </S.SuggestionBody>
          </S.SuggestionContent>
        </S.SuggestionContainer>
      </Modal>
    </S.ModalContainer>
  );
};

export default MultipleSelect;
