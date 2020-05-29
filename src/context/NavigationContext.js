import createContext from './createContext';

const navigationReducer = (state, {type}) => {
  switch (type) {
    default:
      return state;
  }
};

export const {Provider, Context} = createContext(navigationReducer, {}, {});
