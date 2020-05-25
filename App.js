import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import {setNavigator} from './src/helpers/navigationRef';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer ref={(navigator) => setNavigator(navigator)}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Account" component={AccountScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
