import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import BarChart from 'react-native-chart-kit/src/bar-chart';
import {Subheading} from 'react-native-paper';
import theme from '../styles/theme';

const SummaryChart = ({actualIncomes, actualExpenses}) => {
  const styles = StyleSheet.create({
    chartWrapper: {
      marginVertical: 10,
    },
    itemTitle: {
      marginBottom: 15,
      textTransform: 'uppercase',
      color: theme.colors.primary,
    },
  });
  const data = {
    labels: ['Incomes', 'Expenses'],
    datasets: [
      {
        data: [actualIncomes, actualExpenses],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.primary,
    backgroundGradientTo: theme.colors.white,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };
  return (
    <View style={styles.chartWrapper}>
      <Subheading style={styles.itemTitle}>Statistics</Subheading>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 10}
        height={220}
        yAxisLabel="zł"
        chartConfig={chartConfig}
      />
    </View>
  );
};

SummaryChart.propTypes = {
  actualIncomes: PropTypes.number.isRequired,
  actualExpenses: PropTypes.number.isRequired,
};

export default SummaryChart;
