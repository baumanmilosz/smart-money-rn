import React, {useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import Loader from '../components/Loader';

const SignupScreen = () => {
  const {
    state: {isLoading},
    signup,
  } = useContext(AuthContext);
  console.log(isLoading);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AuthForm
          onSubmit={signup}
          authTitle="Sign Up"
          redirectRouteName="Signin"
          redirectLinkText="Already have an account? Log in instead!"
        />
      )}
    </>
  );
};

export default SignupScreen;
