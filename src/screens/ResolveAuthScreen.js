import {useContext, useEffect} from 'react';
import {Context as AuthContext} from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const {tryAutoSignIn} = useContext(AuthContext);
  useEffect(() => {
    tryAutoSignIn();
  }, []);
  return null;
};

export default ResolveAuthScreen;
