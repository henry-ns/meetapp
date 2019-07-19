import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { createMeetupSuccess } from './actions';

export function* createMeetup({ payload }) {
  try {
    const res = yield call(api.post, 'meetups', payload);

    toast.success('Seu meetup foi criado com sucesso!');
    yield put(createMeetupSuccess(res.data));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Erro ao criar, verifique seus dados!');
  }
}

export default all([takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup)]);
