import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import file from './file/sagas';
import meetup from './meetup/sagas';
import organizing from './organizing/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([auth, file, meetup, organizing, user]);
}
