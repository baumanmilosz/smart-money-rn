import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import CommonFormButton from '../components/CommonFormButton';
import {Context as TransactionContext} from '../context/TransactionContext';

const TransactionDetailsScreen = ({route}) => {
  const {_id} = route.params;
  const {removeTransactionListItem} = useContext(TransactionContext);

  return (
    <View>
      <CommonHeader text="Transaction Item" />
      <CommonFormButton
        onSubmit={() => removeTransactionListItem(_id)}
        title="Remove transaction"
      />
    </View>
  );
};

TransactionDetailsScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default TransactionDetailsScreen;
