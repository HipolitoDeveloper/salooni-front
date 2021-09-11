import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import global from '../../../common/global';
import * as S from './styled';
import Autocomplete from 'react-native-autocomplete-input';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AutocompleteInput = ({data, placeholder}) => {
  const [text, setText] = useState('');

  return (
    <S.Container>
      <View style={styles.autocompleteContainer}>
        {/*<Autocomplete*/}
        {/*  autoCorrect={false}*/}
        {/*  placeholder={placeholder}*/}
        {/*  // scrollToInput={ev => scrollToInput(ev)}*/}
        {/*  onChangeText={setText()}*/}
        {/*  value={text}*/}
        {/*  data={data}*/}
        {/*  flatListProps={{*/}
        {/*    keyExtractor: (_, idx) => idx,*/}
        {/*    renderItem: ({item}) => <Text>{item}</Text>,*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Text>{JSON.stringify(data)}</Text>*/}
      </View>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  input: {maxHeight: 40, borderWidth: 0, paddingLeft: 35, color: 'black'},
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: `${global.colors.lightBlueColor}`,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  plus: {
    color: `${global.colors.lightBlueColor}`,
    position: 'absolute',
    left: 5,
    top: 3,
  },
  pickerContainer: {
    marginLeft: -20,
    width: '100%',
  },
  picker: {
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 0,
  },
  scrollContainer: {
    borderWidth: 0,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
});

export default AutocompleteInput;
