import { all, put, call, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { getSubscriptionsSuccess, unsubscriberSuccess } from './actions';

export function* getSubscriptions({ payload }) {
  const { page } = payload;

  try {
    const res = yield call(api.get, 'subscriptions', {
      params: { page },
    });

    if (res.data.length > 0 || page === 1) {
      const subscriptions = res.data.map(item => ({ ...item.Meetup }));

      yield put(getSubscriptionsSuccess(subscriptions, page));
    }
  } catch (err) {
    const { error } = err.response.data;
    const msg = error || 'Houve um erro, tente novamente mais tarde';

    Alert.alert('Falha ao carregar as inscrições', msg);
  }
}

export function* unsubscriber({ payload }) {
  try {
    yield call(api.delete, `meetups/${payload.id}/subscribe`);

    yield put(unsubscriberSuccess(payload.id));
  } catch (err) {
    const { error } = err.response.data;
    const msg = error || 'Houve um erro, tente novamente mais tarde';

    Alert.alert('Falha ao cancelar a inscrição', msg);
  }
}

export default all([
  takeLatest('@subscriptions/GET_SUBSCRIPTIONS_REQUEST', getSubscriptions),
  takeLatest('@subscriptions/UNSUBSCRIBER_REQUEST', unsubscriber),
]);
