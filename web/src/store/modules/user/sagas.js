import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

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

    toast.success('Perfil atualizado com sucesso!', 2500);

    yield put(updateProfileSuccess(res.data));
  } catch (err) {
    toast.error('Erro na atualização, verifique seus dados!', 2500);
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
