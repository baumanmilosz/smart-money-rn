import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import CommonHeader from '../components/CommonHeader';
import {Context as TransactionContext} from '../context/TransactionContext';
import Loader from '../components/Loader';
import TransactionForm from '../components/TransactionForm';

const AddTransactionScreen = ({route}) => {
  const {
    state: {isLoading},
    editTransaction,
  } = useContext(TransactionContext);

  const {_id} = route.params;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CommonHeader text="Edit transaction" />
          <TransactionForm
            submitButtonAction={(type, title, category, price, date) =>
              editTransaction(type, title, category, price, date, _id)
            }
            submitButtonText="Edit transaction"
          />
        </>
      )}
    </>
  );
};

AddTransactionScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default AddTransactionScreen;
