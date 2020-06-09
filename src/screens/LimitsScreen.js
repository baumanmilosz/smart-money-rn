import React, {useContext, useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';
import TransactionTypeField from '../components/TransactionTypeField';
import TransactionType from '../constans/TransactionType';
import CommonView from '../components/CommonView';
import theme from '../styles/theme';
import TransactionsCategory from '../constans/TransactionsCategory';
import {Context as CategoryContext} from '../context/CategoryContext';
import {Context as LimitContext} from '../context/LimitContext';
import CommonFormButton from '../components/CommonFormButton';

const styles = StyleSheet.create({
  transactionWrapper: {
    padding: 10,
  },
  transactionInput: {
    marginVertical: 8,
  },
  categoryPickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: 5,
  },
});

const LimitsScreen = () => {
  const [type, setType] = useState(TransactionType.expense);
  const [category, setCategory] = useState(TransactionsCategory.expenses[0].value);
  const [limitValue, setLimitValue] = useState('');

  const {
    state: {income, expense},
    getCategories,
  } = useContext(CategoryContext);

  const {setLimit} = useContext(LimitContext);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getCategories();
    });
  }, []);

  const renderCategories = () => {
    if (type === TransactionType.expense) {
      return expense.map((item) => {
        return <Picker.Item key={item.categoryId} label={item.name} value={item.name} />;
      });
    }
    return income.map((item) => {
      return <Picker.Item key={item.categoryId} label={item.name} value={item.name} />;
    });
  };

  return (
    <>
      <CommonHeader text="Limits" />
      <CommonView>
        <TransactionTypeField type={type} setType={setType} />
        <View style={[styles.categoryPickerWrapper, styles.transactionInput]}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            prompt="Select category">
            {expense.length > 0 && income.length > 0 ? (
              renderCategories()
            ) : (
              <Picker.Item value="" label="Select category" color={theme.colors.gray} />
            )}
          </Picker>
        </View>
        <TextInput
          label="Limit"
          mode="outlined"
          theme={{colors: theme.colors}}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          contextMenuHidden
          returnKeyType="next"
          value={limitValue}
          onChangeText={(value) => setLimitValue(value)}
        />
        <CommonFormButton onSubmit={() => setLimit(type, category, limitValue)} title="Set limit" />
      </CommonView>
    </>
  );
};

export default LimitsScreen;
