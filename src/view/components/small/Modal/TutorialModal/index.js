import * as S from "./styled";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import { Image, ScrollView } from "react-native";
import Colors from "../../../../../common/style/Colors";

const TutorialModal = ({ onClose,  tutorial }) => {
  return (
    <S.ModalContent>
      <S.CloseButtonContent>
        <S.CloseButton onPress={onClose}>
          <Icon
            name={"times"}
            color={Colors.LIGHT_GREY}
            size={24}
          />
        </S.CloseButton>
      </S.CloseButtonContent>
      <ScrollView>
        <S.ItemInformation>
          <S.VideoTitle>{tutorial.signupVideo.name}</S.VideoTitle>
          <S.WrittenTutorialContent>
            <S.WrittenTutorialText>
              {tutorial.signupVideo.description}
            </S.WrittenTutorialText>
          </S.WrittenTutorialContent>

          <S.VideoContent>
            <Image
              source={{ uri: tutorial.signupVideo.url }}
              style={{
                width: 250,
                height: 480,
                borderRadius: 10,
                overlayColor: "white",
                marginBottom: 20,
              }}
            />
          </S.VideoContent>
        </S.ItemInformation>
        <S.ItemInformation>
          <S.VideoTitle>{tutorial.windowVideo.name}</S.VideoTitle>
          <S.WrittenTutorialContent>
            <S.WrittenTutorialText>
              {tutorial.windowVideo.description}
            </S.WrittenTutorialText>
          </S.WrittenTutorialContent>

          <S.VideoContent>
            <Image
              source={{ uri: tutorial.windowVideo.url }}
              style={{
                width: 250,
                height: 480,
                borderRadius: 10,
                overlayColor: "white",
              }}
            />
          </S.VideoContent>
          {/*<S.CoverWindowChange />*/}
        </S.ItemInformation>
      </ScrollView>
    </S.ModalContent>
  );
};

export default TutorialModal;
