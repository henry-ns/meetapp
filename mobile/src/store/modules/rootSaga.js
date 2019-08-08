import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import meetups from './meetups/sagas';
import subscriptions from './subscriptions/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([auth, meetups, subscriptions, user]);
}
