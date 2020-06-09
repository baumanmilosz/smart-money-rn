import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../styles/theme';
import ButtonIcon from './ButtonIcon';
import {Context as CategoryContex} from '../context/CategoryContext';
import {navigate} from '../helpers/navigationRef';

const styles = StyleSheet.create({
  categoryItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 2,
    backgroundColor: theme.colors.white,
  },
  categoryActionButtonsWrapper: {
    flexDirection: 'row',
  },
});

const CategoryItem = ({name, type}) => {
  const {deleteCategory} = useContext(CategoryContex);
  return (
    <View style={[styles.categoryItemWrapper]}>
      <Text>{name}</Text>
      <View style={styles.categoryActionButtonsWrapper}>
        <ButtonIcon
          name="pencil"
          size={20}
          onPress={() => navigate('EditCategory', {name, type})}
        />
        <ButtonIcon name="delete" size={20} onPress={() => deleteCategory(name, type)} />
      </View>
    </View>
  );
};

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CategoryItem;
