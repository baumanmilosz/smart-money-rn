import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import BarChart from 'react-native-chart-kit/src/bar-chart';
import {Subheading, Caption} from 'react-native-paper';
import theme from '../styles/theme';
import PlaceholderText from './PlaceholderText';
import CommonDivider from './CommonDivider';
import {Context as NavigationContext} from '../context/NavigationContext';

const CHART_WIDTH = Dimensions.get('window').width;
const CHART_HEIGHT = 200;
const DECIMAL_PLACES = 2;

const SummaryChart = ({actualIncomes, actualExpenses}) => {
  const {
    state: {isDarkMode},
  } = useContext(NavigationContext);
  const styles = StyleSheet.create({
    chartWrapper: {
      marginVertical: 10,
    },
    itemTitle: {
      textTransform: 'uppercase',
      color: isDarkMode ? theme.dark.fontPrimary : theme.colors.primary,
    },
    chartStyle: {
      marginTop: 10,
      borderRadius: 5,
    },
    styledStatsCaption: {
      color: theme.colors.captionColor,
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
    decimalPlaces: DECIMAL_PLACES,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  return (
    <View style={styles.chartWrapper}>
      <Subheading style={styles.itemTitle}>Statistics</Subheading>
      <Caption style={styles.styledStatsCaption}>Actual transactions</Caption>
      <CommonDivider />
      {actualIncomes || actualExpenses ? (
        <BarChart
          data={data}
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          yAxisSuffix="zł"
          chartConfig={chartConfig}
          fromZero
          style={styles.chartStyle}
        />
      ) : (
        <PlaceholderText text="Chart will be generated ;)" />
      )}
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
