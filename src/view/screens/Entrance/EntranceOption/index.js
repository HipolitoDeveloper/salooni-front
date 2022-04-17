import React from "react";
import * as S from "./styled";
import { useNavigation } from "@react-navigation/native";
import SalooniLogo from "../../../../assets/icone11-backgroundwhite.png";
import OwnerIcon from "../../../../assets/svg/ownerSVG.svg";
import PartnerIcon from "../../../../assets/svg/partnerSVG.svg";
import { Dimensions } from "react-native";
import Colors from "../../../../common/style/Colors";

export const EntranceOption = () => {
  // const {cleanProceduresInformation} = useProcedure()
  // const {cleanPartnersInformation} = useEmployee()
  // const {cleanOwnerInformation, owner} = useUser()
  const navigate = useNavigation();

  const svgHeight = Dimensions.get("screen").height;
  const svgWidth = Dimensions.get("screen").width;

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.SalooniLogo source={SalooniLogo} />
          <S.HeaderText>Olá, você é um?</S.HeaderText>
        </S.Header>
        <S.OwnerContent
          onPress={() => {
            navigate.navigate("SignInOwner");
            // cleanProceduresInformation();
            // cleanOwnerInformation();
            // cleanPartnersInformation();
          }}>
          <OwnerIcon
            fill={Colors.PURPLE}
            borderFill={Colors.LIGHT_GREY}
            width={svgWidth / 2}
            height={svgHeight / 5}
          />
          <S.Text>Proprietário</S.Text>
        </S.OwnerContent>
        <S.PartnerContent onPress={() => navigate.navigate("SignInEmployee")}>
          <PartnerIcon
            fill={Colors.PURPLE}
            borderFill={Colors.LIGHT_GREY}
            width={svgWidth / 2}
            height={svgHeight / 5}
          />
          <S.Text>Parceiro</S.Text>
        </S.PartnerContent>
      </S.Content>
    </S.Container>
  );
};
