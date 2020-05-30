import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput, Title} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Context as AuthContext} from '../context/AuthContext';
import theme from '../styles/theme';
import {navigate} from '../helpers/navigationRef';
import LangButtonsMolecule from './LangButtonsMolecule';
import CommonFormButton from './CommonFormButton';

const styles = StyleSheet.create({
  signupWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: theme.colors.white,
  },
  authFormTitle: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 30,
  },
  authFormInput: {
    marginVertical: 15,
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

const AuthForm = ({onSubmit, authTitle, redirectRouteName, redirectLinkText, submitButton, t}) => {
  const {
    state: {errorMessage},
  } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    return navigation.addListener('blur', () => {
      setEmail('');
      setPassword('');
    });
  }, [navigation]);

  return (
    <View style={styles.signupWrapper}>
      <Title style={styles.authFormTitle}>{authTitle}</Title>
      <TextInput
        label={t('auth:email')}
        mode="outlined"
        style={styles.authFormInput}
        theme={{colors: theme.colors}}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
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
      {errorMessage ? <Title style={styles.authFormErrorMessage}>{errorMessage}</Title> : null}
      <CommonFormButton onSubmit={() => onSubmit(email, password)} title={submitButton} />
      <TouchableOpacity onPress={() => navigate(redirectRouteName)}>
        <Text style={styles.styledRedirectLinkText}>{redirectLinkText}</Text>
      </TouchableOpacity>
      <LangButtonsMolecule />
    </View>
  );
};

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authTitle: PropTypes.string.isRequired,
  submitButton: PropTypes.string.isRequired,
  redirectRouteName: PropTypes.string.isRequired,
  redirectLinkText: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTranslation()(AuthForm);
