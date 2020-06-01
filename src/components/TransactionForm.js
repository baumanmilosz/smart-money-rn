import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Caption, RadioButton, TextInput, HelperText} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../styles/theme';
import TransactionType from '../constans/TransactionType';
import TransactionsCategory from '../constans/TransactionsCategory';
import CommonFormButton from './CommonFormButton';
import CommonView from './CommonView';

const styles = StyleSheet.create({
  expenseWrapper: {
    padding: 10,
  },
  transactionInput: {
    marginVertical: 8,
  },
  categoryPickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: 5,
  },
  singleTransactionType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

const TransactionForm = ({submitButtonAction, submitButtonText}) => {
  const [type, setType] = useState(TransactionType.expense);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(TransactionsCategory.expenses[0].value);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const priceInputRef = useRef(null);
  const [isPriceError, setPriceError] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // eslint-disable-next-line no-undef
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const renderTransactionItems = () => {
    if (type === TransactionType.expense) {
      return TransactionsCategory.expenses.map((item) => (
        <Picker.Item key={item.id} label={item.value} value={item.value} />
      ));
    }
    return TransactionsCategory.incomes.map((item) => (
      <Picker.Item key={item.id} label={item.value} value={item.value} />
    ));
  };

  const _checkPriceValidation = () => {
    const regExp = /^\d+(.\d{1,2})?$/g;
    const isValid = regExp.test(price);
    if (!isValid) return setPriceError(true);
    return setPriceError(false);
  };
  return (
    <CommonView>
      <View style={styles.expenseWrapper}>
        <Caption style={{marginTop: 10, fontSize: 15, color: theme.colors.primary}}>
          Choose transaction type:
        </Caption>
        <View>
          <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
            <View style={styles.singleTransactionType}>
              <RadioButton value={TransactionType.expense} color={theme.colors.primary} />
              <Caption style={{color: theme.colors.primary, fontSize: 13}}>Expense</Caption>
            </View>
            <View style={styles.singleTransactionType}>
              <RadioButton value={TransactionType.income} color={theme.colors.primary} />
              <Caption style={{color: theme.colors.primary, fontSize: 13}}>Income</Caption>
            </View>
          </RadioButton.Group>
        </View>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(value) => setTitle(value)}
          mode="outlined"
          theme={{colors: theme.colors}}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.transactionInput}
          returnKeyType="next"
          onSubmitEditing={() => priceInputRef.current.focus()}
        />
        <View style={[styles.categoryPickerWrapper, styles.transactionInput]}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            prompt="Select category">
            {TransactionsCategory && renderTransactionItems()}
          </Picker>
        </View>
        <TextInput
          ref={priceInputRef}
          label="Price"
          mode="outlined"
          theme={{colors: theme.colors}}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.transactionInput}
          keyboardType="numeric"
          contextMenuHidden
          returnKeyType="next"
          value={price}
          onChangeText={(value) => setPrice(value)}
          onBlur={() => _checkPriceValidation()}
        />
        {isPriceError && (
          <HelperText type="error" visible={isPriceError}>
            Enter price in correct format [XX.XX].
          </HelperText>
        )}
        <TouchableOpacity onPress={() => setShow(true)}>
          <TextInput
            label="Date"
            mode="outlined"
            theme={{colors: theme.colors}}
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            value={moment(date).format('MM/DD/YY')}
            style={styles.transactionInput}
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            id="date"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <CommonFormButton
          onSubmit={(_id = undefined) =>
            submitButtonAction(type, title, category, price, date, _id)
          }
          title={submitButtonText}
          isDisabled={!type || !title || !category || !price || !date}
        />
      </View>
    </CommonView>
  );
};

TransactionForm.propTypes = {
  submitButtonAction: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};

export default TransactionForm;