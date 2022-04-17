import styled from "styled-components/native";
import Colors from "../../../../common/style/Colors";
import Fonts from "../../../../common/style/Fonts";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.BACKGROUND_COLOR};
`;

export const LoadingContent = styled.View`
  width: 100%;
  top: 70px;
  position: absolute;
`;

export const Header = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
`;

export const Body = styled.View`
  flex: 9;
  height: ${props => (props.isDeleting || props.isConfirming ? "73%" : "100%")};
`;

export const Footer = styled.View`
  flex: 1;
  background-color: ${props => props.color};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FooterButtons = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
`;

export const FooterButton = styled.TouchableOpacity`
  height: 50%;
  width: 30%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.LIGHT_GREY};
  elevation: 2;
`;

export const FooterButtonText = styled.Text`
  font-family: ${Fonts.MAIN};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  letter-spacing: 1px;
`;

export const EmptyMessageWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const EmptyMessageText = styled.Text`  
  width:70%;
  font-size: 20px;
  text-align: center;
  font-family: ${Fonts.MAIN};
`;

