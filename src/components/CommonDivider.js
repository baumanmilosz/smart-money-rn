import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';
import theme from '../styles/theme';

const styles = StyleSheet.create({
  styledDivider: {
    backgroundColor: theme.colors.dividerColor,
  },
});

const CommonDivider = () => {
  return <Divider style={styles.styledDivider} />;
};

export default CommonDivider;
