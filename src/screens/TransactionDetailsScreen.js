import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import CommonHeader from '../components/CommonHeader';
import CommonFormButton from '../components/CommonFormButton';
import {Context as TransactionContext} from '../context/TransactionContext';
import CommonView from '../components/CommonView';
import TransactionDetailsItem from '../components/TransactionDetailsItem';
import TransactionDetailsOption from '../constans/TransactionDetailsOption';
import Loader from '../components/Loader';
import {navigate} from '../helpers/navigationRef';

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
  const {_id, type, title, category, price, date} = route.params;
  const {removeTransactionListItem, isLoading} = useContext(TransactionContext);

  return (
    <>
      <CommonHeader text="Transaction details" />
      {isLoading ? (
        <Loader />
      ) : (
        <CommonView>
          <TransactionDetailsItem value={type} caption={TransactionDetailsOption.TYPE} />
          <TransactionDetailsItem value={title} caption={TransactionDetailsOption.TITLE} />
          <TransactionDetailsItem value={category} caption={TransactionDetailsOption.CATEGORY} />
          <TransactionDetailsItem value={price} caption={TransactionDetailsOption.PRICE} />
          <TransactionDetailsItem
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
