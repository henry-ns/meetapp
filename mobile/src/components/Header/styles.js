import styled from 'styled-components/native';

import { statusBarColor } from '~/styles/colors';

export const Container = styled.View`
  align-items: center;
  justify-content: center;

  height: 64px;
  background: ${statusBarColor};

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const Image = styled.Image`
  width: 25px;
  height: 24px;
`;
