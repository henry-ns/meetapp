import { combineReducers } from 'redux';

import auth from './auth/reducer';
import meetup from './meetup/reducer';
import organizing from './organizing/reducer';
import user from './user/reducer';

const reducers = combineReducers({
  auth,
  meetup,
  organizing,
  user,
});

export default reducers;
