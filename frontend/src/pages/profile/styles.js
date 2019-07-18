import styled from 'styled-components';

import { darken } from 'polished';
import {
  primaryColor,
  secondaryButton,
  primaryTextColor,
} from '~/styles/colors';

export const Container = styled.div`
  width: 100%;

  form {
    max-width: 940px;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin: 0 auto;

    input {
      width: 100%;
      height: 50px;
      margin: 5px 0;
      padding: 0 20px;
      font-size: 1.28em;
      color: ${primaryTextColor};

      background: rgba(0, 0, 0, 0.2);
    }

    button {
      background: ${primaryColor};
      width: 162px;
      margin-top: 20px;
      margin-left: auto;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, primaryColor)};
      }

      &:active {
        background: ${darken(0.1, primaryColor)};
      }
    }

    hr {
      width: 100%;
      margin: 15px 0;

      opacity: 0.1;
    }

    span {
      text-align: left;
      width: 100%;
      margin-top: 5px;
      margin-bottom: 10px;
      color: ${secondaryButton};
    }
  }
`;
