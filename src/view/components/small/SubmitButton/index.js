import React from 'react';

import {ContentButton, ContentButtonText} from './styled';
import Input from '../Input';
import {Dimensions} from 'react-native';

const SubmitButton = ({
  text,
  onPress,
  width,
  height,
  fontSize,
  buttonColor,
  disabled,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const isSmallerScreen = screenHeight < 650;

  return (
    <>
      <ContentButton
        onPress={onPress}
        width={`${screenWidth / width}px`}
        height={`${screenHeight / height}px`}
        buttonColor={buttonColor}
        disabled={typeof disabled === 'function' ? !disabled() : disabled}>
        <ContentButtonText fontSize={`${screenHeight / fontSize}px`}>
          {text}
        </ContentButtonText>
      </ContentButton>
    </>
  );
};

export default SubmitButton;

SubmitButton.defaultProps = {
  text: '',
  onPress: () => {},
  width: '100%',
  height: '100%',
  fontSize: 18,
  buttonColor: '',
  disabled: false,
};
