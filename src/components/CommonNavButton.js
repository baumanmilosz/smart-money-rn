import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';

const CommonNavButton = ({icon, color, handleNavigation}) => {
  return (
    <TouchableOpacity onPress={handleNavigation}>
      <Icon name={icon} size={25} color={color || '#fff'} />
    </TouchableOpacity>
  );
};

CommonNavButton.defaultProps = {
  color: '',
};

CommonNavButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  handleNavigation: PropTypes.func.isRequired,
};

export default CommonNavButton;
