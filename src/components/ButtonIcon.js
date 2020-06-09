import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  buttonIconWrapper: {
    margin: 5,
  },
});

const ButtonIcon = ({name, size, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonIconWrapper}>
      <MaterialCommunityIcons name={name} size={size} />
    </TouchableOpacity>
  );
};

ButtonIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ButtonIcon;
