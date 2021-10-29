import React from 'react';
import * as S from './styled';
import Input from '../Input';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ButtonContent, LeftContainer} from './styled';

const Button = ({
  text,
  onPress,
  width,
  height,
  color,
  backgroundColor,
  textColor,
  fontSize,
  leftContent,
  marginBottom,
}) => {
  const existsLeftContent = leftContent.show;

  return (
    <>
      <S.Button
        marginBottom={marginBottom}
        onPress={onPress}
        width={width}
        height={height}
        color={color}
        backgroundColor={backgroundColor}
        existsLeftContent={existsLeftContent}>
        {existsLeftContent && (
          <S.LeftContainer>
            <S.LeftContent {...leftContent}>
              <Icon
                name={leftContent.icon ? leftContent.icon : 'pen'}
                size={leftContent.iconSize ? leftContent.iconSize : 16}
                color={leftContent.iconColor ? leftContent.iconColor : 'black'}
              />
            </S.LeftContent>
          </S.LeftContainer>
        )}

        <S.ButtonContent>
          <S.ButtonText
            fontSize={fontSize}
            textColor={textColor}
            existsLeftContent={existsLeftContent}>
            {text}
          </S.ButtonText>
        </S.ButtonContent>
      </S.Button>
    </>
  );
};

export default Button;

Button.defaultProps = {
  onPress: () => {},
  width: '120px',
  height: '35px',
  text: '',
  color: 'white',
  fontSize: '17px',
  leftContent: {
    show: false,
    height: '20px',
    width: '20px',
    icon: '',
    backgroundColor: 'white',
    iconSize: 14,
    iconColor: 'white',
  },
};

Button.propTypes = {
  onPress: PropTypes.func,
  width: PropTypes.string,
  text: PropTypes.string,
  positionLeft: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  leftContent: PropTypes.object,
};
