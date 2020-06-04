import _ from 'lodash';
import createContext from './createContext';
import LimitActionTypes from '../constans/LimitActionTypes';
import apiClient from '../api/apiClient';
import {navigate} from '../helpers/navigationRef';

const limitReducer = (state, {type, payload}) => {
  switch (type) {
    case LimitActionTypes.SET_LIMIT:
      return {...state, isLoading: true};
    case `${LimitActionTypes.SET_LIMIT}_SUCCESS`:
      return {...state, isLoading: false};
    case `${LimitActionTypes.SET_LIMIT}_FAILURE`:
      return {...state, isLoading: false};
    case LimitActionTypes.GET_LIMIT:
      return {...state, isLoading: true};
    case `${LimitActionTypes.GET_LIMIT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        plannedExpensesLimit: payload.plannedExpensesLimit,
        plannedIncomesLimit: payload.plannedIncomesLimit,
        actualExpenseLimit: payload.actualExpenseLimit,
        actualIncomesLimit: payload.actualIncomesLimit,
      };
    case `${LimitActionTypes.GET_LIMIT}_FAILURE`:
      return {...state, isLoading: false};
    default:
      return state;
  }
};

const setLimit = (dispatch) => {
  return async (type, category, limitValue) => {
    dispatch({type: LimitActionTypes.SET_LIMIT});
    try {
      const limit = {type, category, limitValue};
      await apiClient.post('/limit', {...limit});
      dispatch({type: `${LimitActionTypes.SET_LIMIT}_SUCCESS`});
      navigate('Summary');
    } catch (e) {
      dispatch({type: `${LimitActionTypes.SET_LIMIT}_FAILURE`});
    }
  };
};

const getLimit = (dispatch) => {
  return async () => {
    dispatch({type: LimitActionTypes.GET_LIMIT});
    try {
      const res = await apiClient.get('/limit');
      dispatch({
        type: `${LimitActionTypes.GET_LIMIT}_SUCCESS`,
        payload: {
          plannedExpensesLimit: _.get(res.data, 'plannedExpensesLimit', ''),
          plannedIncomesLimit: _.get(res.data, 'plannedIncomesLimit', ''),
          actualExpenseLimit: _.get(res.data, 'actualExpenseLimit', ''),
          actualIncomesLimit: _.get(res.data, 'actualIncomesLimit', ''),
        },
      });
    } catch (e) {
      dispatch({type: `${LimitActionTypes.GET_LIMIT}_FAILURE`});
    }
  };
};

export const {Provider, Context} = createContext(
  limitReducer,
  {setLimit, getLimit},
  {errorMessage: '', isLoading: false, incomeLimit: null, expenseLimit: null}
);
