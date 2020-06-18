import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import theme from '../styles/theme';

const styles = StyleSheet.create({
  styledNavSectionTitle: {
    marginLeft: 15,
    marginVertical: 15,
    fontWeight: 'bold',
    color: theme.colors.captionColor,
  },
});

const CommonNavSectionTitle = ({title}) => {
  return <Text style={[styles.styledNavSectionTitle]}>{title}</Text>;
};

CommonNavSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CommonNavSectionTitle;
