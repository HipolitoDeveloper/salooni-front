import React from 'react';
import * as S from './styled';

import Salooni from '../../../../assets/svg/salooniSVG.svg';
import Colors from "../../../../common/style/Colors";

const SplashScreen = () => {
  return (
    <S.Container>
      <Salooni
        fill={Colors.PURPLE}
        borderFill={'white'}
        width={200}
        height={200}
      />
    </S.Container>
  );
};

export default SplashScreen;
