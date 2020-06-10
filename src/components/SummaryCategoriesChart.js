import React, {useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../styles/theme';
import Loader from './Loader';
import {Context as TransactionContext} from '../context/TransactionContext';

const CHART_WIDTH = Dimensions.get('window').width;
const CHART_HEIGHT = 150;

const SummaryCategoriesChart = () => {
  const styles = StyleSheet.create({
    gradientWrapper: {
      borderRadius: 5,
      marginBottom: 10,
    },
  });

  const gradientColors = [theme.colors.primary, theme.colors.secondary];
  const chartConfig = {
    backgroundGradientFrom: theme.colors.primary,
    backgroundGradientTo: theme.colors.white,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const pieChartData = [
    {
      name: 'Issued',
      value: 10,
      color: 'rgba(255,255,255, 0.8)',
      legendFontColor: 'rgba(255,255,255, 0.8)',
      legendFontSize: 15,
    },
    {
      name: 'Remaining',
      value: 10,
      color: 'rgba(255,255,255, 0.2)',
      legendFontColor: 'rgba(255,255,255, 0.2)',
      legendFontSize: 15,
    },
  ];

  const {
    state: {isLoading},
  } = useContext(TransactionContext);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <LinearGradient colors={gradientColors} style={styles.gradientWrapper}>
          <PieChart
            data={pieChartData}
            height={CHART_HEIGHT}
            width={CHART_WIDTH}
            chartConfig={chartConfig}
            accessor="value"
          />
        </LinearGradient>
      )}
    </>
  );
};

export default SummaryCategoriesChart;
