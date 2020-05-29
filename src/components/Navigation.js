import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
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
});

const Navigation = (props) => {
  const {
    state: {isLoading},
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
                <Avatar.Image
                  source={{
                    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                  }}
                  size={50}
                />
                <View style={styles.drawerUserInfoWrapper}>
                  <Title>Marta Matczanski</Title>
                  <Caption>Front-End Developer</Caption>
                </View>
              </View>
            </View>
            <Drawer.Section title="General">
              <DrawerItem
                icon={() => <Icon name="home" size={24} color={theme.colors.black} />}
                label="Home"
                onPress={() => navigate('Home')}
              />
              <DrawerItem
                icon={() => <Icon name="user" size={24} color={theme.colors.black} />}
                label="Account"
                onPress={() => navigate('Account')}
              />
              <DrawerItem
                icon={() => <FontAwesomeIcon name="money" size={24} />}
                label="Add transaction"
                onPress={() => navigate('AddTransaction')}
              />
              <DrawerItem
                icon={() => <Icon name="list" size={24} />}
                label="Transaction List"
                onPress={() => navigate('TransactionList')}
              />
            </Drawer.Section>
          </DrawerContentScrollView>
          <DrawerItem
            icon={() => <Icon type="feather" name="log-out" size={24} color={theme.colors.black} />}
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
