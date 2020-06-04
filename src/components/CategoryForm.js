import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption, RadioButton, TextInput} from 'react-native-paper';
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

const CategoryForm = () => {
  const [type, setType] = useState(TransactionType.expense);
  const [name, setName] = useState('');
  const {addCategory} = useContext(CategoryContext);

  return (
    <View style={styles.transactionWrapper}>
      <Caption style={styles.captionForm}>Choose category type:</Caption>
      <View>
        <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
          <View style={styles.singleTransactionType}>
            <RadioButton value={TransactionType.expense} color={theme.colors.primary} />
            <Caption style={{color: theme.colors.primary, fontSize: 13}}>Expense</Caption>
          </View>
          <View style={styles.singleTransactionType}>
            <RadioButton value={TransactionType.income} color={theme.colors.primary} />
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
      <CommonFormButton onSubmit={() => addCategory(type, name)} title="Add category" />
    </View>
  );
};

export default CategoryForm;
