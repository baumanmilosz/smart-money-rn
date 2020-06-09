import {get} from 'lodash';
import CategoryActionTypes from '../constans/CategoryActionTypes';
import createContext from './createContext';
import apiClient from '../api/apiClient';
import {navigate} from '../helpers/navigationRef';

const categoryReducer = (state, {type, payload}) => {
  switch (type) {
    case CategoryActionTypes.GET_CATEGORIES:
      return {...state, isLoading: true};
    case `${CategoryActionTypes.GET_CATEGORIES}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        income: payload.income,
        expense: payload.expense,
      };
    case `${CategoryActionTypes.GET_CATEGORIES}_FAILURE`:
      return {...state, isLoading: false};
    case CategoryActionTypes.ADD_CATEGORY:
      return {...state, isLoading: true};
    case `${CategoryActionTypes.ADD_CATEGORY}_SUCCESS`:
      return {...state, isLoading: false};
    case `${CategoryActionTypes.ADD_CATEGORY}_FAILURE`:
      return {...state, isLoading: false};
    case `${CategoryActionTypes.DELETE_CATEGORY}`:
      return {
        ...state,
      };
    case `${CategoryActionTypes.DELETE_CATEGORY}_SUCCESS`:
      return {
        ...state,
        [payload.type]: [...state[payload.type].filter((item) => item.name !== payload.name)],
      };
    case `${CategoryActionTypes.DELETE_CATEGORY}_FAILURE`:
      return {...state};
    default:
      return state;
  }
};

const getCategories = (dispatch) => {
  return async () => {
    dispatch({type: `${CategoryActionTypes.GET_CATEGORIES}`});
    try {
      const res = await apiClient.get('/categories');
      dispatch({
        type: `${CategoryActionTypes.GET_CATEGORIES}_SUCCESS`,
        payload: {
          income: get(res.data, 'incomeCategories', ''),
          expense: get(res.data, 'expenseCategories', ''),
        },
      });
    } catch (e) {
      dispatch({type: `${CategoryActionTypes.GET_CATEGORIES}_FAILURE`});
    }
  };
};

const addCategory = (dispatch) => {
  return async (type, name) => {
    dispatch({type: `${CategoryActionTypes.ADD_CATEGORY}`});
    try {
      const res = await apiClient.post('create-category', {type, name});
      dispatch({type: `${CategoryActionTypes.ADD_CATEGORY}_SUCCESS`, payload: res.data});
      navigate('CategoryList');
    } catch (e) {
      dispatch({type: `${CategoryActionTypes.ADD_CATEGORY}_FAILURE`});
    }
  };
};

const deleteCategory = (dispatch) => {
  return async (name, type) => {
    dispatch({type: `${CategoryActionTypes.DELETE_CATEGORY}`, payload: name});
    try {
      dispatch({
        type: `${CategoryActionTypes.DELETE_CATEGORY}_SUCCESS`,
        payload: {name, type},
      });
      await apiClient.delete(`/delete-category/${name}`, {data: {type}});
    } catch (e) {
      dispatch({type: `${CategoryActionTypes.DELETE_CATEGORY}_FAILURE`});
    }
  };
};

export const {Provider, Context} = createContext(
  categoryReducer,
  {getCategories, addCategory, deleteCategory},
  {income: [], expense: []}
);
