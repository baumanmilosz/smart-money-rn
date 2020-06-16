import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {Caption, Divider} from 'react-native-paper';
import {Context as LimitContext} from '../context/LimitContext';
import TransactionType from '../constans/TransactionType';
import theme from '../styles/theme';

const styles = {
  transactionDetailsItemWrapper: {
    padding: 5,
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
  },
  captionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  styledUsagePercent: {
    fontWeight: 'bold',
  },
};

const CommonListItem = ({caption, value, isActual, type}) => {
  const {
    state: {plannedIncomesLimit, plannedExpensesLimit, actualIncomesLimit, actualExpensesLimit},
  } = useContext(LimitContext);

  const renderStyle = (percent) => {
    if (
      (type === TransactionType.expense && percent > 100) ||
      (type === TransactionType.income && percent < 100)
    )
      return {color: theme.colors.red};
    return {color: theme.colors.green};
  };

  const renderUsagePercent = () => {
    if (isActual) {
      const incomePercent = Math.round((actualIncomesLimit / plannedIncomesLimit) * 100) || '-';
      const expensePercent = Math.round((actualExpensesLimit / plannedExpensesLimit) * 100) || '-';
      return (
        <Caption
          style={[
            styles.styledUsagePercent,
            renderStyle(type === TransactionType.income ? incomePercent : expensePercent),
          ]}>
          {type === TransactionType.income ? incomePercent : expensePercent}%
        </Caption>
      );
    }
    return null;
  };

  return (
    <View style={styles.transactionDetailsItemWrapper}>
      <View style={styles.captionsWrapper}>
        <Caption>{caption}</Caption>
        {renderUsagePercent()}
      </View>
      <Divider />
      <Text style={styles.itemText}>{typeof value === 'number' ? `${value} zł` : value}</Text>
    </View>
  );
};

CommonListItem.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]).isRequired,
  isActual: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default CommonListItem;
