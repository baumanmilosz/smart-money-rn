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
import {Context as LimitContext} from '../context/LimitContext';
import {Context as AuthContext} from '../context/AuthContext';

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

const SummaryScreen = () => {
  const {
    state: {currentMonth},
    getMonth,
  } = useContext(SettingsContext);

  const {
    state: {
      isLoading,
      plannedExpensesLimit,
      plannedIncomesLimit,
      actualExpensesLimit,
      actualIncomesLimit,
    },
    getLimit,
  } = useContext(LimitContext);

  const {getUserInfo} = useContext(AuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getMonth();
      getLimit();
      getUserInfo();
    });
  }, []);
  return (
    <>
      <CommonHeader text="Summary" />
      {isLoading ? (
        <Loader />
      ) : (
        <CommonView>
          <View style={styles.header}>
            <Subheading style={styles.commonTextColor}>BUDGET MONTH</Subheading>
            <Divider />
            <Headline style={styles.summaryHeading}>{currentMonth}</Headline>
          </View>
          <SummaryItem
            incomeValue={plannedIncomesLimit}
            expenseValue={plannedExpensesLimit}
            incomeCaption="Planned incomes"
            expenseCaption="Planned expenses"
            title="Plan"
          />
          <SummaryItem
            incomeValue={actualIncomesLimit}
            expenseValue={actualExpensesLimit}
            incomeCaption="Actual incomes"
            expenseCaption="Actual expenses"
            title="Actual"
            isActual
          />
          <SummaryChart actualIncomes={actualIncomesLimit} actualExpenses={actualExpensesLimit} />
          {/* <SummaryCategoriesChart /> */}
        </CommonView>
      )}
    </>
  );
};

export default SummaryScreen;
