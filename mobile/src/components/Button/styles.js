import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { primaryColor, primaryTextColor } from '~/styles/colors';

export const Container = styled(RectButton)`
  align-items: center;
  justify-content: center;

  background: ${primaryColor};
  height: 50px;
  border-radius: 4px;
`;

export const Text = styled.Text`
  color: ${primaryTextColor};
  font-weight: bold;
  font-size: 18px;
`;
