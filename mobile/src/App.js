import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import createRoutes from './routes';

import { statusBarColor, primaryDarkColor } from '~/styles/colors';

function App() {
  const isSigned = useSelector(state => state.auth.signed);

  const backgroundColor = useMemo(
    () => (isSigned ? statusBarColor : primaryDarkColor),
    [isSigned]
  );

  const Routes = createRoutes(isSigned);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      {isSigned && <Header />}
      <Routes />
    </>
  );
}

export default App;
