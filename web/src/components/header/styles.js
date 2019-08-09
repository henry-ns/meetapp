import styled from 'styled-components';
import { darken, lighten } from 'polished';

import {
  secondaryColor,
  primaryTextColor,
  secondaryTextColor,
  secondaryButton,
} from '~/styles/colors';

export const Container = styled.header`
  height: 80px;
  width: 100%;
  margin-bottom: 20px;

  background: ${secondaryColor};
`;

export const Containt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 950px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;

  > a {
    > img {
      &:active {
        transform: scale(0.9);
        transition: transform 0.15s;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;

    color: ${primaryTextColor};

    div {
      text-align: right;
      margin-right: 25px;
      height: 37px;
    }

    strong {
      display: block;
      margin-bottom: 5px;
      user-select: none;
      cursor: default;
    }

    a {
      color: ${secondaryTextColor};

      &:hover {
        color: ${lighten(0.3, secondaryTextColor)};
      }
    }

    button {
      width: 72px;
      background: ${secondaryButton};
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, secondaryButton)};
      }

      &:active {
        background: ${darken(0.1, secondaryButton)};
      }
    }
  }
`;
