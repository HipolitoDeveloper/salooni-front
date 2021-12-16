import styled from 'styled-components/native';
import global from '../../../../common/global';
import { StyleSheet, Dimensions, FlatList } from 'react-native';


const screenHeight = Dimensions.get('screen').height;


export const AgendaHeader = styled.View`

`

export const MonthHeader = styled.View`
width: 100%
`

export const MonthContainer = styled.View`

  elevation: 10;
  margin: 0 15px;
  padding: 20px;
  border-radius: 20px;
  margin-top: 60px; 
  height: ${screenHeight * 0.4}px;
  background-color: ${global.colors.purpleColor}
`

export const MonthHeaderItem = styled.Text`
  padding: 5px;
  font-family: ${global.fonts.mainFont};
  font-size: 13px;
  color: ${global.colors.lightGreyColor}
`



export const DayContainer = styled.Text`
  padding: 5px;
  margin: 5px
`

export const EventsContainer = styled.View``

export const EventContent = styled.View``