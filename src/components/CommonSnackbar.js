import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
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
    flexDirection: 'row',
    alignItems: 'center',
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
    <Snackbar visible={isVisible} style={[styles.snackbarWrapper, renderVariant()]}>
      <Text style={styles.snackbarText}>{text}</Text>
    </Snackbar>
  );
};

CommonSnackbar.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([SUCCESS, ERROR, DEFAULT]).isRequired,
};

export default CommonSnackbar;
