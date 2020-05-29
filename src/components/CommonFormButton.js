import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import theme from '../styles/theme';

const styles = StyleSheet.create({
  commonFormButton: {
    marginVertical: 15,
  },
});

const CommonFormButton = ({title, onSubmit, isDisabled}) => {
  return (
    <Button
      mode="contained"
      color={theme.colors.primary}
      style={styles.commonFormButton}
      onPress={onSubmit}
      disabled={isDisabled}>
      {title}
    </Button>
  );
};

CommonFormButton.defaultProps = {
  isDisabled: false,
};

CommonFormButton.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default CommonFormButton;
