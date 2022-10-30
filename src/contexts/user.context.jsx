import { useReducer } from 'react';
import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
  console.log('dispatched');
  const { type, payload } = action;

  const isUnhandledType = USER_ACTION_TYPES[type] === undefined;

  if (isUnhandledType) {
    throw new Error(`unhandled type ${type} in userReducer`);
  }

  const Actions = {
    [USER_ACTION_TYPES.SET_CURRENT_USER]: () => ({
      ...state,
      currentUser: payload,
    }),
  };

  return Actions[type];
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
