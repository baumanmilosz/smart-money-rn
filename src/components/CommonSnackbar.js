import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {Snackbar} from 'react-native-paper';
import theme from '../styles/theme';

const SUCCESS = 'success';
const ERROR = 'error';
const DEFAULT = 'default';
const VISIBILITY_TIME = 4000;

const styles = StyleSheet.create({
  snackbarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  successSnackbar: {
    backgroundColor: theme.colors.green,
  },
  errorSnackbar: {
    backgroundColor: theme.colors.red,
  },
  defaultSnackbar: {
    backgroundColor: theme.colors.primary,
  },
});

const CommonSnackbar = ({text, variant}) => {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), VISIBILITY_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const renderVariant = () => {
    switch (variant) {
      case SUCCESS:
        return styles.successSnackbar;
      case ERROR:
        return styles.errorSnackbar;
      case DEFAULT:
        return styles.defaultSnackbar;
      default:
        return true;
    }
  };

  return (
    <View style={[styles.snackbarWrapper]}>
      <Snackbar visible={isVisible} style={[styles.snackbarWrapper, renderVariant()]}>
        <Text>{text}</Text>
      </Snackbar>
    </View>
  );
};

CommonSnackbar.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([SUCCESS, ERROR, DEFAULT]).isRequired,
};

export default CommonSnackbar;
