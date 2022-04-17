import styled from 'styled-components/native';
import { ScrollView, StyleSheet } from 'react-native';
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Container = styled.ScrollView.attrs({
    contentContainerStyle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    }
})`
`;

export const MainCard = styled.View`
elevation: 10;
background-color: ${Colors.LIGHT_GREY};
z-index: 5;
border: ${StyleSheet.hairlineWidth}px solid ${Colors.LIGHT_GREY};
height: 140px;
width: 80%;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: center;
margin: 60px;

`

export const InformationBox = styled.View`
height: 100px;
width: 100%;

`

export const AuxiliarTitle = styled.Text`
font-family: ${Fonts.MAIN};
font-weight: bold;
font-size: 16px;
margin: 20px 0 10px 20px;
`


export const AuxiliarCard = styled.View`
elevation: 3;
background-color: ${Colors.LIGHT_GREY};
z-index: 5;
border: ${StyleSheet.hairlineWidth}px solid ${Colors.LIGHT_GREY};
height: 60px;
width: 90%;
border-radius: 10px;
margin: 0 auto;
display: flex;
align-items: flex-start;
justify-content: center;
`
export const AuxiliarText = styled.Text`
font-family: ${Fonts.MAIN};
font-size: 16px;
margin-left: 10px;

`
