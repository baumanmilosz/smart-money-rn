import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import BarChart from 'react-native-chart-kit/src/bar-chart';
import {Subheading} from 'react-native-paper';
import _ from 'lodash';
import theme from '../styles/theme';

const CHART_WIDTH = Dimensions.get('window').width;
const CHART_HEIGHT = 200;
const DECIMAL_PLACES = 2;

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
    chartStyle: {
      borderRadius: 5,
    },
  });

  const data = {
    labels: ['Incomes', 'Expenses'],
    datasets: [
      {
        data: [_.get(actualIncomes, '', 0), _.get(actualExpenses, '', 0)],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.primary,
    backgroundGradientTo: theme.colors.white,
    decimalPlaces: DECIMAL_PLACES,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  return (
    <View style={styles.chartWrapper}>
      <Subheading style={styles.itemTitle}>Statistics</Subheading>
      <BarChart
        data={data}
        width={CHART_WIDTH}
        height={CHART_HEIGHT}
        yAxisSuffix="zł"
        chartConfig={chartConfig}
        fromZero
        style={styles.chartStyle}
      />
    </View>
  );
};

SummaryChart.defaultProps = {
  actualIncomes: null,
  actualExpenses: null,
};

SummaryChart.propTypes = {
  actualIncomes: PropTypes.number,
  actualExpenses: PropTypes.number,
};

export default SummaryChart;
