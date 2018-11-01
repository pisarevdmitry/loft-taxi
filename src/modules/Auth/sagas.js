import { takeLatest, put, call, fork } from 'redux-saga/effects';
import {
  registrationRequest,
  authRequest,
  authSuccess,
  authFailure
} from './actions';
import { request } from '../../util/network';
import { save } from '../../util/localstorage';
import parseError from '../../util/parseError';

export default function*() {
  yield fork(watcher);
}

function* watcher() {
  yield fork(registrationWatcher);
  yield fork(authWatcher);
}

function* registrationWatcher() {
  yield takeLatest(registrationRequest, registrationRequestHandler, '/user');
}

function* authWatcher() {
  yield takeLatest(authRequest, authRequestHandler, '/session');
}

export function* registrationRequestHandler(fetchPath, action) {
  const { payload } = action;

  yield call(authFlow, payload, fetchPath);
}

export function* authRequestHandler(fetchPath, action) {
  const { payload } = action;

  yield call(authFlow, payload, fetchPath);
}

export function* authFlow(data, fetchPath) {
  try {
    const res = yield call(request, {
      path: fetchPath,
      method: 'POST',
      body: JSON.stringify(data)
    });
    yield call(save, res.token);

    yield put(authSuccess(res.user));
  } catch (e) {
    if (e.json) {
      const message = yield call(parseError, e);

      yield put(authFailure(message.message));
    }
  }
}
