import { createAction } from 'redux-actions';

export const setProfile = createAction('SET_PROFILE')

export const profileRequest = createAction('PROFILE_REQUEST')

export const profileFailure = createAction('PROFILE_FAILURE')