import React, {useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import Loader from '../components/Loader';

const SigninScreen = () => {
  const {
    state: {isLoading},
    signin,
  } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AuthForm
          onSubmit={signin}
          authTitle="Sign In"
          redirectRouteName="Signup"
          redirectLinkText="You don't hava an account? Register now!"
        />
      )}
    </>
  );
};

export default SigninScreen;
