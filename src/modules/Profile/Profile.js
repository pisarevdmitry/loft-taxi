import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { setProfile, profileFailure } from './actions';

const profile = handleActions(
  {
    [setProfile]: (state, action) => action.payload,
    [profileFailure]: () => null
  },
  null
);
const loading = handleActions(
  {
    [setProfile]: () => false,
    [profileFailure]: () => false
  },
  true
);

export default combineReducers({ profile, loading });

export const getProfile = state => state.profile.profile;

export const getProfileLoading = state => state.profile.loading;
