import React, {useContext, useEffect} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import Loader from '../components/Loader';

const ResolveAuthScreen = () => {
  const {tryAutoSignin} = useContext(AuthContext);
  useEffect(() => {
    tryAutoSignin();
  }, []);
  return <Loader />;
};

export default ResolveAuthScreen;
