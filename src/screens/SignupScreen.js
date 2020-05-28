import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import Loader from '../components/Loader';

const SignupScreen = ({t}) => {
  const {
    state: {isLoading},
    signup,
  } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AuthForm
            onSubmit={signup}
            authTitle={t('auth:signup_title')}
            submitButton={t('auth:sigup_button')}
            redirectRouteName="Signin"
            redirectLinkText={t('auth:signup_redirect_link')}
          />
        </>
      )}
    </>
  );
};

SignupScreen.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SignupScreen);
