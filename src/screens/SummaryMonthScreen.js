import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Headline, Divider, Subheading} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';
import {Context as SettingsContext} from '../context/SettingsContext';
import Loader from '../components/Loader';
import CommonView from '../components/CommonView';
import theme from '../styles/theme';
import SummaryItem from '../components/SummaryItem';
import SummaryChart from '../components/SummaryChart';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  summaryHeading: {
    textTransform: 'uppercase',
    color: theme.colors.black,
  },
  commonTextColor: {
    color: theme.colors.primary,
  },
});

const SummaryMonthScreen = () => {
  const {
    state: {currentMonth},
    getMonth,
  } = useContext(SettingsContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getMonth();
    });
  }, []);
  return (
    <>
      <CommonHeader text="Summary" />
      <CommonView>
        {!currentMonth ? (
          <Loader />
        ) : (
          <>
            <View style={styles.header}>
              <Subheading style={styles.commonTextColor}>Budget month</Subheading>
              <Divider />
              <Headline style={styles.summaryHeading}>{currentMonth}</Headline>
            </View>
            <SummaryItem
              incomeValue={3500}
              expenseValue={2200}
              incomeCaption="Planned incomes"
              expenseCaption="Planned expenses"
              title="Expenses"
            />
            <SummaryItem
              incomeValue={4300}
              expenseValue={2500}
              incomeCaption="Actual incomes"
              expenseCaption="Actual expenses"
              title="Incomes"
            />
            <SummaryChart actualIncomes={4300} actualExpenses={2500} />
          </>
        )}
      </CommonView>
    </>
  );
};

export default SummaryMonthScreen;
