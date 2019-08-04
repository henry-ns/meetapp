import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'Meetapp',
      storage,
      whitelist: ['auth', 'user', 'organizing'],
    },
    reducers
  );

  return persistedReducer;
};