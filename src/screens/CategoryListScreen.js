import React, {useContext, useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';
import {Context as CategoryContext} from '../context/CategoryContext';
import CategoryItem from '../components/CategoryItem';
import theme from '../styles/theme';
import TransactionType from '../constans/TransactionType';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.primary,
  },
  styledIndicator: {
    backgroundColor: theme.colors.white,
  },
});

const initialLayout = {width: Dimensions.get('window').width};

const CategoryListScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'income', title: 'Income'},
    {key: 'expense', title: 'Expense'},
  ]);
  const {
    state: {income, expense},
    getCategories,
  } = useContext(CategoryContext);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getCategories();
    });
  }, []);

  const IncomeRoute = () => (
    <FlatList
      data={income}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => {
        return <CategoryItem name={item.name} type={TransactionType.income} />;
      }}
    />
  );

  const ExpenseRoute = () => (
    <FlatList
      data={expense}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => {
        return <CategoryItem name={item.name} type={TransactionType.expense} />;
      }}
    />
  );

  const renderTabBar = (props) => {
    return <TabBar style={styles.tabBar} {...props} indicatorStyle={styles.styledIndicator} />;
  };

  const renderScene = SceneMap({
    income: IncomeRoute,
    expense: ExpenseRoute,
  });

  return (
    <>
      <CommonHeader text="Category list" />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
};

export default CategoryListScreen;
