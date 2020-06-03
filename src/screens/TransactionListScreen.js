import React, {useContext, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Context as TransactionContext} from '../context/TransactionContext';
import TransactionListItem from '../components/TransactionListItem';
import CommonHeader from '../components/CommonHeader';
import {navigate} from '../helpers/navigationRef';
import Loader from '../components/Loader';

const styles = StyleSheet.create({
  transactionListWrapper: {
    backgroundColor: '#F5F3F3',
    flex: 1,
  },
});

const TransactionListScreen = () => {
  const {
    state: {transactionList, isLoading},
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
        <CommonHeader text="Transaction list" />
        {isLoading ? (
          <Loader />
        ) : (
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
                  showDetails={() =>
                    navigate('TransactionDetails', {
                      _id: item._id,
                    })
                  }
                />
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default TransactionListScreen;
