import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import App from './App';
import { store, persistor } from './store';

import { primaryDarkColor } from '~/styles/colors';

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={primaryDarkColor}
        />
        <App />
      </PersistGate>
    </Provider>
  );
};

export default Main;
