import * as S from './styled';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useState} from 'react';
import {Switch} from '../Switch';
import {Dimensions, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Colors from "../../../../common/style/Colors";

export const InputModal = ({
                               children,
                               inputTitle,
                               handleSwitch,
                               switchState,
                           }) => {
    const [isShowingInput, setIsShowingInput] = useState(false);
    const [inputModal, setInputModal] = useState(false);
    const screenHeight = Dimensions.get('screen').height;
    const screenWidth = Dimensions.get('screen').width;
    const isSmallerScreen = screenHeight < 650;

    const handleInputModal = state => {
        setInputModal(state);
    };

    return (
        <S.Container>
            <S.Select>
                <Switch
                    handleSwitch={handleSwitch}
                    value={switchState}
                    backgroundColor={Colors.LIGHT_GREY}
                    circleColor={Colors.PURPLE}
                />
                <S.Text screenHeight={screenHeight}>{inputTitle}</S.Text>
                {switchState && (
                    <TouchableOpacity
                        onPress={() => {
                            setIsShowingInput(true);
                            handleInputModal(true);
                        }}>
                        <Icon
                            name={'eye'}
                            size={screenHeight / 28}
                            color={Colors.PURPLE}
                            style={{marginLeft: 10}}
                        />
                    </TouchableOpacity>
                )}
            </S.Select>
            {isShowingInput && (
                <Modal
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                    }}
                    onBackButtonPress={() => handleInputModal(false)}
                    isVisible={inputModal}
                    onBackdropPress={() => handleInputModal(false)}
                    onRequestClose={() => handleInputModal(false)}>
                    <S.InputsContainer
                        isSmallerScreen={isSmallerScreen}
                        screenHeight={screenHeight}
                        screenWidth={screenWidth}>
                        <S.TextContent>
                            <S.Text screenHeight={screenHeight}>{inputTitle}</S.Text>
                        </S.TextContent>

                        <S.InputsContent>{children}</S.InputsContent>
                    </S.InputsContainer>
                </Modal>
            )}
        </S.Container>
    );
};
