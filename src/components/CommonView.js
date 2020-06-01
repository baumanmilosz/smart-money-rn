import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  styledCommonView: {
    flex: 1,
    padding: 5,
  },
});

const CommonView = ({children}) => {
  return <View style={styles.styledCommonView}>{children}</View>;
};

CommonView.propTypes = {
  children: PropTypes.object.isRequired,
};

export default CommonView;
