import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import theme from '../styles/theme';
import TransactionType from '../constans/TransactionType';

const styles = StyleSheet.create({
  transactionListItemWrapper: {
    padding: 15,
    marginBottom: 2,
    backgroundColor: '#F5F3F3',
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
    fontSize: 14,
    color: theme.colors.gray,
  },
});

const TransactionListItem = ({type, title, price, category, date}) => {
  const getColorPrice = () => {
    if (type === TransactionType.expense) return theme.colors.red;
    return theme.colors.green;
  };
  return (
    <>
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
    </>
  );
};

TransactionListItem.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default TransactionListItem;
