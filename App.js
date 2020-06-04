import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {I18nextProvider} from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import {navigationRef} from './src/helpers/navigationRef';
import Navigation from './src/components/Navigation';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as NavigationProvider} from './src/context/NavigationContext';
import {Provider as TransactionProvider} from './src/context/TransactionContext';
import {Provider as CategoryProvider} from './src/context/CategoryContext';
import {Provider as SettingsProvider} from './src/context/SettingsContext';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import i18n from './src/lib/i18n';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import TransactionListScreen from './src/screens/TransactionListScreen';
import TransactionDetailsScreen from './src/screens/TransactionDetailsScreen';
import EditTransactionScreen from './src/screens/EditTransactionScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import AddCategoryScreen from './src/screens/AddCategoryScreen';
import CategoryListScreen from './src/screens/CategoryListScreen';
import SummaryMonthScreen from './src/screens/SummaryMonthScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
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
        <Drawer.Screen name="AddTransaction" component={AddTransactionScreen} />
        <Drawer.Screen name="EditTransaction" component={EditTransactionScreen} />
        <Drawer.Screen name="TransactionList" component={TransactionListScreen} />
        <Drawer.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
        <Drawer.Screen name="AddCategory" component={AddCategoryScreen} />
        <Drawer.Screen name="CategoryList" component={CategoryListScreen} />
        <Drawer.Screen name="SummaryMonth" component={SummaryMonthScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <NavigationProvider>
          <SettingsProvider>
            <CategoryProvider>
              <TransactionProvider>
                <App />
              </TransactionProvider>
            </CategoryProvider>
          </SettingsProvider>
        </NavigationProvider>
      </AuthProvider>
    </I18nextProvider>
  );
};
