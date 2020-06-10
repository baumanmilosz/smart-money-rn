import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import theme from '../styles/theme';
import CommonView from './CommonView';

const styles = StyleSheet.create({
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  styledText: {
    color: theme.colors.gray,
    fontSize: 20,
    textTransform: 'uppercase',
  },
});

const PlaceholderText = ({text}) => {
  return (
    <CommonView contentStyle={styles.textWrapper}>
      <Text style={styles.styledText}>{text}</Text>
    </CommonView>
  );
};

PlaceholderText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PlaceholderText;
