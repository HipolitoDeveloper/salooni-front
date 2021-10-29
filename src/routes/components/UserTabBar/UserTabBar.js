import React, {useContext} from 'react';
import global from '../../../common/global';

import TopTabBar from '../../patterns/TopTabBar';
import {UserContext} from '../../../contexts/User/UserContext';

const UserTabBar = ({children, state, navigation}) => {
  const {isOwner} = useContext(UserContext);
  let pages = [];
  if (isOwner) {
    pages = [
      {screen: 'Profile', name: 'Perfil'},
      {screen: 'Procedures', name: 'Procedimentos'},
    ];
  } else {
    pages = [{screen: 'Profile', name: 'Perfil'}];
  }

  const goBack = () => {
    navigation.navigate('TabStack', {
      screen: 'SchedulingCalendar',
      params: {calendarViewState: true},
    });
  };

  return (
    <>
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
