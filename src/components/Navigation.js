import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import {Drawer, Avatar, Title, Caption, Switch, TouchableRipple} from 'react-native-paper';
import {navigate} from '../helpers/navigationRef';
import {Context as NavigationContext} from '../context/NavigationContext';
import {Context as AuthContext} from '../context/AuthContext';

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
const lightStyles = StyleSheet.create({
  drawerWrapper: {
    backgroundColor: '#fff',
  },
});
const darkStyles = StyleSheet.create({
  drawerWrapper: {
    backgroundColor: '#000',
  },
});

const Navigation = (props) => {
  const {signout} = useContext(AuthContext);
  const {
    state: {isDarkMode},
    handleDarkMode,
  } = useContext(NavigationContext);

  return (
    <View
      style={[
        styles.drawerWrapper,
        isDarkMode ? darkStyles.drawerWrapper : lightStyles.drawerWrapper,
      ]}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={[styles.drawerUserDetailsWrapper]}>
            <Avatar.Image
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
              size={50}
            />
            <View style={styles.drawerUserInfoWrapper}>
              <Title style={isDarkMode && styles.darkModeColor}>Marta Matczanski</Title>
              <Caption style={isDarkMode && styles.darkModeColor}>Front-End Developer</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section title="General">
          <DrawerItem
            icon={() => (
              <Icon type="feather" name="home" size={24} color={isDarkMode ? '#fff' : '#000'} />
            )}
            label="Home"
            onPress={() => navigate('Home')}
            labelStyle={isDarkMode && styles.darkModeColor}
          />
          <DrawerItem
            icon={() => (
              <Icon type="feather" name="user" size={24} color={isDarkMode ? '#fff' : '#000'} />
            )}
            label="Account"
            onPress={() => navigate('Account')}
            labelStyle={isDarkMode && styles.darkModeColor}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple>
            <View style={styles.darkModeListItem}>
              <Text style={isDarkMode && styles.darkModeColor}>Dark mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={() => handleDarkMode(isDarkMode)}
                color="#1975d2"
              />
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <DrawerItem
        icon={() => (
          <Icon type="feather" name="log-out" size={24} color={isDarkMode ? '#fff' : '#000'} />
        )}
        label="Log Out"
        onPress={signout}
        labelStyle={isDarkMode && styles.darkModeColor}
      />
    </View>
  );
};

export default Navigation;
