import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Caption, RadioButton, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import theme from '../styles/theme';
import TransactionType from '../constans/TransactionType';
import CommonFormButton from './CommonFormButton';
import {Context as CategoryContext} from '../context/CategoryContext';

const styles = StyleSheet.create({
  transactionWrapper: {
    padding: 10,
  },
  captionForm: {marginTop: 10, fontSize: 15, color: theme.colors.primary},
  singleTransactionType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryInput: {
    marginVertical: 8,
  },
});

const CategoryForm = ({submitButtonText, submitButtonAction, isEditForm}) => {
  const [type, setType] = useState(TransactionType.expense);
  const [name, setName] = useState('');
  const {
    state: {isLoading},
  } = useContext(CategoryContext);
  const navigation = useNavigation();
  useEffect(() => {
    return () =>
      navigation.addListener('blur', () => {
        setName('');
      });
  });

  return (
    <View style={styles.transactionWrapper}>
      <Caption style={styles.captionForm}>Choose category type:</Caption>
      <View>
        <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
          <View style={styles.singleTransactionType}>
            <RadioButton
              value={TransactionType.expense}
              color={theme.colors.primary}
              disabled={isEditForm}
            />
            <Caption style={{color: theme.colors.primary, fontSize: 13}}>Expense</Caption>
          </View>
          <View style={styles.singleTransactionType}>
            <RadioButton
              value={TransactionType.income}
              color={theme.colors.primary}
              disabled={isEditForm}
            />
            <Caption style={{color: theme.colors.primary, fontSize: 13}}>Income</Caption>
          </View>
        </RadioButton.Group>
      </View>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(value) => setName(value)}
        mode="outlined"
        theme={{colors: theme.colors}}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.categoryInput}
        returnKeyType="next"
      />
      <CommonFormButton
        onSubmit={
          isEditForm
            ? (categoryType = undefined, categoryName = undefined) =>
                submitButtonAction(name, categoryType, categoryName)
            : () => submitButtonAction(type, name)
        }
        title={submitButtonText}
        loading={isLoading}
      />
    </View>
  );
};

CategoryForm.defaultProps = {
  isEditForm: false,
};

CategoryForm.propTypes = {
  submitButtonText: PropTypes.string.isRequired,
  submitButtonAction: PropTypes.func.isRequired,
  isEditForm: PropTypes.bool,
};

export default CategoryForm;
