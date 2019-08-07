import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

/**
 * payload = { email, password }
 */
export function* signIn({ payload }) {
  try {
    const res = yield call(api.post, 'session', payload);

    const { token, user } = res.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    console.tron.log(err);
    toast.error('Erro na autenticação, verifique seus dados!', 2500);
    yield put(signFailure());
  }
}

/**
 * payload = { name, email, password }
 */
export function* signUp({ payload }) {
  try {
    yield call(api.post, 'users', payload);

    toast.success('Cadastro realizado com sucesso!', 2000);
    history.push('/');
  } catch (err) {
    toast.error('Erro na autenticação, verifique seus dados!', 2500);
    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
