import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import global from '../../../../common/global';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UserContext} from '../../../../contexts/User/UserContext';
import {CloseButton, NotificationMessage, NotificationText} from './styled';

const Notification = ({}) => {
  const {notifications} = useContext(UserContext);
  const [showingNotification, setShowingNotification] = useState(false);

  useEffect(() => {
    setShowingNotification(notifications.length > 0);
  }, []);

  return showingNotification ? (
    <S.Container>
      <S.Content>
        <S.NotificationMessage onPress={notifications[0].method}>
          <S.NotificationText>
            {notifications[0].description}
          </S.NotificationText>
        </S.NotificationMessage>
        <S.CloseButton onPress={() => setShowingNotification(false)}>
          <Icon style={{padding: 6}} name={'times'} size={12} color={'white'} />
        </S.CloseButton>
      </S.Content>
    </S.Container>
  ) : (
    <></>
  );
};

export default Notification;
