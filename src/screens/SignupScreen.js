import React, {useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import Loader from '../components/Loader';
import CommonSnackbar from '../components/CommonSnackbar';
import SignupFrom from '../components/SignupForm';

const SignupScreen = () => {
  const {
    state: {isLoading, errorMessage},
  } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SignupFrom />
          {errorMessage ? <CommonSnackbar variant="error" text={errorMessage} /> : null}
        </>
      )}
    </>
  );
};

export default SignupScreen;
