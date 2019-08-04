import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';
import { primaryDarkColor } from '~/styles/colors';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={primaryDarkColor} />
      <Routes />
    </>
  );
};

export default App;
