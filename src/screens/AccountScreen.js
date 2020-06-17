import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption, Title} from 'react-native-paper';
import CommonHeader from '../components/CommonHeader';
import UserAvatar from '../components/UserAvatar';
import {Context as AuthContext} from '../context/AuthContext';
import CommonView from '../components/CommonView';
import UserForm from '../components/UserForm';
import CommonSnackbar from '../components/CommonSnackbar';

const styles = StyleSheet.create({
  drawerUserInfoWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  userFormWrapper: {
    alignSelf: 'stretch',
  },
});

const AccountScreen = () => {
  const {
    state: {
      errorMessage,
      success,
      userInfo: {firstName, lastName, email},
    },
  } = useContext(AuthContext);
  return (
    <>
      <CommonHeader text="Account" />
      <CommonView>
        <View style={styles.drawerUserInfoWrapper}>
          <UserAvatar size={60} />
          <Title>{`${firstName} ${lastName}`}</Title>
          <Caption>{email}</Caption>
          <View style={styles.userFormWrapper}>
            <UserForm />
          </View>
        </View>
      </CommonView>
      {errorMessage ? <CommonSnackbar variant="error" text={errorMessage} /> : null}
      {success ? <CommonSnackbar variant="success" text="Saved successfully" /> : null}
    </>
  );
};

export default AccountScreen;
