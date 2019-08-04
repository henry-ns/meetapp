import { Alert } from 'react-native';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '~/services/api';

import { getMeetupsSuccess, failure, createMeetupSuccess } from './actions';

export function* getMeetups() {
  try {
    const res = yield call(api.get, 'organizing');

    yield put(getMeetupsSuccess(res.data));
  } catch (erro) {
    Alert.alert('oh não! :(', 'Falha ao carregar os seus meetups');
    yield put(failure());
  }
}

export function* cancelMeetup({ payload }) {
  try {
    console.tron.log(payload.id);
    yield call(api.delete, `meetups/${payload.id}`);

    Alert.alert('Sucesso', 'meetup cancelado com sucesso!');
    // history.push('/dashboard');
  } catch (erro) {
    Alert.alert('oh não! :(', 'Houve uma falha ao cancelar seu meetup');
    yield put(failure());
  }
}

export function* createMeetup({ payload }) {
  try {
    const res = yield call(api.post, 'meetups', payload);

    Alert.alert('Sucesso', 'Seu meetup foi criado com sucesso!');
    yield put(createMeetupSuccess(res.data));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'oh não! :(',
      'Houve um erro na criação, verifique seus dados!'
    );
  }
}

export function* updateMeetup({ payload }) {
  try {
    yield call(api.put, `meetups/${payload.id}`, payload.data);

    Alert.alert('Sucesso', 'Seu meetup foi atualizado com sucesso!');

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'oh não! :(',
      'Houve um erro ao atualizar, verifique seus dados!'
    );
  }
}

export default all([
  takeLatest('@organizing/GET_MEETUPS_REQUEST', getMeetups),
  takeLatest('@organizing/CANCEL_MEETUPS_REQUEST', cancelMeetup),
  takeLatest('@organizing/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@organizing/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
