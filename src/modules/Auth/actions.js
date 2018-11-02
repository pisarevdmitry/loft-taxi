import { createAction } from 'redux-actions';

export const registrationRequest = createAction('REGISTATION_REQUEST');

export const authRequest = createAction('AUTH_REQUEST');

export const authSuccess= createAction('AUTH_SUCCESS');

export const authFailure= createAction('AUTH_FAILURE');

export const clearAuthError= createAction('CLEAR_AUTH_ERROR');