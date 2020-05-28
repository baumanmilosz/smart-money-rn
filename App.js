import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {I18nextProvider} from 'react-i18next';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import {navigationRef} from './src/helpers/navigationRef';
import Navigation from './src/components/Navigation';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as NavigationProvider} from './src/context/NavigationContext';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import i18n from './src/lib/i18n';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="ResolveAuth"
        drawerContent={(props) => <Navigation {...props} />}>
        <Drawer.Screen name="ResolveAuth" component={ResolveAuthScreen} />
        <Drawer.Screen name="Signup" component={SignupScreen} />
        <Drawer.Screen name="Signin" component={SigninScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Account" component={AccountScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </AuthProvider>
    </I18nextProvider>
  );
};
