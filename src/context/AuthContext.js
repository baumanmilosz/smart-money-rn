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
      return {...state, errorMessage: '', token: payload, isLoading: false};
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

const signin = (dispatch) => {
  return async (email, password) => {
    dispatch({type: AuthActionTypes.SIGNIN});
    try {
      const res = await apiClient.post('/signin', {email, password});
      const {token} = res.data;
      await AsyncStorage.setItem('token', token);
      dispatch({type: AuthActionTypes.SIGNIN_SUCCESS, payload: token});
      navigate('Account');
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

const tryAutoSignin = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch({type: AuthActionTypes.SIGNIN_SUCCESS, payload: token});
      navigate('AddTransaction');
    } else {
      navigate('Signin');
    }
  };
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({type: AuthActionTypes.CLEAR_ERROR_MESSAGE});
  };
};

export const {Provider, Context} = createContext(
  authReducer,
  {signup, signin, signout, tryAutoSignin, clearErrorMessage},
  {token: null, errorMessage: '', isLoading: false}
);
