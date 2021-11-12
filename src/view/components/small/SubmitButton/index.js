import React from 'react';

import {ContentButton, ContentButtonText} from './styled';
import Input from '../Input';

const SubmitButton = ({
  text,
  onPress,
  width,
  height,
  fontSize,
  buttonColor,
  disabled,
}) => {
  return (
    <>
      <ContentButton
        onPress={onPress}
        width={width}
        height={height}
        buttonColor={buttonColor}
        disabled={typeof disabled === 'function' ? !disabled() : disabled}>
        <ContentButtonText fontSize={fontSize}>{text}</ContentButtonText>
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
