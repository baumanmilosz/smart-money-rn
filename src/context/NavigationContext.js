import DrawerActionTypes from '../constans/DrawerActionTypes';
import createContext from './createContext';

const navigationReducer = (state, {type, payload}) => {
  switch (type) {
    case DrawerActionTypes.HANDLE_DARK_MODE:
      return {...state, isDarkMode: !payload};
    default:
      return state;
  }
};

const handleDarkMode = (dispatch) => {
  return (isDarkMode) => dispatch({type: DrawerActionTypes.HANDLE_DARK_MODE, payload: isDarkMode});
};

export const {Provider, Context} = createContext(
  navigationReducer,
  {handleDarkMode},
  {isDarkMode: false}
);
