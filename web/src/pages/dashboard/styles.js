import styled from 'styled-components';
import { darken } from 'polished';

import { primaryColor, primaryTextColor } from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  max-width: 940px;
  padding: 20px;
  margin: 0 auto;
  color: ${primaryTextColor};

  div {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 30px;

    h1 {
      font-size: 2.28em;
    }
  }

  button {
    background: ${primaryColor};
    width: 162px;
    margin-left: auto;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, primaryColor)};
    }

    &:active {
      background: ${darken(0.1, primaryColor)};
    }

    a {
      color: ${primaryTextColor};
    }
  }

  ul li {
    & + li {
      margin-top: 15px;
    }

    a {
      position: relative;
      cursor: pointer;

      width: 100%;
      height: 62px;

      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
      color: ${primaryTextColor};
      transition: color 0.2s;

      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 0 20px;
      width: 100%;

      p {
        font-size: 1.28em;
        font-weight: bold;
      }

      time {
        font-size: 1.14em;
        opacity: 0.6;
      }

      &:hover {
        color: ${primaryColor};
      }

      &:active {
        color: ${darken(0.05, primaryColor)};
      }
    }
  }
`;
