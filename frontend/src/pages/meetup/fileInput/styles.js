import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin: 20px 0;
  width: 100%;

  label {
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 100%;

      max-width: 940px;
      max-height: 300px;
      border-radius: 4px;
    }

    input {
      display: none;
    }
  }
`;
