import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Caption, TextInput, Title} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import CommonView from './CommonView';
import theme from '../styles/theme';
import CommonFormButton from './CommonFormButton';
import {Context as AuthContext} from '../context/AuthContext';
import UserAvatar from './UserAvatar';

const styles = StyleSheet.create({
  authFormInput: {
    marginVertical: 10,
    backgroundColor: theme.colors.white,
  },
  userInfoWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

const UserForm = ({t}) => {
  const {
    state: {
      isLoading,
      userInfo: {firstName, lastName, email, avatarUri},
    },
    saveUserInfo,
    getUserInfo,
    resetPassword,
  } = useContext(AuthContext);
  const [newFirstName, setFirstName] = useState(firstName);
  const [newLastName, setLastName] = useState(lastName);
  const [newEmail, setEmail] = useState(email);
  const navigation = useNavigation();
  navigation.addListener('blur', () => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
  });
  const [userAvatar, setAvatartUri] = useState('');

  const _getAvatar = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        width: 300,
        height: 300,
        cropping: true,
      });
      setAvatartUri(image);
    } catch (e) {
      throw new Error(e);
    }
  };

  const _checkIfDisable = () => {
    return (
      firstName === newFirstName &&
      lastName === newLastName &&
      email === newEmail &&
      userAvatar === avatarUri
    );
  };

  return (
    <CommonView>
      <View style={styles.userInfoWrapper}>
        <TouchableOpacity onPress={_getAvatar}>
          <UserAvatar size={60} />
        </TouchableOpacity>
        <Title>{`${firstName} ${lastName}`}</Title>
        <Caption>{email}</Caption>
      </View>
      <TextInput
        label={t('auth:first_name')}
        mode="outlined"
        style={styles.authFormInput}
        theme={{colors: theme.colors}}
        value={newFirstName}
        onChangeText={setFirstName}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
      />
      <TextInput
        label={t('auth:last_name')}
        mode="outlined"
        style={styles.authFormInput}
        theme={{colors: theme.colors}}
        value={newLastName}
        onChangeText={setLastName}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
      />
      <TextInput
        name="password"
        label={t('auth:email')}
        mode="outlined"
        style={styles.authFormInput}
        theme={{colors: theme.colors}}
        value={newEmail}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
      />
      <CommonFormButton
        title={t('save')}
        isDisabled={_checkIfDisable()}
        onSubmit={() => {
          saveUserInfo(newFirstName, newLastName, newEmail, email, userAvatar);
          getUserInfo();
        }}
        loading={isLoading}
      />
      <TouchableOpacity onPress={() => resetPassword(email)}>
        <Text style={styles.styledRedirectLinkText}>Forgot password? Reset!</Text>
      </TouchableOpacity>
    </CommonView>
  );
};

UserForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(UserForm);
