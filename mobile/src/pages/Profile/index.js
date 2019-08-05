import React from 'react';

import Background from '~/components/Background';
import NavigationOptions from '~/components/NavigationOptions';

// import { Container } from './styles';

export default function Profile() {
  return <Background />;
}

Profile.navigationOptions = NavigationOptions('Meu perfil', 'person');
