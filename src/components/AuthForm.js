import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Title, TextInput, Button} from 'react-native-paper';
import {Context as AuthContext} from '../context/AuthContext';
import theme from '../styles/theme';
import {navigate} from '../helpers/navigationRef';

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

const AuthForm = ({onSubmit, authTitle, redirectRouteName, redirectLinkText}) => {
  const {
    state: {errorMessage},
  } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.signupWrapper}>
      <Title style={styles.authFormTitle}>{authTitle}</Title>
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.authFormInput}
        theme={{colors: theme.colors}}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        mode="outlined"
        theme={{colors: theme.colors}}
        style={styles.authFormInput}
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? <Title style={styles.authFormErrorMessage}>{errorMessage}</Title> : null}
      <Button
        mode="contained"
        color={theme.colors.primary}
        style={styles.authFormSubmitButton}
        onPress={() => onSubmit(email, password)}>
        {authTitle}
      </Button>
      <TouchableOpacity onPress={() => navigate(redirectRouteName)}>
        <Text style={styles.styledRedirectLinkText}>{redirectLinkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authTitle: PropTypes.string.isRequired,
  redirectRouteName: PropTypes.string.isRequired,
  redirectLinkText: PropTypes.string.isRequired,
};

export default AuthForm;
