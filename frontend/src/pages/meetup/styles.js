import styled, { css } from 'styled-components';
import { Form, Input as In } from '@rocketseat/unform';
import { darken } from 'polished';
import { secondaryButton, primaryTextColor } from '~/styles/colors';

export const Container = styled(Form)`
  width: 100%;
  max-width: 940px;

  display: flex;
  flex-direction: column;
  padding: 0 20px;

  > button {
    width: 180px;
    background: ${secondaryButton};
    margin-left: auto;
    margin-top: 15px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, secondaryButton)};
    }

    &:active {
      background: ${darken(0.1, secondaryButton)};
    }
  }

  > span {
    color: ${secondaryButton};
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

export const Input = styled(In)`
  margin: 5px 0;
  padding: 20px;

  font-size: 1.28em;

  background: rgba(0, 0, 0, 0.1);
  color: ${primaryTextColor};

  ${({ name }) =>
    name === 'description' &&
    css`
      height: 200px;
    `}

  ${({ name }) =>
    name === 'file' &&
    css`
      height: 300px;
    `}
`;
