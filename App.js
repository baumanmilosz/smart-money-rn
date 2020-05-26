import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import {navigationRef} from './src/helpers/navigationRef';
import DrawerContent from './src/components/DrawerContent';
import {Provider as DrawProvider} from './src/context/DrawContext';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Account" component={AccountScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <DrawProvider>
      <App />
    </DrawProvider>
  );
};
