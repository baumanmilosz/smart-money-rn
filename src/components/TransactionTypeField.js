import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Caption, RadioButton} from 'react-native-paper';
import theme from '../styles/theme';
import TransactionType from '../constans/TransactionType';

const styles = StyleSheet.create({
  titleField: {
    marginTop: 10,
    fontSize: 15,
    color: theme.colors.primary,
  },
  radioButtonLabel: {
    color: theme.colors.primary,
    fontSize: 13,
  },
  singleTransactionType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

const TransactionTypeField = ({type, setType}) => {
  return (
    <>
      <Caption style={styles.titleField}>Choose transaction type:</Caption>
      <View>
        <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
          <View style={styles.singleTransactionType}>
            <RadioButton value={TransactionType.expense} color={theme.colors.primary} />
            <Caption style={styles.radioButtonLabel}>Expense</Caption>
          </View>
          <View style={styles.singleTransactionType}>
            <RadioButton value={TransactionType.income} color={theme.colors.primary} />
            <Caption style={styles.radioButtonLabel}>Income</Caption>
          </View>
        </RadioButton.Group>
      </View>
    </>
  );
};

TransactionTypeField.propTypes = {
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
};

export default TransactionTypeField;
