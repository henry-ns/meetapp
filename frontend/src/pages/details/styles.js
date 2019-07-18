import styled, { css } from 'styled-components';
import { darken } from 'polished';

import {
  primaryTextColor,
  primaryButton,
  secondaryButton,
} from '~/styles/colors';

export const Container = styled.article`
  width: 100%;
  height: 100%;
  max-width: 940px;
  padding: 20px;
  color: ${primaryTextColor};

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    > h1 {
      text-align: center;
      margin-top: 50px;
      margin-bottom: 20px;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 30px;

    h1 {
      font-size: 2.28em;
      font-weight: bold;
    }

    div {
      display: flex;
      align-items: center;
    }
  }

  img {
    width: 100%;
    max-width: 940px;
    height: auto;
  }

  p {
    font-size: 1.28em;
    line-height: 2.28em;
    margin-top: 20px;
  }

  aside {
    display: flex;
    align-items: center;

    font-size: 1.14em;
    opacity: 0.6;

    time,
    address {
      padding: 30px;
    }

    time {
      padding-left: 0;
    }
  }
`;

export const Button = styled.button.attrs({
  type: 'button',
})`
  background: ${props => (props.primary ? primaryButton : secondaryButton)};
  width: 130px;

  & + button {
    margin-left: 20px;
  }

  a {
    color: ${primaryTextColor};
  }

  &:hover {
    background: ${props =>
      props.primary
        ? darken(0.05, primaryButton)
        : darken(0.05, secondaryButton)};
  }

  &:active {
    background: ${props =>
      props.primary
        ? darken(0.1, primaryButton)
        : darken(0.1, secondaryButton)};
  }

  ${({ goBack }) =>
    goBack &&
    css`
      width: auto;
      padding: 0 30px;
    `};
`;
