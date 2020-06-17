import createContext from './createContext';
import NavigationActionTypes from '../constans/NavigationActionTypes';

const navigationReducer = (state, {type, payload}) => {
  switch (type) {
    case `${NavigationActionTypes.HANDLE_DARK_MODE}_SUCCESS`:
      return {...state, isDarkMode: payload};
    default:
      return state;
  }
};

const handleDarkMode = (dispatch) => {
  return async (isDarkMode) => {
    dispatch({
      type: `${NavigationActionTypes.HANDLE_DARK_MODE}_SUCCESS`,
      payload: isDarkMode,
    });
  };
};

export const {Provider, Context} = createContext(
  navigationReducer,
  {handleDarkMode},
  {isDarkMode: false}
);
