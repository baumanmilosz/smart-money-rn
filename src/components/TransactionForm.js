import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import theme from '../styles/theme';
import TransactionType from '../constans/TransactionType';
import TransactionsCategory from '../constans/TransactionsCategory';
import CommonFormButton from './CommonFormButton';
import CommonView from './CommonView';
import TransactionTypeField from './TransactionTypeField';

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

const TransactionForm = ({submitButtonAction, submitButtonText, categories}) => {
  const [type, setType] = useState(TransactionType.expense);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(TransactionsCategory.expenses[0].value);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const priceInputRef = useRef(null);
  const [isPriceError, setPriceError] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    return () => {
      navigation.addListener('blur', () => setPriceError(false));
    };
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // eslint-disable-next-line no-undef
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const renderCategories = () => {
    if (type === TransactionType.expense) {
      return categories
        .filter((item) => item.type === TransactionType.expense)
        .map((item) => {
          return <Picker.Item key={item.categoryId} label={item.name} value={item.name} />;
        });
    }
    return categories
      .filter((item) => item.type === TransactionType.income)
      .map((item) => {
        return <Picker.Item key={item.categoryId} label={item.name} value={item.name} />;
      });
  };

  const _checkPriceValidation = () => {
    const regExp = /^\d+(.\d{1,2})?$/g;
    const isValid = regExp.test(price);
    if (!isValid) return setPriceError(true);
    return setPriceError(false);
  };
  return (
    <CommonView>
      <View style={styles.transactionWrapper}>
        <TransactionTypeField type={type} setType={setType} />
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
            {categories.length > 0 ? (
              renderCategories()
            ) : (
              <Picker.Item value="" label="Select category" color={theme.colors.gray} />
            )}
          </Picker>
        </View>
        {categories.length === 0 && (
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
  categories: PropTypes.array.isRequired,
};

export default TransactionForm;
