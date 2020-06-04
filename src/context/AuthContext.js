import AsyncStorage from '@react-native-community/async-storage';
import AuthActionTypes from '../constans/AuthActionTypes';
import apiClient from '../api/apiClient';
import createContext from './createContext';
import {navigate} from '../helpers/navigationRef';

const authReducer = (state, {type, payload}) => {
  switch (type) {
    case AuthActionTypes.SIGNUP:
      return {...state, isLoading: true};
    case AuthActionTypes.SIGNUP_SUCCESS:
      return {...state, errorMessage: '', token: payload, isLoading: false};
    case AuthActionTypes.SIGNUP_FAILURE:
      return {...state, errorMessage: payload, token: null, isLoading: false};
    case AuthActionTypes.SIGNIN:
      return {...state, isLoading: true};
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        token: payload,
        isLoading: false,
      };
    case AuthActionTypes.SIGNIN_FAILURE:
      return {...state, errorMessage: payload, token: null, isLoading: false};
    case AuthActionTypes.SIGNOUT:
      return {...state, isLoading: true};
    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {...state, token: null, isLoading: false};
    case AuthActionTypes.SIGNOUT_FAILURE:
      return {...state, errorMessage: payload, isLoading: false};
    case AuthActionTypes.CLEAR_ERROR_MESSAGE:
      return {...state, errorMessage: ''};
    case AuthActionTypes.GET_USER_INFO:
      return {...state};
    case `${AuthActionTypes.GET_USER_INFO}_SUCCESS`:
      return {...state, email: payload};
    case `${AuthActionTypes.GET_USER_INFO}_FAILURE`:
      return {...state, payload: ':)'};
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async (email, password) => {
    dispatch({type: AuthActionTypes.SIGNUP});
    try {
      const res = await apiClient.post('/signup', {email, password});
      const {token} = res.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', email);
      dispatch({type: AuthActionTypes.SIGNUP_SUCCESS, payload: token});
      navigate('Signin');
    } catch (e) {
      dispatch({
        type: AuthActionTypes.SIGNUP_FAILURE,
        payload: 'Something went wrong with registration',
      });
    }
  };
};

const getUserInfo = (dispatch) => {
  return async () => {
    try {
      const res = await apiClient.get(`/user-info`);
      dispatch({type: `${AuthActionTypes.GET_USER_INFO}_SUCCESS`, payload: res.data});
    } catch (e) {
      dispatch({type: `${AuthActionTypes.GET_USER_INFO}_FAILURE`});
    }
  };
};

const signin = (dispatch) => {
  return async (email, password) => {
    dispatch({type: AuthActionTypes.SIGNIN});
    try {
      const res = await apiClient.post('/signin', {email, password});
      const {token} = res.data;
      await AsyncStorage.setItem('token', token);
      dispatch({type: AuthActionTypes.SIGNIN_SUCCESS, payload: token});
      navigate('Summary');
    } catch (e) {
      dispatch({
        type: AuthActionTypes.SIGNIN_FAILURE,
        payload: 'Something went wrong with log in',
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    dispatch({type: AuthActionTypes.SIGNOUT});
    try {
      await AsyncStorage.removeItem('token');
      dispatch({type: AuthActionTypes.SIGNOUT_SUCCESS});
      navigate('Signin');
    } catch (e) {
      dispatch({
        type: AuthActionTypes.SIGNOUT_FAILURE,
        payload: 'Something went wrong with log out',
      });
    }
  };
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({type: AuthActionTypes.GET_USER_INFO});
  };
};

const tryAutoSignIn = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch({type: AuthActionTypes.SIGNIN_SUCCESS, payload: {token}});
      return navigate('Summary');
    }
    return navigate('Signin');
  };
};

export const {Provider, Context} = createContext(
  authReducer,
  {signup, signin, signout, clearErrorMessage, tryAutoSignIn, getUserInfo},
  {token: null, errorMessage: '', isLoading: false, email: ''}
);
