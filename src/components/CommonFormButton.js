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

const CommonFormButton = ({title, onSubmit, isDisabled, style, icon}) => {
  return (
    <Button
      mode="contained"
      color={theme.colors.primary}
      style={[style, styles.commonFormButton]}
      onPress={onSubmit}
      disabled={isDisabled}
      icon={icon}>
      {title}
    </Button>
  );
};

CommonFormButton.defaultProps = {
  isDisabled: false,
  style: null,
  icon: '',
};

CommonFormButton.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  icon: PropTypes.string,
};

export default CommonFormButton;
