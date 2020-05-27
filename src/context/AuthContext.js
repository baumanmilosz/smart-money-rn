import AsyncStorage from '@react-native-community/async-storage';
import AuthActionTypes from '../constans/AuthActionTypes';
import apiClient from '../api/apiClient';
import createContext from './createContext';
import {navigate} from '../helpers/navigationRef';

const authReducer = (state, {type, payload}) => {
  switch (type) {
    case AuthActionTypes.SIGNUP_SUCCESS:
      return {...state, errorMessage: '', token: payload};
    case AuthActionTypes.SIGNUP_FAILURE:
      return {...state, errorMessage: payload, token: payload};
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {...state, errorMessage: '', token: payload};
    case AuthActionTypes.SIGNIN_FAILURE:
      return {...state, errorMessage: payload, token: null};
    case AuthActionTypes.SIGNOUT_SUCCESS:
      return {...state, token: null};
    case AuthActionTypes.SIGNOUT_FAILURE:
      return {...state, errorMessage: payload};
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async (email, password) => {
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
    const token = AsyncStorage.getItem('token');
    if (token) {
      dispatch({type: AuthActionTypes.SIGNIN_SUCCESS, payload: token});
      navigate('Account');
    } else {
      navigate('Signin');
    }
  };
};

export const {Provider, Context} = createContext(
  authReducer,
  {signup, signin, signout, tryAutoSignin},
  {token: null, errorMessage: ''}
);
