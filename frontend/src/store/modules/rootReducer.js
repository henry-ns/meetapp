import { combineReducers } from 'redux';

import auth from './auth/reducer';
import organizing from './organizing/reducer';
import user from './user/reducer';

const reducers = combineReducers({
  auth,
  organizing,
  user,
});

export default reducers;
