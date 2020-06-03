import React, {useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../styles/theme';
import Loader from './Loader';
import {Context as TransactionContext} from '../context/TransactionContext';

const TransactionDetailsChart = () => {
  const styles = StyleSheet.create({
    gradientWrapper: {
      borderRadius: 5,
    },
  });

  const gradientColors = [theme.colors.primary, '#3b5998', '#192f6a'];
  const chartConfig = {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
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
            height={150}
            width={Dimensions.get('window').width}
            chartConfig={chartConfig}
            accessor="value"
          />
        </LinearGradient>
      )}
    </>
  );
};

export default TransactionDetailsChart;
