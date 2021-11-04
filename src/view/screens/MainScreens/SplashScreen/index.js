import React from 'react';
import * as S from './styled';
import global from '../../../../common/global';

import Salooni from '../../../../assets/svg/salooiSVGWithoutRounded.svg';

const SplashScreen = () => {
  return (
    <S.Container>
      <Salooni
        fill={global.colors.purpleColor}
        borderFill={'white'}
        width={200}
        height={200}
      />
    </S.Container>
  );
};

export default SplashScreen;
