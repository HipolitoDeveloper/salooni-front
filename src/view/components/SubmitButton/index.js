import React from 'react';

import {ContentButton, ContentButtonText} from './styled';

const SubmitButton = ({
  text,
  onPress,
  width,
  height,
  fontSize,
  buttonColor,
}) => {
  return (
    <>
      <ContentButton
        onPress={onPress}
        width={width}
        height={height}
        buttonColor={buttonColor}>
        <ContentButtonText fontSize={fontSize}>{text}</ContentButtonText>
      </ContentButton>
    </>
  );
};

export default SubmitButton;
