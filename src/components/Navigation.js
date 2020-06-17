import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Drawer, Title, Caption, Switch} from 'react-native-paper';
import {navigate} from '../helpers/navigationRef';
import {Context as NavigationContext} from '../context/NavigationContext';
import {Context as AuthContext} from '../context/AuthContext';
import Loader from './Loader';
import theme from '../styles/theme';
import UserAvatar from './UserAvatar';

const Navigation = (props) => {
  const {
    state: {
      isLoading,
      userInfo: {firstName, lastName, email},
    },
    signout,
  } = useContext(AuthContext);
  const {
    state: {isDarkMode},
    handleDarkMode,
  } = useContext(NavigationContext);

  const fullName = `${firstName} ${lastName}`;
  const fontColor = isDarkMode ? theme.colors.white : theme.colors.black;
  const styles = StyleSheet.create({
    drawerWrapper: {
      flex: 1,
      padding: 10,
      backgroundColor: isDarkMode ? theme.colors.black : theme.colors.white,
    },
    drawerUserDetailsWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    drawerUserInfoWrapper: {
      marginLeft: 10,
    },
    darkModeListItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    navFooterWrapper: {
      flexDirection: 'row',
    },
    switchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    drawerSectionTitle: {
      color: 'red',
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.drawerWrapper}>
          <DrawerContentScrollView {...props}>
            <View>
              <View style={styles.drawerUserDetailsWrapper}>
                <TouchableOpacity onPress={() => navigate('Account')}>
                  <UserAvatar />
                </TouchableOpacity>
                <View style={styles.drawerUserInfoWrapper}>
                  <Title style={{color: fontColor}}>{fullName}</Title>
                  <Caption style={{color: fontColor}}>{email}</Caption>
                </View>
              </View>
            </View>
            <Drawer.Section title="Overview" labelStyle={{color: 'red'}}>
              <DrawerItem
                icon={() => <FontAwesome name="wpforms" size={24} color={fontColor} />}
                label="Summary"
                onPress={() => navigate('Summary')}
                labelStyle={{color: fontColor}}
              />
              <DrawerItem
                icon={() => <MaterialCommunityIcons name="bank-plus" size={24} color={fontColor} />}
                label="Add Transaction"
                onPress={() => navigate('AddTransaction')}
                labelStyle={{color: fontColor}}
              />
              <DrawerItem
                icon={() => <Entypo name="list" size={24} color={fontColor} />}
                label="Transaction List"
                onPress={() => navigate('TransactionList')}
                labelStyle={{color: fontColor}}
              />
              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons name="database-plus" size={24} color={fontColor} />
                )}
                label="Add Category"
                onPress={() => navigate('AddCategory')}
                labelStyle={{color: fontColor}}
              />
              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons name="table-column" size={24} color={fontColor} />
                )}
                label="Category List"
                onPress={() => navigate('CategoryList')}
                labelStyle={{color: fontColor}}
              />
              <DrawerItem
                icon={() => <Entypo name="progress-two" size={24} color={fontColor} />}
                label="Limits"
                onPress={() => navigate('Limits')}
                labelStyle={{color: fontColor}}
              />
            </Drawer.Section>
            <Drawer.Section title="Others">
              <DrawerItem
                icon={() => <Feather name="user" size={24} color={fontColor} />}
                label="Account"
                onPress={() => navigate('Account')}
                labelStyle={{color: fontColor}}
              />
              <DrawerItem
                icon={() => <Feather name="settings" size={24} color={fontColor} />}
                label="Settings"
                onPress={() => navigate('Settings')}
                labelStyle={{color: fontColor}}
              />
            </Drawer.Section>
          </DrawerContentScrollView>
          <View style={styles.navFooterWrapper}>
            <DrawerItem
              icon={() => <Feather name="log-out" size={24} color={fontColor} />}
              label="Log Out"
              onPress={signout}
              labelStyle={{color: fontColor}}
            />
            <View style={styles.switchWrapper}>
              <Feather name="sun" size={20} color={fontColor} />
              <Switch
                color={theme.colors.secondary}
                value={isDarkMode}
                onValueChange={() => handleDarkMode(!isDarkMode)}
              />
              <Feather name="moon" size={20} color={fontColor} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Navigation;
