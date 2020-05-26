import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import {Drawer, Avatar, Title, Caption, Switch, TouchableRipple} from 'react-native-paper';
import {navigate} from '../helpers/navigationRef';

const styles = StyleSheet.create({
  drawerUserInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userNameWrapper: {
    marginLeft: 10,
  },
  darkModeListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

const DrawerContent = (props) => {
  const [isEnable, setEnable] = useState(false);

  const _onToggleSwitch = () => setEnable((prevState) => !prevState);
  return (
    <View style={{flex: 1, padding: 10}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerUserInfoSection}>
            <Avatar.Image
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
              size={50}
            />
            <View style={styles.userNameWrapper}>
              <Title>Marta Matczanski</Title>
              <Caption>Front-End Developer</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section title="General">
          <DrawerItem
            icon={() => <Icon type="feather" name="home" size={24} />}
            label="Home"
            onPress={() => navigate('Home')}
          />
          <DrawerItem
            icon={() => <Icon type="feather" name="user" size={24} />}
            label="Account"
            onPress={() => navigate('Account')}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple>
            <View style={styles.darkModeListItem}>
              <Text>Dark mode</Text>
              <Switch value={isEnable} onValueChange={_onToggleSwitch} color="#1975d2" />
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <DrawerItem
        icon={() => <Icon type="feather" name="log-out" size={24} />}
        label="Log Out"
        onPress={() => console.log('Log out')}
      />
    </View>
  );
};

export default DrawerContent;
