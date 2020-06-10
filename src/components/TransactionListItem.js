import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import theme from '../styles/theme';
import TransactionType from '../constans/TransactionType';

const styles = StyleSheet.create({
  transactionListItemWrapper: {
    padding: 10,
    marginBottom: 2,
    backgroundColor: theme.colors.white,
  },
  transactionItemInnerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  detail: {
    fontSize: 18,
  },
  subDetail: {
    fontSize: 13,
    color: theme.colors.gray,
  },
});

const TransactionListItem = ({type, title, price, category, date, showDetails}) => {
  const getColorPrice = () => {
    if (type === TransactionType.expense) return theme.colors.red;
    return theme.colors.green;
  };
  return (
    <TouchableOpacity onPress={showDetails}>
      <View style={styles.transactionListItemWrapper}>
        <View style={styles.transactionItemInnerWrapper}>
          <Text style={styles.detail}>{title}</Text>
          <Text style={[styles.detail, {color: getColorPrice()}]}>{price} zł</Text>
        </View>
        <View style={styles.transactionItemInnerWrapper}>
          <Text style={styles.subDetail}>{category}</Text>
          <Text style={styles.subDetail}>{moment(date).format('MM/DD/YY')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

TransactionListItem.defaultProps = {
  price: '',
};

TransactionListItem.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  showDetails: PropTypes.func.isRequired,
};

export default TransactionListItem;
