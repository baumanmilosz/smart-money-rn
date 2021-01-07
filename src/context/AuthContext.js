import AsyncStorage from '@react-native-community/async-storage';
import FormData from 'form-data';
import {Platform} from 'react-native';
import AuthActionTypes from '../constans/AuthActionTypes';
import apiClient from '../api/apiClient';
import createContext from './createContext';
import {navigate} from '../helpers/navigationRef';
import errorResponse from '../helpers/errorResponse';

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
      return {...state, userInfo: payload};
    case `${AuthActionTypes.GET_USER_INFO}_FAILURE`:
      return {...state};
    case `${AuthActionTypes.CHECK_CONNECTION}`:
      return {...state, isButtonLoading: true};
    case `${AuthActionTypes.CHECK_CONNECTION}_SUCCESS`:
      return {...state, isButtonLoading: false};
    case `${AuthActionTypes.CHECK_CONNECTION}_FAILURE`:
      return {...state, isButtonLoading: false};
    case `${AuthActionTypes.SAVE_USER_INFO}`:
      return {...state, isLoading: true, success: false, errorMessage: ''};
    case `${AuthActionTypes.SAVE_USER_INFO}_SUCCESS`:
      return {...state, isLoading: false, success: true, errorMessage: ''};
    case `${AuthActionTypes.SAVE_USER_INFO}_FAILURE`:
      return {...state, isLoading: false, errorMessage: payload};
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async (firstName, lastName, email, password, confirmPassword) => {
    dispatch({type: AuthActionTypes.SIGNUP});
    try {
      const res = await apiClient.post('/signup', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      const {token} = res.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', email);
      dispatch({type: AuthActionTypes.SIGNUP_SUCCESS, payload: token});
      navigate('Signin');
    } catch (e) {
      dispatch({
        type: AuthActionTypes.SIGNUP_FAILURE,
        payload: errorResponse(e),
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

const saveUserInfo = (dispatch) => {
  return async (firstName, lastName, email, oldEmail, userAvatar) => {
    const filename = userAvatar.path.substring(userAvatar.path.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? userAvatar.path.replace('file://', '') : userAvatar.path;
    const file = {
      uri: uploadUri,
      type: userAvatar.mime,
      name: filename,
    };
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    dispatch({type: `${AuthActionTypes.SAVE_USER_INFO}`});
    try {
      const res = await fetch('http://192.168.15.109:8080/photo/avatar', {
        method: 'POST',
        body: formData,
      });
      dispatch({type: `${AuthActionTypes.SAVE_USER_INFO}_SUCCESS`});
    } catch (e) {
      console.log(e);
      dispatch({type: `${AuthActionTypes.SAVE_USER_INFO}_FAILURE`, payload: errorResponse(e)});
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
        payload: errorResponse(e),
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
      return navigate('Account');
    }
    return navigate('Signin');
  };
};

const checkConnection = (dispatch) => {
  return async () => {
    dispatch({type: AuthActionTypes.CHECK_CONNECTION});
    try {
      await apiClient.get('check-connection');
      dispatch({type: `${AuthActionTypes.CHECK_CONNECTION}_SUCCESS`});
      return navigate('Summary');
    } catch (e) {
      dispatch({type: `${AuthActionTypes.CHECK_CONNECTION}_FAILURE`});
      return navigate('ConnectionProblem');
    }
  };
};

const resetPassword = () => {
  return async (email) => {
    try {
      await apiClient.post('reset-password', {email});
    } catch (e) {
      /*eslint-disable*/
      console.log(e);
    }
  };
};

export const {Provider, Context} = createContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessage,
    tryAutoSignIn,
    getUserInfo,
    saveUserInfo,
    checkConnection,
    resetPassword,
  },
  {
    token: null,
    errorMessage: '',
    isLoading: false,
    userInfo: {},
    isButtonLoading: false,
    success: false,
  },
);
