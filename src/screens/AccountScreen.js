import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption, Title} from 'react-native-paper';
import CommonHeader from '../components/CommonHeader';
import UserAvatar from '../components/UserAvatar';
import {Context as AuthContext} from '../context/AuthContext';

const styles = StyleSheet.create({
  drawerUserInfoWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
});

const AccountScreen = () => {
  const {
    state: {email},
  } = useContext(AuthContext);
  return (
    <View>
      <CommonHeader text="Account" />

      <View style={styles.drawerUserInfoWrapper}>
        <UserAvatar size={60} />
        <Title>{email}</Title>
        <Caption>Front-End Developer</Caption>
      </View>
    </View>
  );
};

export default AccountScreen;
