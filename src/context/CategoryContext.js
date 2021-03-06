import {get} from 'lodash';
import CategoryActionTypes from '../constans/CategoryActionTypes';
import createContext from './createContext';
import apiClient from '../api/apiClient';
import {navigate} from '../helpers/navigationRef';
import errorResponse from '../helpers/errorResponse';

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
      return {...state, isLoading: true, errorMessage: ''};
    case `${CategoryActionTypes.ADD_CATEGORY}_SUCCESS`:
      return {...state, isLoading: false, errorMessage: ''};
    case `${CategoryActionTypes.ADD_CATEGORY}_FAILURE`:
      return {...state, isLoading: false, errorMessage: payload};
    case `${CategoryActionTypes.DELETE_CATEGORY}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${CategoryActionTypes.DELETE_CATEGORY}_SUCCESS`:
      return {
        ...state,
        [payload.type]: [...state[payload.type].filter((item) => item.name !== payload.name)],
        isLoading: false,
      };
    case `${CategoryActionTypes.DELETE_CATEGORY}_FAILURE`:
      return {...state, isLoading: false};
    case `${CategoryActionTypes.EDIT_CATEGORY}`:
      return {...state, isLoading: true};
    case `${CategoryActionTypes.EDIT_CATEGORY}_SUCCESS`:
      return {...state, isLoading: true};
    case `${CategoryActionTypes.EDIT_CATEGORY}_FAILURE`:
      return {...state, isLoading: false};
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
      const categoryExistsError = get(e, 'response.data.errors[0].message');
      dispatch({
        type: `${CategoryActionTypes.ADD_CATEGORY}_FAILURE`,
        payload: categoryExistsError || errorResponse(e),
      });
    }
  };
};

const deleteCategory = (dispatch) => {
  return async (name, type) => {
    dispatch({type: `${CategoryActionTypes.DELETE_CATEGORY}`});
    try {
      await apiClient.delete(`/delete-category/${name}`, {data: {type}});
      dispatch({
        type: `${CategoryActionTypes.DELETE_CATEGORY}_SUCCESS`,
        payload: {name, type},
      });
    } catch (e) {
      dispatch({type: `${CategoryActionTypes.DELETE_CATEGORY}_FAILURE`});
    }
  };
};

const editCategory = (dispatch) => {
  return async (name, type, categoryName) => {
    dispatch({type: `${CategoryActionTypes.EDIT_CATEGORY}`});
    try {
      await apiClient.put(`/edit-category/${categoryName}`, {name, type});
      dispatch({
        type: `${CategoryActionTypes.EDIT_CATEGORY}_SUCCESS`,
      });
      navigate('CategoryList');
    } catch (e) {
      dispatch({type: `${CategoryActionTypes.EDIT_CATEGORY}_FAILURE`});
    }
  };
};

export const {Provider, Context} = createContext(
  categoryReducer,
  {getCategories, addCategory, deleteCategory, editCategory},
  {income: [], expense: [], isLoading: false, errorMessage: ''}
);
