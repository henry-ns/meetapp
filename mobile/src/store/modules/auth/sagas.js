import { Alert } from 'react-native';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

/**
 * @param { payload } = { email, password }
 */
export function* signIn({ payload }) {
  try {
    const res = yield call(api.post, 'session', payload);

    const { token, user } = res.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados!'
    );
    yield put(signFailure());
  }
}

/**
 * @param { payload } = { email, password }
 */
export function* signUp({ payload }) {
  try {
    yield call(api.post, 'users', payload);

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha no cadastron',
      'Houve um erro no cadastron, verifique seus dados!'
    );
    yield put(signFailure());
  }
}

export function signOut() {
  // history.push('/');
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
