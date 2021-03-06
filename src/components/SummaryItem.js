import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Subheading} from 'react-native-paper';
import theme from '../styles/theme';
import CommonListItem from './CommonListItem';
import TransactionType from '../constans/TransactionType';
import {Context as NavigationContext} from '../context/NavigationContext';

const SummaryItem = ({
  title,
  incomeCaption,
  incomeValue,
  expenseCaption,
  expenseValue,
  isActual,
}) => {
  const {
    state: {isDarkMode},
  } = useContext(NavigationContext);
  const styles = StyleSheet.create({
    summaryItemWrapper: {
      marginVertical: 10,
    },
    itemTitle: {
      textTransform: 'uppercase',
      color: isDarkMode ? theme.dark.fontPrimary : theme.colors.primary,
    },
  });
  return (
    <View style={styles.summaryItemWrapper}>
      <Subheading style={styles.itemTitle}>{title}</Subheading>
      <CommonListItem
        caption={incomeCaption}
        value={incomeValue || '-'}
        isActual={isActual}
        type={TransactionType.income}
      />
      <CommonListItem
        caption={expenseCaption}
        value={expenseValue || '-'}
        isActual={isActual}
        type={TransactionType.expense}
      />
    </View>
  );
};

SummaryItem.defaultProps = {
  incomeValue: '',
  expenseValue: '',
  isActual: false,
};

SummaryItem.propTypes = {
  title: PropTypes.string.isRequired,
  incomeCaption: PropTypes.string.isRequired,
  expenseCaption: PropTypes.string.isRequired,
  incomeValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  expenseValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isActual: PropTypes.bool,
};

export default SummaryItem;
