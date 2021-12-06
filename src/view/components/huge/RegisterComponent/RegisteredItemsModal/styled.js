import styled from 'styled-components/native';
import global from '../../../../../common/global';
export const Wrapper = styled.View`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  bottom: 0;
`;

export const Container = styled.View`
  width: 100%;
  height: 35%;
`;

export const Content = styled.ScrollView`
  background-color: ${props => props.color};
  width: 100%;
  height: 95%;

  bottom: 0;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

export const CloseButtonContent = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

export const CloseButton = styled.View`
  background-color: ${props => props.color};
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 60px;
  border-top-left-radius: 60px;
`;

export const ItemContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
`;

export const RightItemContent = styled.TouchableOpacity`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ItemName = styled.Text`
  font-family: ${global.fonts.mainFont};
  color: ${props =>
    props.isEditing ? `black` : `${global.colors.lightGreyColor}`};
  font-weight: ${props => (props.isEditing ? `bold` : `100`)};
  font-size: 16px;
  margin-left: 15px;
`;

export const ItemDeleteButton = styled.TouchableOpacity`
  margin-left: 20px;
  width: 25px;
  height: 25px;
  background-color: ${global.colors.lightGreyColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  elevation: 5;
`;

export const ItemInformation = styled.Text`
  font-family: ${global.fonts.mainFont};
  color: ${global.colors.lightGreyColor};
  font-size: 16px;
  margin-right: 20px;
`;

export const ItemProcedures = styled.View`
  background-color: ${global.colors.lightGreyColor};
  padding: 10px;
  margin-left: 20px;
  height: 35px;
  border-radius: 40px;
`;

export const ItemProcedureName = styled.Text`
  color: ${props => props.color};
  font-size: 13px;
  font-family: ${global.fonts.mainFont};
`;
