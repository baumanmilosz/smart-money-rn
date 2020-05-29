import React, {useContext, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Context as TransactionContext} from '../context/TransactionContext';
import TransactionListItem from '../components/TransactionListItem';
import CommonHeader from '../components/CommonHeader';

const styles = StyleSheet.create({
  transactionListWrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

const TransactionListScreen = () => {
  const {
    state: {transactionList},
    getTransactionList,
  } = useContext(TransactionContext);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getTransactionList();
    });
  }, []);
  return (
    <>
      <View style={styles.transactionListWrapper}>
        <CommonHeader text="Transaction list" navigation={navigation} />
        <FlatList
          data={transactionList}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const {type, title, category, price, date} = item;
            return (
              <TransactionListItem
                type={type}
                title={title}
                category={category}
                price={price}
                date={date}
              />
            );
          }}
        />
      </View>
    </>
  );
};

export default TransactionListScreen;
