import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  styledCommonView: {
    flex: 1,
    padding: 5,
  },
});

const CommonView = ({children, style}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.styledCommonView, style]}>
      {children}
    </ScrollView>
  );
};

CommonView.defaultProps = {
  style: null,
};

CommonView.propTypes = {
  children: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default CommonView;
