import Parse from "parse/react-native";
import React, { useContext, useRef, memo} from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Confirm from '../../../../assets/svg/confirmSVG.svg';
import RoundedTimes from '../../../../assets/svg/roundedTimesSVG.svg';
import Salooni from '../../../../assets/svg/salooniSVG.svg';



import * as S from './styled';
import { useClient, useEmployee, useProcedure, useSchedule, useUser } from "../../../../hooks";
import Loading from "../../small/Loading";
import BackButton from "../../small/BackButton";
import { handleError } from "../../../../common/HandleError";

const TopTabBar = ({
  color,
  pages,
  onConfirm,
  navigation,
  state,
  onCancel,
  disableButtons,
  backButton,
  isOwner,
  showSignoutButton,
}) => {
  const { setCurrentUser, onLogout } = useUser();

  const headerLinePosition = useRef(new Animated.Value(0)).current;

  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const isSmallerScreen = screenHeight < 650;
  const unsubscribe = navigation.addListener(
    'tabPress',
    e => {
      e.preventDefault();

      return unsubscribe;
    },
    [navigation],
  );

  const handleState = currentPage => {
    let position = 0;
    if (pages.length === 3) {
      switch (currentPage) {
        case 1:
          position = isSmallerScreen ? 105 : 130;
          break;
        case 2:
          position = isSmallerScreen ? 250 : 290;
          break;
        default:
          position = 0;
      }
    } else if (pages.length === 2) {
      switch (currentPage) {
        case 1:
          position = 250;
          break;
        default:
          position = 0;
      }
    } else if (pages.length === 1 && !isOwner) {
      switch (currentPage) {
        case 0:
          position = 130;
          break;
      }
    }
    Animated.timing(headerLinePosition, {
      toValue: position,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const doLogout = async () => {
    // clearSchedules();
    // clearProcedures();
    // clearClients();
    // clearPartners();
    try {
      await onLogout(null);
    }
    catch (error) {
      // handleModal({ ...modal, visible: true, variant: "alert", errors: error });
    }


  };

  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  handleState(state.index);

  return (
    <S.Container headerColor={color} isSmallerScreen={screenHeight < 650}>
      <S.Content>
        {backButton && (
          <BackButton
            onPress={() => navigation.goBack()}
            buttonColor={color}
            positionTop={'20px'}
            positionLeft={'10px'}
          />
        )}

        {!disableButtons && (
          <S.ButtonContent>
            <S.CancelButton onPress={onCancel}>
              <RoundedTimes
                fill={'white'}
                borderFill={color}
                width={screenHeight / 25}
                height={screenHeight / 25}
              />
            </S.CancelButton>
            <S.ButtonText>Cancelar</S.ButtonText>
          </S.ButtonContent>
        )}

        <Salooni
          fill={color}
          borderFill={'white'}
          width={screenHeight / 12}
          height={screenHeight / 12}
        />

        {!disableButtons && (
          <S.ButtonContent>
            <S.ConfirmButton
              onPress={onConfirm}>
              <Confirm
                fill={color}
                borderFill={'white'}
                width={screenHeight / 25}
                height={screenHeight / 25}
              />
            </S.ConfirmButton>
            <S.ButtonText>Concluir</S.ButtonText>
          </S.ButtonContent>
        )}

        {showSignoutButton && (
          <S.ExitButtonContent>
            <S.ExitButtonText>Sair</S.ExitButtonText>
            <S.ExitButton onPress={doLogout}>
              <Icon name={'sign-out-alt'} color={color} size={24} />
            </S.ExitButton>
          </S.ExitButtonContent>
        )}

      </S.Content>
      <S.HeaderTitleContainer isOneOption={pages.length === 1}>
        {pages.map((page, index) => (
          <S.HeaderTitleContent
            key={page.screen}
            onPress={() => {
              goTo(page.screen);
              handleState(index);
            }}>
            <S.HeaderTitle screenHeight={screenHeight} headerColor={color}>
              {page.name}
            </S.HeaderTitle>
          </S.HeaderTitleContent>
        ))}
      </S.HeaderTitleContainer>
      <Animated.View
        style={[
          {
            left: headerLinePosition,
            backgroundColor: color,
            width: screenHeight / 6,
          },
          styles.headerLine,
        ]}
      />
    </S.Container>
  );
};

export default memo(TopTabBar);

const styles = StyleSheet.create({
  headerLine: {
    position: 'absolute',
    bottom: 0,
    height: 3,
  },
});
