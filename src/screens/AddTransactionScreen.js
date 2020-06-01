import React, {useContext} from 'react';
import CommonHeader from '../components/CommonHeader';
import {Context as TransactionContext} from '../context/TransactionContext';
import Loader from '../components/Loader';
import TransactionForm from '../components/TransactionForm';

const AddTransactionScreen = () => {
  const {
    state: {isLoading},
    addTransaction,
  } = useContext(TransactionContext);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CommonHeader text="Add transaction" />
          <TransactionForm
            submitButtonAction={(type, title, category, price, date) =>
              addTransaction(type, title, category, price, date)
            }
            submitButtonText="Add transaction"
          />
        </>
      )}
    </>
  );
};

export default AddTransactionScreen;
