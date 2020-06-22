import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';
import {Context as TransactionContext} from '../context/TransactionContext';
import {Context as CategoryContext} from '../context/CategoryContext';
import TransactionForm from '../components/TransactionForm';

const AddTransactionScreen = () => {
  const {
    state: {isLoading},
    addTransaction,
  } = useContext(TransactionContext);

  const {
    state: {income, expense},
    getCategories,
  } = useContext(CategoryContext);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getCategories();
    });
  }, [navigation]);

  return (
    <>
      <CommonHeader text="Add transaction" />
      <TransactionForm
        submitButtonAction={(type, title, category, price, date) =>
          addTransaction(type, title, category, price, date)
        }
        submitButtonText="Add transaction"
        income={income}
        expense={expense}
        isLoading={isLoading}
      />
    </>
  );
};

export default AddTransactionScreen;
