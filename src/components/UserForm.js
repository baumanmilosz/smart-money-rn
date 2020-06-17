import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import CommonView from './CommonView';
import theme from '../styles/theme';
import CommonFormButton from './CommonFormButton';
import {Context as AuthContext} from '../context/AuthContext';

const styles = StyleSheet.create({
  authFormInput: {
    marginVertical: 10,
    backgroundColor: theme.colors.white,
  },
});

const UserForm = ({t}) => {
  const {
    state: {
      userInfo: {firstName, lastName, email},
    },
  } = useContext(AuthContext);
  const [newFirstName, setFirstName] = useState(firstName);
  const [newLastName, setLastName] = useState(lastName);
  const [newEmail, setEmail] = useState(email);

  const _checkIfDisable = () => {
    return firstName === newFirstName && lastName === newLastName && email === newEmail;
  };

  return (
    <CommonView>
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
      <CommonFormButton title={t('save')} isDisabled={_checkIfDisable()} />
    </CommonView>
  );
};

UserForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(UserForm);
