import styled from 'styled-components';
import { darken } from 'polished';
import {
  primaryLightColor,
  primaryDarkColor,
  primaryColor,
  primaryTextColor,
} from '~/styles/colors';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(0deg, ${primaryLightColor}, ${primaryDarkColor});
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  img {
    margin-bottom: 45px;
  }

  form {
    display: flex;
    flex-direction: column;

    input,
    button {
      height: 50px;
      margin: 5px 0;
      font-size: 1.28em;
    }

    input {
      background: rgba(0, 0, 0, 0.2);
      padding-left: 22px;
      color: ${primaryTextColor};
    }

    span {
      color: ${primaryColor};
      margin: 0 0 10px;
      font-weight: bold;
      align-self: flex-start;
      text-align: left;
    }

    button {
      margin-top: 10px;
      background: ${primaryColor};
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, primaryColor)};
      }

      &:active {
        background: ${darken(0.1, primaryColor)};
      }
    }
  }

  a > button {
    background: transparent;
    opacity: 0.6;
    font-size: 1.14em;

    &:hover {
      opacity: 1;
    }
  }
`;
