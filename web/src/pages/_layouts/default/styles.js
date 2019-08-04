import styled from 'styled-components';

import { primaryDarkColor, primaryLightColor } from '~/styles/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  background: linear-gradient(0deg, ${primaryLightColor}, ${primaryDarkColor});
`;
