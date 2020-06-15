import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import Loader from '../components/Loader';
import CommonSnackbar from '../components/CommonSnackbar';

const SigninScreen = ({t}) => {
  const {
    state: {isLoading, errorMessage},
    signin,
  } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AuthForm
            onSubmit={signin}
            authTitle={t('auth:signin_title')}
            submitButton={t('auth:signin_button')}
            redirectRouteName="Signup"
            redirectLinkText={t('auth:signin_redirect_link')}
          />
          {errorMessage ? <CommonSnackbar variant="error" text={errorMessage} /> : null}
        </>
      )}
    </>
  );
};

SigninScreen.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SigninScreen);
