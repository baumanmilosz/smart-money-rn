import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Drawer, Avatar, Title, Caption} from 'react-native-paper';
import {navigate} from '../helpers/navigationRef';
import {Context as NavigationContext} from '../context/NavigationContext';
import {Context as AuthContext} from '../context/AuthContext';
import Loader from './Loader';
import theme from '../styles/theme';

const styles = StyleSheet.create({
  drawerWrapper: {
    flex: 1,
    padding: 10,
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
  darkModeColor: {
    color: '#fff',
  },
  lightModeColor: {
    color: '#000',
  },
  avatarBackground: {
    backgroundColor: theme.colors.secondary,
  },
});

const Navigation = (props) => {
  const {
    state: {isLoading, email},
    signout,
  } = useContext(AuthContext);
  const {
    state: {isDarkMode},
  } = useContext(NavigationContext);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.drawerWrapper}>
          <DrawerContentScrollView {...props}>
            <View>
              <View style={styles.drawerUserDetailsWrapper}>
                <Avatar.Text
                  label={email && email[0].toUpperCase()}
                  size={50}
                  color={theme.colors.white}
                  style={styles.avatarBackground}
                />
                <View style={styles.drawerUserInfoWrapper}>
                  <Title>{email}</Title>
                  <Caption>Front-End Developer</Caption>
                </View>
              </View>
            </View>
            <Drawer.Section title="Overview">
              <DrawerItem
                icon={() => <FontAwesome name="wpforms" size={24} />}
                label="Summary"
                onPress={() => navigate('Summary')}
              />
              <DrawerItem
                icon={() => <MaterialCommunityIcons name="bank-plus" size={24} />}
                label="Add Transaction"
                onPress={() => navigate('AddTransaction')}
              />
              <DrawerItem
                icon={() => <Entypo name="list" size={24} />}
                label="Transaction List"
                onPress={() => navigate('TransactionList')}
              />
              <DrawerItem
                icon={() => <MaterialCommunityIcons name="database-plus" size={24} />}
                label="Add Category"
                onPress={() => navigate('AddCategory')}
              />
              <DrawerItem
                icon={() => <MaterialCommunityIcons name="table-column" size={24} />}
                label="Category List"
                onPress={() => navigate('CategoryList')}
              />
              <DrawerItem
                icon={() => <Entypo name="progress-two" size={24} />}
                label="Limits"
                onPress={() => navigate('Limits')}
              />
            </Drawer.Section>
            <Drawer.Section title="Others">
              <DrawerItem
                icon={() => <Icon name="user" size={24} color={theme.colors.black} />}
                label="Account"
                onPress={() => navigate('Account')}
              />
              <DrawerItem
                icon={() => <Icon name="settings" size={24} color={theme.colors.black} />}
                label="Settings"
                onPress={() => navigate('Settings')}
              />
            </Drawer.Section>
          </DrawerContentScrollView>
          <DrawerItem
            icon={() => <Icon name="log-out" size={24} color={theme.colors.black} />}
            label="Log Out"
            onPress={signout}
            labelStyle={isDarkMode && styles.darkModeColor}
          />
        </View>
      )}
    </>
  );
};

export default Navigation;
