import React, {useState} from 'react';
import SignupHeader from '../../../../routes/patterns/TopTabBar';

import * as S from './styled';
import RegisteredItemsModal from '../RegisterComponent/RegisteredItemsModal';
import FloatButton from '../../small/FloatButton';

const SignupComponent = ({color, pages}) => {
  return (
    <>
      <SignupHeader
        color={color}
        pages={pages}
        // headerTitle={headerTitle}
      />
      <S.Content>{/*{children}*/}</S.Content>
    </>
  );
};

export default SignupComponent;
