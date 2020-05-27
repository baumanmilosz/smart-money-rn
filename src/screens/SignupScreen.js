import React, {useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const SignupScreen = () => {
  const {signup} = useContext(AuthContext);

  return (
    <AuthForm
      onSubmit={signup}
      authTitle="Sign Up"
      redirectRouteName="Signin"
      redirectLinkText="Already have an account? Log in instead!"
    />
  );
};

export default SignupScreen;
