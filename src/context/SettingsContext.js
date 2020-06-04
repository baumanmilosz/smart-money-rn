import createContext from './createContext';
import SettingsActionTypes from '../constans/SettingsActionTypes';
import apiClient from '../api/apiClient';
import {navigate} from '../helpers/navigationRef';

const settingsReducer = (state, {type, payload}) => {
  switch (type) {
    case SettingsActionTypes.SET_MONTH:
      return {...state, isLoading: true};
    case `${SettingsActionTypes.SET_MONTH}_SUCCESS`:
      return {...state, currentMonth: payload, isLoading: false};
    case `${SettingsActionTypes.SET_MONTH}_FAILURE`:
      return {...state, isLoading: false};
    case SettingsActionTypes.GET_MONTH:
      return {...state, isLoading: true};
    case `${SettingsActionTypes.GET_MONTH}_SUCCESS`:
      return {...state, currentMonth: payload, isLoading: false};
    case `${SettingsActionTypes.GET_MONTH}_FAILURE`:
      return {...state, isLoading: false};
    default:
      return state;
  }
};

const saveSettings = (dispatch) => {
  return async (month) => {
    dispatch({type: SettingsActionTypes.SET_MONTH});
    try {
      await apiClient.post('/settings', {month});
      dispatch({type: `${SettingsActionTypes.SET_MONTH}_SUCCESS`, payload: month});
      navigate('Home');
    } catch (e) {
      dispatch({type: `${SettingsActionTypes.SET_MONTH}_FAILURE`});
    }
  };
};

const getMonth = (dispatch) => {
  return async () => {
    dispatch({type: SettingsActionTypes.GET_MONTH});
    try {
      const res = await apiClient.get('/settings');
      dispatch({type: `${SettingsActionTypes.GET_MONTH}_SUCCESS`, payload: res.data});
    } catch (e) {
      dispatch({type: `${SettingsActionTypes.GET_MONTH}_FAILURE`, payload: e});
    }
  };
};

export const {Provider, Context} = createContext(
  settingsReducer,
  {saveSettings, getMonth},
  {currentMonth: '', errorMessage: '', isLoading: false}
);
