import createContext from './createContext';
import TransactionActionTypes from '../constans/TransactionActionTypes';
import apiClient from '../api/apiClient';
import {navigate} from '../helpers/navigationRef';

const authReducer = (state, {type, payload}) => {
  switch (type) {
    case TransactionActionTypes.ADD_TRANSACTION:
      return {...state, transaction: payload, isLoading: true};
    case `${TransactionActionTypes.ADD_TRANSACTION}_SUCCESS`:
      return {...state, transaction: payload, isLoading: true};
    case `${TransactionActionTypes.ADD_TRANSACTION}_FAILURE`:
      return {...state, isLoading: false};
    case `${TransactionActionTypes.GET_TRANSACTION_LIST}`:
      return {...state, isLoading: true};
    case `${TransactionActionTypes.GET_TRANSACTION_LIST}_SUCCESS`:
      return {...state, transactionList: payload, isLoading: false};
    case `${TransactionActionTypes.GET_TRANSACTION_LIST}_FAILURE`:
      return {...state, isLoading: false};
    case `${TransactionActionTypes.REMOVE_TRANSACTION_ITEM}`:
      return {...state, isLoading: true};
    case `${TransactionActionTypes.REMOVE_TRANSACTION_ITEM}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        transactionList: [...state.transactionList.filter((item) => item._id !== payload)],
      };
    case `${TransactionActionTypes.REMOVE_TRANSACTION_ITEM}_FAILURE`:
      return {...state, isLoading: false};
    case TransactionActionTypes.EDIT_TRANSACTION:
      return {...state, isLoading: true};
    case `${TransactionActionTypes.EDIT_TRANSACTION}_SUCCESS`:
      return {...state, isLoading: true};
    case `${TransactionActionTypes.EDIT_TRANSACTION}_FAILURE`:
      return {...state, isLoading: false};
    default:
      return state;
  }
};

const addTransaction = (dispatch) => {
  return async (type, title, category, price, date) => {
    dispatch({type: TransactionActionTypes.ADD_TRANSACTION});
    try {
      const transaction = {type, title, category, price, date};
      await apiClient.post('/create-transaction', {...transaction});
      dispatch({
        type: `${TransactionActionTypes.ADD_TRANSACTION}_SUCCESS`,
        payload: {transaction},
      });
      navigate('TransactionList');
    } catch (e) {
      dispatch({type: `${TransactionActionTypes.ADD_TRANSACTION}_FAILURE`});
    }
  };
};

const getTransactionList = (dispatch) => {
  return async () => {
    dispatch({type: TransactionActionTypes.GET_TRANSACTION_LIST});
    try {
      const res = await apiClient.get('/transaction-list');
      dispatch({
        type: `${TransactionActionTypes.GET_TRANSACTION_LIST}_SUCCESS`,
        payload: res.data,
      });
    } catch (e) {
      dispatch({type: `${TransactionActionTypes.GET_TRANSACTION_LIST}_FAILURE`});
    }
  };
};

const removeTransactionListItem = (dispatch) => {
  return async (id) => {
    dispatch({type: TransactionActionTypes.REMOVE_TRANSACTION_ITEM});
    try {
      const res = await apiClient.delete(`/transaction-list/${id}`);
      dispatch({
        type: `${TransactionActionTypes.REMOVE_TRANSACTION_ITEM}_SUCCESS`,
        payload: res.data,
      });
      navigate('TransactionList');
    } catch (e) {
      dispatch({type: `${TransactionActionTypes.REMOVE_TRANSACTION_ITEM}_FAILURE`});
    }
  };
};

const editTransaction = (dispatch) => {
  return async (type, title, category, price, date, _id) => {
    dispatch({type: TransactionActionTypes.EDIT_TRANSACTION});
    try {
      const transaction = {type, title, category, price, date};
      const res = await apiClient.put(`/transaction-list/${_id}`, {...transaction});
      dispatch({
        type: `${TransactionActionTypes.EDIT_TRANSACTION}_SUCCESS`,
        payload: res.data,
      });
      navigate('TransactionList');
    } catch (e) {
      dispatch({type: `${TransactionActionTypes.EDIT_TRANSACTION}_FAILURE`});
    }
  };
};

export const {Provider, Context} = createContext(
  authReducer,
  {addTransaction, getTransactionList, removeTransactionListItem, editTransaction},
  {isLoading: false, transaction: {}, transactionList: []}
);
