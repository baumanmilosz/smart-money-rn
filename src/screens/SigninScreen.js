import React, {useContext} from 'react';
import {withTranslation} from 'react-i18next';
import {Context as AuthContext} from '../context/AuthContext';
import Loader from '../components/Loader';
import CommonSnackbar from '../components/CommonSnackbar';
import SigninForm from '../components/SigninForm';

const SigninScreen = () => {
  const {
    state: {isLoading, errorMessage},
  } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SigninForm />
          {errorMessage ? <CommonSnackbar variant="error" text={errorMessage} /> : null}
        </>
      )}
    </>
  );
};

export default withTranslation()(SigninScreen);
