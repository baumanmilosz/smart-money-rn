import React from 'react';
import {View} from 'react-native';
import ActivityIndicator from 'react-native-paper/src/components/ActivityIndicator';
import theme from '../styles/theme';

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator animating color={theme.colors.primary} />
    </View>
  );
};

export default Loader;
