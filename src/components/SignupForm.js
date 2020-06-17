import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInput, Title} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import theme from '../styles/theme';
import {navigate} from '../helpers/navigationRef';
import CommonFormButton from './CommonFormButton';
import CommonView from './CommonView';
import {Context as AuthContext} from '../context/AuthContext';

const styles = StyleSheet.create({
  signupWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: theme.colors.white,
  },
  authFormTitle: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 30,
  },
  authFormInput: {
    marginVertical: 10,
    backgroundColor: theme.colors.white,
  },
  authFormErrorMessage: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.colors.red,
  },
  styledRedirectLinkText: {
    color: theme.colors.secondary,
  },
});

const SignupFrom = ({t}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const inputRef = useRef();

  const {signup} = useContext(AuthContext);

  useEffect(() => {
    return navigation.addListener('blur', () => {
      setEmail('');
      setPassword('');
    });
  }, [navigation]);

  return (
    <CommonView contentStyle={styles.signupWrapper}>
      <Title style={styles.authFormTitle}>{t('auth:signup_title')}</Title>
      <TextInput
        label={t('auth:first_name')}
        mode="outlined"
        style={styles.authFormInput}
        theme={{colors: theme.colors}}
        value={firstName}
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
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => inputRef.current.focus()}
      />
      <TextInput
        name="password"
        label={t('auth:email')}
        mode="outlined"
        style={styles.authFormInput}
        theme={{colors: theme.colors}}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => inputRef.current.focus()}
      />
      <TextInput
        name="confirmPassword"
        ref={inputRef}
        label={t('auth:password')}
        mode="outlined"
        theme={{colors: theme.colors}}
        style={styles.authFormInput}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <TextInput
        ref={inputRef}
        label={t('auth:confirm_password')}
        mode="outlined"
        theme={{colors: theme.colors}}
        style={styles.authFormInput}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <CommonFormButton
        onSubmit={() => signup(firstName, lastName, email, password, confirmPassword)}
        title={t('auth:sigup_button')}
      />
      <TouchableOpacity onPress={() => navigate('Signin')}>
        <Text style={styles.styledRedirectLinkText}>{t('auth:signup_redirect_link')}</Text>
      </TouchableOpacity>
    </CommonView>
  );
};

SignupFrom.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SignupFrom);
