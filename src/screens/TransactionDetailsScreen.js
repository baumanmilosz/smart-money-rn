import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';
import CommonFormButton from '../components/CommonFormButton';
import {Context as TransactionContext} from '../context/TransactionContext';
import CommonView from '../components/CommonView';
import CommonListItem from '../components/CommonListItem';
import TransactionDetailsOption from '../constans/TransactionDetailsOption';
import Loader from '../components/Loader';
import {navigate} from '../helpers/navigationRef';
import TransactionDetailsChart from '../components/TransactionDetailsChart';

const styles = StyleSheet.create({
  actionButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexBasis: '49%',
  },
});

const TransactionDetailsScreen = ({route}) => {
  const {_id} = route.params;
  const {
    state: {isLoading, transactionDetails},
    removeTransactionListItem,
    getTransactionDetails,
  } = useContext(TransactionContext);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getTransactionDetails(_id);
    });
  }, []);

  const {type, title, category, price, date} = transactionDetails;

  return (
    <>
      <CommonHeader text="Transaction details" />
      {isLoading ? (
        <Loader />
      ) : (
        <CommonView>
          <TransactionDetailsChart />
          <CommonListItem value={type} caption={TransactionDetailsOption.TYPE} />
          <CommonListItem value={title} caption={TransactionDetailsOption.TITLE} />
          <CommonListItem value={category} caption={TransactionDetailsOption.CATEGORY} />
          <CommonListItem value={price} caption={TransactionDetailsOption.PRICE} />
          <CommonListItem
            value={moment(date).format('MM/DD/YY')}
            caption={TransactionDetailsOption.DATE}
          />
          <View style={styles.actionButtonsWrapper}>
            <CommonFormButton
              onSubmit={() => navigate('EditTransaction', {_id})}
              title="Edit"
              icon="pencil"
              style={styles.actionButton}
            />
            <CommonFormButton
              onSubmit={() => removeTransactionListItem(_id)}
              title="Remove"
              icon="delete"
              style={styles.actionButton}
            />
          </View>
        </CommonView>
      )}
    </>
  );
};

TransactionDetailsScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default TransactionDetailsScreen;
