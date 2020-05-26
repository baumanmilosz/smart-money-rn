import React, {useReducer} from 'react';

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  // eslint-disable-next-line react/prop-types
  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const allActions = {};

    Object.keys(actions).forEach((key) => {
      allActions[key] = actions[key](dispatch);
    });

    return <Context.Provider value={{state, ...allActions}}>{children}</Context.Provider>;
  };
  return {Context, Provider};
};
