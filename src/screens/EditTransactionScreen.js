import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import CommonHeader from '../components/CommonHeader';
import {Context as TransactionContext} from '../context/TransactionContext';
import TransactionForm from '../components/TransactionForm';
import {Context as CategoryContext} from '../context/CategoryContext';

const AddTransactionScreen = ({route}) => {
  const {
    state: {isLoading},
    editTransaction,
  } = useContext(TransactionContext);

  const {
    state: {income, expense},
  } = useContext(CategoryContext);

  const {_id} = route.params;
  return (
    <>
      <CommonHeader text="Edit transaction" />
      <TransactionForm
        submitButtonAction={(type, title, category, price, date) =>
          editTransaction(type, title, category, price, date, _id)
        }
        submitButtonText="Edit transaction"
        income={income}
        expense={expense}
        isLoading={isLoading}
      />
    </>
  );
};

AddTransactionScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default AddTransactionScreen;
