import { Alert } from 'react-native';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.profile;

    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    const res = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(res.data));
  } catch (err) {
    const { error } = err.response.data;
    const msg =
      error || 'Houve uma falha na atualização, verifique seus dados!';

    Alert.alert('Falha na atualização', msg);

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
