import React, {useRef, useState} from 'react';
import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {FlatList} from 'react-native';

const AutoComplete = ({
  placeholder,
  iconName,
  iconColor,
  searchLengthToSuggest,
  options,
  handleChange,
  name,
  value,
  textColor,
  editable,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleSuggestion = text => {
    const regex = new RegExp(`${text.trim()}`, 'i');
    setSuggestions(options.filter(i => i.name.search(regex) >= 0));
    handleChange(name, text);
  };

  const chooseSuggestion = suggestion => {
    setSuggestions([]);
    handleChange(name, suggestion);
  };

  const clearSearch = () => {
    handleChange(name, {name: ''});
  };

  return (
    <S.Container>
      <S.InputContent>
        {iconName && (
          <S.IconContainer>
            <Icon
              name={iconName}
              size={30}
              style={{marginTop: 13, marginRight: 10}}
              color={iconColor}
            />
          </S.IconContainer>
        )}

        <S.Input
          placeholder={placeholder}
          placeholderTextColor={textColor}
          value={value.name}
          onChangeText={handleSuggestion}
          editable={editable}
        />
        {value.length > 0 && (
          <S.ClearButton onPress={() => clearSearch()}>
            <Icon
              name={'times'}
              size={15}
              style={{marginTop: 13, marginRight: 10}}
            />
          </S.ClearButton>
        )}
      </S.InputContent>
      {value.length >= searchLengthToSuggest && (
        <S.SuggestionContent>
          <FlatList
            keyExtractor={item => item.id}
            data={suggestions}
            renderItem={({item}) => (
              <S.InputItem onPress={() => chooseSuggestion(item)}>
                <S.InputText>{item.name}</S.InputText>
              </S.InputItem>
            )}
          />
        </S.SuggestionContent>
      )}
    </S.Container>
  );
};
export default AutoComplete;
