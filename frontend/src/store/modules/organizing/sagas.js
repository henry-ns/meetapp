import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { getMeetupsSuccess, failure, createMeetupSuccess } from './actions';

export function* getMeetups() {
  try {
    const res = yield call(api.get, 'organizing');

    yield put(getMeetupsSuccess(res.data));
  } catch (erro) {
    toast.erro('Falha ao carregar os seus meetups', 2500);
    yield put(failure());
  }
}

export function* cancelMeetup({ payload }) {
  try {
    console.tron.log(payload.id);
    yield call(api.delete, `meetups/${payload.id}`);

    toast.success('meetup cancelado com sucesso!', 2500);
    history.push('/dashboard');
  } catch (erro) {
    toast.erro('Falha ao cancelar seu meetup', 2500);
    yield put(failure());
  }
}

export function* createMeetup({ payload }) {
  try {
    const res = yield call(api.post, 'meetups', payload);

    toast.success('Seu meetup foi criado com sucesso!', 2500);
    yield put(createMeetupSuccess(res.data));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Erro ao criar, verifique seus dados!', 2500);
  }
}

export function* updateMeetup({ payload }) {
  try {
    yield call(api.put, `meetups/${payload.id}`, payload.data);

    toast.success('Seu meetup foi atualizado com sucesso!', 2500);

    history.push('/dashboard');
  } catch (err) {
    toast.error('Erro ao atualizar, verifique seus dados!',, 2500);
  }
}

export default all([
  takeLatest('@organizing/GET_MEETUPS_REQUEST', getMeetups),
  takeLatest('@organizing/CANCEL_MEETUPS_REQUEST', cancelMeetup),
  takeLatest('@organizing/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@organizing/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
