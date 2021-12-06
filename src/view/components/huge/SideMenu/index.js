import react from 'react';
import {SideMenuView} from 'react-native-navigation-drawer-extension';

const SideMenu = () => {
  return (
    <SideMenuView
      style={{flex: 1}}
      drawerName={'CustomDrawer'}
      direction={'right'}
      passProps={{
        animationOpenTime: 300,
        animationCloseTime: 300,
        dismissWhenTouchOutside: true,
        fadeOpacity: 0.6,
        drawerScreenWidth: '75%',
        drawerScreenHeight: '100%',
        parentComponentId: props.componentId,
        style: {
          backgroundColor: 'white',
        },
      }}
      options={{
        layout: {
          componentBackgroundColor: 'transparent',
        },
      }}
    />
  );
};

export default SideMenu;
