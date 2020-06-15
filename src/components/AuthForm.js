import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput, Title} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import theme from '../styles/theme';
import {navigate} from '../helpers/navigationRef';
import LangButtonsMolecule from './LangButtonsMolecule';
import CommonFormButton from './CommonFormButton';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const inputRef = useRef();

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
        returnKeyType="next"
        onSubmitEditing={() => inputRef.current.focus()}
      />
      <TextInput
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
};

export default withTranslation()(AuthForm);
