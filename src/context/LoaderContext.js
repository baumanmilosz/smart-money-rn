import createContext from './createContext';

const loaderReducer = (state, {type}) => {
  switch (type) {
    case 'SHOW_LOADER':
      console.log('SHOW');
      return {...state, isLoading: true};
    case 'HIDE_LOADER':
      return {...state, isLoading: false};
    default:
      return state;
  }
};

export const showLoader = () => (dispatch) => dispatch({type: 'SHOW_LOADER'});

export const hideLoader = (dispatch) => {
  return () => {
    dispatch({type: 'HIDE_LOADER'});
  };
};

export const {Provider, Context} = createContext(
  loaderReducer,
  {showLoader, hideLoader},
  {isLoading: false},
);
