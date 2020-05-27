import React, {useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const SigninScreen = () => {
  const {signin} = useContext(AuthContext);

  return (
    <AuthForm
      onSubmit={signin}
      authTitle="Sign In"
      redirectRouteName="Signup"
      redirectLinkText="You don't hava an account? Register now!"
    />
  );
};

export default SigninScreen;
