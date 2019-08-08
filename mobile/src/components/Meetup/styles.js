import styled, { css } from 'styled-components/native';

import Button from '~/components/Button';
import {
  primaryTextColor,
  secondaryColor,
  secondaryTextColor,
} from '~/styles/colors';

export const Container = styled.View`
  background: ${primaryTextColor};
  border-radius: 4px;
  margin-bottom: 25px;
`;

export const Image = styled.Image`
  height: 150px;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${secondaryColor};
  margin: 20px;
  margin-bottom: 5px;
`;

export const P = styled.Text`
  font-size: 13px;

  color: ${secondaryTextColor};
  margin: 5px 40px;
`;

export const SubmitButton = styled(Button)`
  height: 40px;
  margin: 20px;

  ${({ enabled }) =>
    !enabled &&
    css`
      background: ${secondaryTextColor};
    `}
`;
