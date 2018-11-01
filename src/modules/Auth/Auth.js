import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  authSuccess,
  authFailure,
  registrationRequest,
  authRequest,
  clearAuthError
} from './actions';

const state = handleActions(
  {
    [authSuccess]: () => true,
    [authFailure]: () => false
  },
  false
);

const proccessing = handleActions(
  {
    [registrationRequest]: () => true,
    [authRequest]: () => true,
    [authSuccess]: () => false,
    [authFailure]: () => false
  },
  false
);

const error = handleActions(
  {
    [authSuccess]: () => null,
    [authFailure]: (state, action) => action.payload,
    [clearAuthError]: () => null
  },
  null
);

export default combineReducers({ state, proccessing, error });

export const getAuthState = state => state.auth.state;

export const getAuthError = state => state.auth.error;

export const getAuthProccessing = state => state.auth.proccessing;
