import { createGlobalStyle } from 'styled-components';

import { primaryTextColor } from './colors';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;

    color: ${primaryTextColor};
    font-weight: bold;
  }

  input, button {
    border: 0;
    border-radius: 4px;
    height: 42px;
  }
`;
