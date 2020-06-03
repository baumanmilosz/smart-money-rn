import CategoryActionTypes from '../constans/CategoryActionTypes';
import createContext from './createContext';
import apiClient from '../api/apiClient';
import {navigate} from '../helpers/navigationRef';

const categoryReducer = (state, {type, payload}) => {
  switch (type) {
    case CategoryActionTypes.GET_CATEGORIES:
      return {...state, isLoading: true};
    case `${CategoryActionTypes.GET_CATEGORIES}_SUCCESS`:
      return {...state, isLoading: false, categories: payload};
    case `${CategoryActionTypes.GET_CATEGORIES}_FAILURE`:
      return {...state, isLoading: false};
    case CategoryActionTypes.ADD_CATEGORY:
      return {...state, isLoading: true};
    case `${CategoryActionTypes.ADD_CATEGORY}_SUCCESS`:
      return {...state, isLoading: false};
    case `${CategoryActionTypes.ADD_CATEGORY}_FAILURE`:
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
      dispatch({type: `${CategoryActionTypes.GET_CATEGORIES}_SUCCESS`, payload: res.data});
    } catch (e) {
      dispatch({type: `${CategoryActionTypes.GET_CATEGORIES}_FAILURE`});
    }
  };
};

const addCategory = (dispatch) => {
  return async (type, name, estimate) => {
    dispatch({type: `${CategoryActionTypes.ADD_CATEGORY}`});
    try {
      const category = {type, name, estimate};
      const res = await apiClient.post('create-category', {category});
      dispatch({type: `${CategoryActionTypes.ADD_CATEGORY}_SUCCESS`, payload: res.data});
      navigate('CategoryList');
    } catch (e) {
      dispatch({type: `${CategoryActionTypes.ADD_CATEGORY}_FAILURE`});
    }
  };
};

export const {Provider, Context} = createContext(
  categoryReducer,
  {getCategories, addCategory},
  {categories: []}
);
