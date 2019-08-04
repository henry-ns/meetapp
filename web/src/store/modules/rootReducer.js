import { combineReducers } from 'redux';

import auth from './auth/reducer';
import file from './file/reducer';
import organizing from './organizing/reducer';
import user from './user/reducer';

const reducers = combineReducers({
  auth,
  file,
  organizing,
  user,
});

export default reducers;
