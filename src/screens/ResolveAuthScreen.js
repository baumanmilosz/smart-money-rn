import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import ActivityIndicator from 'react-native-paper/src/components/ActivityIndicator';
import {Context as AuthContext} from '../context/AuthContext';
import theme from '../styles/theme';

const ResolveAuthScreen = () => {
  const {tryAutoSignin} = useContext(AuthContext);
  useEffect(() => {
    tryAutoSignin();
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator animating color={theme.colors.primary} />
    </View>
  );
};

export default ResolveAuthScreen;
