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
};

const CommonListItem = ({caption, value, isActual, type}) => {
  const {
    state: {plannedIncomesLimit, plannedExpensesLimit, actualIncomesLimit, actualExpensesLimit},
  } = useContext(LimitContext);

  const renderStyle = (percent) => {
    if (percent > 100) return {color: theme.colors.red};
    return {color: theme.colors.green};
  };

  const renderUsagePercent = () => {
    if (type === TransactionType.expense) {
      const percent = `${(actualExpensesLimit / plannedExpensesLimit) * 100}`;
      return (
        <Caption style={renderStyle(percent)}>
          {Number.isNaN(percent) ? `${Math.round(percent)}` : '-'}%
        </Caption>
      );
    }
    const percent = `${(actualIncomesLimit / plannedIncomesLimit) * 100}`;
    return (
      <Caption style={renderStyle(percent)}>
        {Number.isNaN ? `${Math.round(percent)}` : '-'}%
      </Caption>
    );
  };

  return (
    <View style={styles.transactionDetailsItemWrapper}>
      <View style={styles.captionsWrapper}>
        <Caption>{caption}</Caption>
        <Caption>{isActual && <Caption>{renderUsagePercent()}</Caption>}</Caption>
      </View>
      <Divider />
      <Text style={styles.itemText}>{typeof value === 'number' ? `${value} zł` : value}</Text>
    </View>
  );
};

CommonListItem.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isActual: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default CommonListItem;
