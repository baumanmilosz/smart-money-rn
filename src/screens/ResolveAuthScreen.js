import {useContext, useEffect} from 'react';
import {Context as AuthContext} from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const {tryAutoSignIn, checkConnection} = useContext(AuthContext);
  useEffect(async () => {
    await checkConnection();
    tryAutoSignIn();
  }, []);
  return null;
};

export default ResolveAuthScreen;
