import { combineReducers } from 'redux';

import auth from './auth/reducer';
import meetups from './meetups/reducer';
import subscriptions from './subscriptions/reducer';
import user from './user/reducer';

const reducers = combineReducers({
  auth,
  user,
  meetups,
  subscriptions,
});

export default reducers;
