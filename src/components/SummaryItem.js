import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Subheading} from 'react-native-paper';
import theme from '../styles/theme';
import CommonListItem from './CommonListItem';

const styles = StyleSheet.create({
  summaryItemWrapper: {
    marginVertical: 10,
  },
  itemTitle: {textTransform: 'uppercase', color: theme.colors.primary},
});

const SummaryItem = ({title, incomeCaption, incomeValue, expenseCaption, expenseValue}) => {
  return (
    <View style={styles.summaryItemWrapper}>
      <Subheading style={styles.itemTitle}>{title}</Subheading>
      <CommonListItem caption={incomeCaption} value={incomeValue || '-'} />
      <CommonListItem caption={expenseCaption} value={expenseValue || '-'} />
    </View>
  );
};

SummaryItem.defaultProps = {
  incomeValue: '',
  expenseValue: '',
};

SummaryItem.propTypes = {
  title: PropTypes.string.isRequired,
  incomeCaption: PropTypes.string.isRequired,
  expenseCaption: PropTypes.string.isRequired,
  incomeValue: PropTypes.number,
  expenseValue: PropTypes.number,
};

export default SummaryItem;
