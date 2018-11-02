import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { authSuccess } from '../Auth';
import { setProfile, profileRequest, profileFailure } from './actions';
import { load } from '../../util/localstorage';
import { request } from '../../util/network';

export default function*() {
  yield fork(watcher);
}

function* watcher() {
  yield fork(setProfileWatcher);
  yield fork(profileRequestWacher);
}

function* setProfileWatcher() {
  yield takeLatest(authSuccess, profileFlow);
}

function* profileRequestWacher() {
  yield takeLatest(profileRequest, profileRequestFlow);
}

export function* profileRequestFlow() {
  try {
    const token = yield call(load);
    const res = yield call(request, {
      path: '/user/me',
      method: 'GET',
      token
    });
    const { email, id } = res;

    yield put(authSuccess({ id, email }));
  } catch (e) {
    yield put(profileFailure());
  }
}

export function* profileFlow(action) {
  yield put(setProfile(action.payload));
}
