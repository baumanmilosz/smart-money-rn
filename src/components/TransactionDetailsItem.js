import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {Caption, Divider} from 'react-native-paper';

const styles = {
  transactionDetailsItemWrapper: {
    padding: 5,
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
  },
};

const TransactionDetailsItem = ({caption, value}) => {
  return (
    <View style={styles.transactionDetailsItemWrapper}>
      <Caption>{caption}</Caption>
      <Divider />
      <Text style={styles.itemText}>{value}</Text>
    </View>
  );
};

TransactionDetailsItem.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TransactionDetailsItem;
