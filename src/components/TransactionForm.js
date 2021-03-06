import React, {useState, useRef, useContext} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../styles/theme';
import TransactionType from '../constans/TransactionType';
import TransactionsCategory from '../constans/TransactionsCategory';
import CommonFormButton from './CommonFormButton';
import CommonView from './CommonView';
import TransactionTypeField from './TransactionTypeField';
import CommonSnackbar from './CommonSnackbar';
import {Context as TransactionContext} from '../context/TransactionContext';
import {Context as SettingsContext} from '../context/SettingsContext';
import getCurrentMonth from '../helpers/getCurrentMonth';
import {Context as NavigationContext} from '../context/NavigationContext';

const styles = StyleSheet.create({
  transactionWrapper: {
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
});

const TransactionForm = ({submitButtonAction, submitButtonText, income, expense, isLoading}) => {
  const {
    state: {errorMessage},
  } = useContext(TransactionContext);
  const {
    state: {currentMonth},
  } = useContext(SettingsContext);
  const {
    state: {isDarkMode},
  } = useContext(NavigationContext);
  const [type, setType] = useState(TransactionType.expense);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(TransactionsCategory.expenses[0].value);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(
    new Date(2020, getCurrentMonth(currentMonth), new Date().getDate())
  );

  const [show, setShow] = useState(false);
  const priceInputRef = useRef(null);

  const MIN_DATE = new Date(2020, getCurrentMonth(currentMonth), 1);
  const MAX_DATE = new Date(2020, getCurrentMonth(currentMonth), 31);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // eslint-disable-next-line no-undef
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const renderCategories = () => {
    if (type === TransactionType.expense) {
      return expense.map((item) => {
        return <Picker.Item key={item.name} label={item.name} value={item.name} />;
      });
    }
    return income.map((item) => {
      return <Picker.Item key={item.name} label={item.name} value={item.name} />;
    });
  };

  return (
    <CommonView>
      <View style={styles.transactionWrapper}>
        <TransactionTypeField type={type} setType={setType} isDarkMode={isDarkMode} />
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
            {income.length > 0 || expense.length > 0 ? (
              renderCategories()
            ) : (
              <Picker.Item value="" label="Select category" color={theme.colors.gray} />
            )}
          </Picker>
        </View>
        {income.length === 0 && expense.length === 0 && (
          <HelperText type="error" visible>
            Go to &quot;Add category&quot; section and type any category.
          </HelperText>
        )}
        <TextInput
          ref={priceInputRef}
          label="Price"
          mode="outlined"
          theme={{colors: theme.colors}}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.transactionInput}
          keyboardType="numeric"
          returnKeyType="next"
          value={price}
          onChangeText={(value) => setPrice(value)}
        />
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
            minimumDate={MIN_DATE}
            maximumDate={MAX_DATE}
          />
        )}
        <CommonFormButton
          onSubmit={(_id = undefined) =>
            submitButtonAction(type, title, category, price, date, _id)
          }
          title={submitButtonText}
          isDisabled={!type || !title || !category || !price || !date}
          loading={isLoading}
        />
      </View>
      {errorMessage ? <CommonSnackbar variant="error" text={errorMessage} /> : null}
    </CommonView>
  );
};

TransactionForm.propTypes = {
  submitButtonAction: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  income: PropTypes.array.isRequired,
  expense: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TransactionForm;
