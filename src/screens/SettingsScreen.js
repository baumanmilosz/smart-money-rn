import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Caption} from 'react-native-paper';
import CommonHeader from '../components/CommonHeader';
import CommonView from '../components/CommonView';
import MonthNames from '../constans/MonthNames';
import CommonFormButton from '../components/CommonFormButton';
import {Context as SettingsContext} from '../context/SettingsContext';
import theme from '../styles/theme';

const styles = StyleSheet.create({
  captionForm: {marginTop: 10, fontSize: 15, color: theme.colors.primary},
  input: {
    marginVertical: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: 5,
  },
});

const SettingsScreen = () => {
  const {
    state: {currentMonth, isLoading},
    setMonth,
  } = useContext(SettingsContext);
  const [monthName, setMonthName] = useState(currentMonth);

  const _renderMonths = () => {
    return MonthNames.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Picker.Item key={index} label={item} value={item} />
    ));
  };
  return (
    <>
      <CommonHeader text="Settings" />
      <CommonView>
        <Caption style={styles.captionForm}>What budget month you want to show:</Caption>
        <View style={[styles.input, styles.pickerWrapper]}>
          <Picker
            selectedValue={monthName}
            onValueChange={(itemValue) => setMonthName(itemValue)}
            prompt="Select month">
            {_renderMonths()}
          </Picker>
        </View>
        <CommonFormButton
          onSubmit={() => setMonth(monthName)}
          title="Save"
          isDisabled={currentMonth === monthName}
          loading={isLoading}
        />
      </CommonView>
    </>
  );
};

export default SettingsScreen;
