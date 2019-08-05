import React from 'react';

import Background from '~/components/Background';
import NavigationOptions from '~/components/NavigationOptions';

// import { Container } from './styles';

export default function Dashboard() {
  return <Background />;
}

Dashboard.navigationOptions = NavigationOptions('Meetups', 'event');
