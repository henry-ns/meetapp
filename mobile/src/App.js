import React from 'react';
import { useSelector } from 'react-redux';

import createRoutes from './routes';

function App() {
  const isSigned = useSelector(state => state.auth.signed);

  const Routes = createRoutes(isSigned);

  return <Routes />;
}

export default App;
