import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import auth, { sagas as authSagas } from './Auth';
import profile, { sagas as profileSagas } from './Profile';

export default combineReducers({ auth, profile });

export function* rootSaga() {
  yield fork(authSagas);
  yield fork(profileSagas);
}
