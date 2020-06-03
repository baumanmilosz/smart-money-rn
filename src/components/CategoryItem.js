import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../styles/theme';

const CategoryItem = ({name, estimate}) => {
  const styles = StyleSheet.create({
    categoryItemWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      marginBottom: 2,
      backgroundColor: theme.colors.white,
    },
  });
  return (
    <View style={[styles.categoryItemWrapper]}>
      <Text>{name}</Text>
      <Text>{estimate} zł</Text>
    </View>
  );
};

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  estimate: PropTypes.string.isRequired,
};

export default CategoryItem;
