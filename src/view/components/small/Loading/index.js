import React, {useEffect, useState} from 'react';
import * as S from './styled';
import {ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';

const Loading = ({isLoading, color}) => {
  return isLoading ? (
    <>
      <Modal
        scrollHorizontal={true}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        isVisible={isLoading}>
        <S.LoadingContent>
          <ActivityIndicator size="large" color={color} />
        </S.LoadingContent>
      </Modal>
    </>
  ) : (
    <></>
  );
};

export default Loading;
