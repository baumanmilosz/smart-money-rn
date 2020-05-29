import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-community/picker';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Caption, RadioButton, TextInput} from 'react-native-paper';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import CommonHeader from '../components/CommonHeader';
import CommonView from '../components/CommonView';
import theme from '../styles/theme';
import transactionsCategory from '../constans/transactionsCategory';
import CommonFormButton from '../components/CommonFormButton';
import TransactionType from '../constans/TransactionType';
import {Context as TransactionContext} from '../context/TransactionContext';
import Loader from '../components/Loader';

const styles = StyleSheet.create({
  expenseWrapper: {
    padding: 10,
  },
  expenseInput: {
    marginVertical: 20,
  },
  categoryPickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.inactiveField,
    borderRadius: 5,
  },
  singleTrancationType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

const AddTransactionScreen = ({navigation}) => {
  const [type, setType] = useState(TransactionType.expense);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState();
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const {
    state: {isLoading},
    addTransaction,
  } = useContext(TransactionContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // eslint-disable-next-line no-undef
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const renderTransactionItems = () => {
    if (type === TransactionType.expense) {
      return transactionsCategory.expenses.map((item) => (
        <Picker.Item key={item.id} label={item.value} value={item.value} />
      ));
    }
    return transactionsCategory.incomes.map((item) => (
      <Picker.Item key={item.id} label={item.value} value={item.value} />
    ));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <CommonView>
          <CommonHeader text="Add transaction" navigation={navigation} />
          <View style={styles.expenseWrapper}>
            <Caption style={{marginTop: 10, fontSize: 15, color: theme.colors.primary}}>
              Choose transaction type:
            </Caption>
            <View>
              <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
                <View style={styles.singleTrancationType}>
                  <RadioButton value={TransactionType.expense} color={theme.colors.primary} />
                  <Caption style={{color: theme.colors.primary, fontSize: 13}}>Expense</Caption>
                </View>
                <View style={styles.singleTrancationType}>
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
              style={styles.expenseInput}
            />
            <View style={styles.categoryPickerWrapper}>
              <Picker
                style={styles.categoryPicker}
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}>
                {transactionsCategory && renderTransactionItems()}
              </Picker>
            </View>
            <TextInput
              label="Price"
              value={price}
              onChangeText={(value) => setPrice(value)}
              mode="outlined"
              theme={{colors: theme.colors}}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.expenseInput}
              keyboardType="numeric"
              contextMenuHidden
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
              onSubmit={() => addTransaction(type, title, category, price, date)}
              title="Add transaction"
              isDisabled={!type || !title || !category || !price || !date}
            />
          </View>
        </CommonView>
      )}
    </>
  );
};

AddTransactionScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddTransactionScreen;
