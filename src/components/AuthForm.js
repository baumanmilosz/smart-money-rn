import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Title, TextInput, Button} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {Context as AuthContext} from '../context/AuthContext';
import theme from '../styles/theme';
import {navigate} from '../helpers/navigationRef';
import LangButtonsMolecule from './LangButtonsMolecule';

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
  authFormSubmitButton: {
    marginVertical: 15,
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
      <Button
        mode="contained"
        color={theme.colors.primary}
        style={styles.authFormSubmitButton}
        onPress={() => onSubmit(email, password)}>
        {submitButton}
      </Button>
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
};

export default withTranslation()(AuthForm);
