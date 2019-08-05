import React from 'react';

import Background from '~/components/Background';
import NavigationOptions from '~/components/NavigationOptions';

// import { Container } from './styles';

export default function Subscriptions() {
  return <Background />;
}

Subscriptions.navigationOptions = NavigationOptions(
  'Inscrições',
  'event-available'
);
