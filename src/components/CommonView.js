import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

const CommonView = ({children}) => {
  return <View style={{flex: 1}}>{children}</View>;
};

CommonView.propTypes = {
  children: PropTypes.array.isRequired,
};

export default CommonView;
