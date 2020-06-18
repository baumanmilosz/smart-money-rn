import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Caption, RadioButton} from 'react-native-paper';
import theme from '../styles/theme';
import TransactionType from '../constans/TransactionType';

const TransactionTypeField = ({type, setType, isDarkMode}) => {
  const color = isDarkMode ? theme.dark.fontPrimary : theme.colors.primary;
  const styles = StyleSheet.create({
    titleField: {
      marginTop: 10,
      fontSize: 15,
      color,
    },
    radioButtonLabel: {
      color,
      fontSize: 13,
    },
    singleTransactionType: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
    },
  });

  return (
    <>
      <Caption style={styles.titleField}>Choose transaction type:</Caption>
      <View>
        <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
          <View style={styles.singleTransactionType}>
            <RadioButton
              value={TransactionType.expense}
              color={theme.colors.primary}
              uncheckedColor={theme.colors.captionColor}
            />
            <Caption style={styles.radioButtonLabel}>Expense</Caption>
          </View>
          <View style={styles.singleTransactionType}>
            <RadioButton
              value={TransactionType.income}
              color={theme.colors.primary}
              uncheckedColor={theme.colors.captionColor}
            />
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
  isDarkMode: PropTypes.bool.isRequired,
};

export default TransactionTypeField;
