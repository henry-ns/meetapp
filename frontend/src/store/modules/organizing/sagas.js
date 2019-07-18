import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { getMeetupsSuccess, getMeetupsFailure } from './actions';

export function* getMeetups() {
  try {
    const res = yield call(api.get, 'organizing');

    yield put(getMeetupsSuccess(res.data));
  } catch (erro) {
    toast.erro('Falha ao carregar os seus meetups');
    yield put(getMeetupsFailure());
  }
}

export default all([takeLatest('@organizing/GET_MEETUPS_REQUEST', getMeetups)]);
