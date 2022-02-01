import React, {useContext} from 'react';
import global from '../../../common/global';

import TopTabBar from '../../patterns/TopTabBar';
import {UserContext} from '../../../contexts/User/UserContext';
import Notification from '../../../view/components/small/Notification';

const UserTabBar = ({children, state, navigation}) => {
  const {isOwner} = useContext(UserContext);
  let pages = [
    {screen: 'Profile', name: 'Perfil'},
    {screen: 'Finance', name: 'Financeiro'},
    {screen: 'Videos', name: 'Vídeos'},
  ];

  const goBack = () => {
    navigation.navigate('TabStack', {
      screen: 'Schedules',
      params: {calendarViewState: true},
    });
  };

  return (
    <>
      <Notification />
      <TopTabBar
        showSignoutButton={true}
        isOwner={isOwner}
        disableButtons={true}
        backButton={true}
        color={global.colors.purpleColor}
        pages={pages}
        state={state}
        navigation={navigation}
        onCancel={goBack}
      />
    </>
  );
};
export default UserTabBar;
